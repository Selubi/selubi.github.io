---
id: python-multithreading
title: Multithreading
sidebar_label: Multithreading
sidebar_position: 100
tags:
  - Python
---

## Background

Depending the writer, a guide on multi-threading will focus on different things.

For me, my background is server operation automations.
As such, my uses for multithreading is performing automations on multiple server at once (e.g. one server per thread),
how to orchestrate it effectively and how to make a good log for easier troubleshooting.

It is worth mentioning that python has a [Global Interpreter Lock](https://wiki.python.org/moin/GlobalInterpreterLock) (GIL).
This makes sure that only a single thread can be executed at a single point in time.

In this tutorial we will consider a scenario where we want to perform benchmarks on remote servers.
Hence, our use-case will be I/O bound (i.e. waiting for remote server to finish benchmarking) and will not be affected by GIL's demerit.
During "wait periods" GIL will be released and the interpreter could work on other threads.

All the python snippets in this note is executable as is. Just make sure to have structlog installed.

```bash
pip install structlog
```

## Basic syntax

Consider that we want to perform benchmarks on servers.

We will use [`concurrent.futures`](https://docs.python.org/3/library/concurrent.futures.html) library's `ThreadPoolExecutor` class to manage the multithreading.

A basic syntax would look something like this

```python title="benchmark.py" showLineNumbers
import concurrent.futures
import structlog
from time import sleep
from unittest.mock import Mock
from random import randint, sample

MAX_THREADS = 5
BENCHMARK_SCORE_THRESHOLD = 50
logger = structlog.get_logger(__name__)


def benchmark_cpu(server_id):
    """CPU benchmarks a single server"""
    # ssh_client is a mocked for this tutorial
    # Assumption: ssh_client.connect(server_id) connects to the server
    ssh_client = Mock()
    ssh_client.connect(server_id)

    # Normally you would run some benchmark commands via the ssh_client
    # But we are just going to simulate it with sleep and random for this tutorial
    benchmark_time = randint(1, 10)
    sleep(benchmark_time)  # Simulate time it needs to benchmark
    logger.info(f"CPU benchmark completed after {benchmark_time}s for {server_id=}")

    benchmark_score = randint(0, 100)
    logger.info(f"CPU benchmark score is {benchmark_score} for {server_id=}")
    return benchmark_score


def benchmark_multiple_servers(server_ids):
    """Orchestrates benchmarks of multiple server"""
    logger.info(f"Servers to benchmark: {server_ids}")
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        futures = [
            # Submits len(server_ids) amount of tasks to executor
            # executor will concurrently execute benchmark_cpu with server_id as argument
            # executor will at most execute MAX_THREADS threads at once, and once a thread is finished
            # it will move to the next submitted.
            executor.submit(benchmark_cpu, server_id)
            for server_id in server_ids
        ]
        failed_count = 0
        for future in concurrent.futures.as_completed(futures):
            # Will be executed when a thread represented by future is completed.
            if future.result() < 50:
                failed_count += 1

    logger.info(f"Out of {len(server_ids)}, {failed_count} servers failed.")


if __name__ == "__main__":
    # Generate 10 random server_id
    server_ids_to_benchmark = sample(range(1, 50000), 10)
    benchmark_multiple_servers(server_ids_to_benchmark)

```

This script will:

- Concurrently execute `benchmark_cpu()` which will benchmark one server each
- Execute for a maximum of 5 threads at once
- Know how many servers failed

Here is a sample output from this script

```log
$ python3 benchmark.py
2023-11-15 11:13:43 [info     ] Servers to benchmark: [40444, 16676, 15681, 18773, 25705, 43959, 40782, 14394, 5606, 19318]
2023-11-15 11:13:44 [info     ] CPU benchmark completed after 1s for server_id=25705
2023-11-15 11:13:44 [info     ] CPU benchmark score is 49 for server_id=25705
2023-11-15 11:13:45 [info     ] CPU benchmark completed after 2s for server_id=16676
2023-11-15 11:13:45 [info     ] CPU benchmark completed after 2s for server_id=18773
2023-11-15 11:13:45 [info     ] CPU benchmark score is 59 for server_id=16676
2023-11-15 11:13:45 [info     ] CPU benchmark score is 100 for server_id=18773
2023-11-15 11:13:46 [info     ] CPU benchmark completed after 3s for server_id=40444
2023-11-15 11:13:46 [info     ] CPU benchmark score is 22 for server_id=40444
2023-11-15 11:13:47 [info     ] CPU benchmark completed after 2s for server_id=40782
2023-11-15 11:13:47 [info     ] CPU benchmark score is 24 for server_id=40782
2023-11-15 11:13:47 [info     ] CPU benchmark completed after 1s for server_id=5606
2023-11-15 11:13:47 [info     ] CPU benchmark score is 62 for server_id=5606
2023-11-15 11:13:50 [info     ] CPU benchmark completed after 3s for server_id=19318
2023-11-15 11:13:50 [info     ] CPU benchmark completed after 5s for server_id=14394
2023-11-15 11:13:50 [info     ] CPU benchmark score is 29 for server_id=14394
2023-11-15 11:13:50 [info     ] CPU benchmark score is 48 for server_id=19318
2023-11-15 11:13:52 [info     ] CPU benchmark completed after 8s for server_id=43959
2023-11-15 11:13:52 [info     ] CPU benchmark score is 93 for server_id=43959
2023-11-15 11:13:53 [info     ] CPU benchmark completed after 10s for server_id=15681
2023-11-15 11:13:53 [info     ] CPU benchmark score is 10 for server_id=15681
2023-11-15 11:13:53 [info     ] Out of 10, 6 servers failed.
```

This script has multiple points it can be improved on:

- The main thread doesn't know which servers failed.
- If we were to add another benchmark, lets say `benchmark_gpu()` this script won't scale well and it doesn't handle unexpected errors.
- Logging is verbose, we need to add `{server_id=}` in every time. This also makes the log inflexible.

In the following section we will build on this base syntax address these issues.

## The not-blind orchestrator

Right now, the orchestrator doesn't know which server failed the benchmark.

As someone who reads the log, we can scroll to know which server failed but it is an inconvenience. Imagine trying to find two failed server within hundreds.

To address this, instead of doing a list comprehension for `futures`, we can do a dict comprehension to associate futures with server ids as shown below.

```python title=benchmark.py showLineNumbers
import concurrent.futures
import structlog
from time import sleep
from unittest.mock import Mock
from random import randint, sample

MAX_THREADS = 5
BENCHMARK_SCORE_THRESHOLD = 50
logger = structlog.get_logger(__name__)


def benchmark_cpu(server_id):
    """CPU benchmarks a single server"""
    # ssh_client is a mocked for this tutorial
    # Assumption: ssh_client.connect(server_id) connects to the server
    ssh_client = Mock()
    ssh_client.connect(server_id)

    # Normally you would run some benchmark commands via the ssh_client
    # But we are just going to simulate it with sleep and random for this tutorial
    benchmark_time = randint(1, 10)
    sleep(benchmark_time)  # Simulate time it needs to benchmark
    logger.info(f"CPU benchmark completed after {benchmark_time}s for {server_id=}")

    benchmark_score = randint(0, 100)
    logger.info(f"CPU benchmark score is {benchmark_score} for {server_id=}")
    return benchmark_score


def benchmark_multiple_servers(server_ids):
    """Orchestrates benchmarks of multiple server"""
    logger.info(f"Servers to benchmark: {server_ids}")
    # highlight-next-line
    failed_servers = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        # highlight-start
        futures = {
            # Dict[asyncio.future,List[int]] (Dict comprehension)
            executor.submit(benchmark_cpu, server_id): server_id
            for server_id in server_ids
        }
        # highlight-end
        for future in concurrent.futures.as_completed(futures):
            # Will be executed when a thread represented by future is completed.
            if future.result() < 50:
                # highlight-next-line
                failed_servers.append(futures[future])
    # highlight-start
    logger.info(
        f"Out of {len(server_ids)}, {len(failed_servers)} servers failed. {failed_servers=}"
    )
    # highlight-end


if __name__ == "__main__":
    # Generate 10 random server_id
    server_ids_to_benchmark = sample(range(1, 50000), 10)
    benchmark_multiple_servers(server_ids_to_benchmark)
```

Here is a sample output of this improved script

```log
$ python3 benchmark.py
2023-11-15 11:24:12 [info     ] Servers to benchmark: [22484, 38612, 27762, 36250, 7085, 16448, 104, 30749, 32687, 47058]
2023-11-15 11:24:14 [info     ] CPU benchmark completed after 2s for server_id=22484
2023-11-15 11:24:14 [info     ] CPU benchmark completed after 2s for server_id=36250
2023-11-15 11:24:14 [info     ] CPU benchmark score is 70 for server_id=22484
2023-11-15 11:24:14 [info     ] CPU benchmark score is 52 for server_id=36250
2023-11-15 11:24:15 [info     ] CPU benchmark completed after 3s for server_id=7085
2023-11-15 11:24:15 [info     ] CPU benchmark score is 0 for server_id=7085
2023-11-15 11:24:19 [info     ] CPU benchmark completed after 7s for server_id=27762
2023-11-15 11:24:19 [info     ] CPU benchmark score is 66 for server_id=27762
2023-11-15 11:24:22 [info     ] CPU benchmark completed after 10s for server_id=38612
2023-11-15 11:24:22 [info     ] CPU benchmark score is 53 for server_id=38612
2023-11-15 11:24:22 [info     ] CPU benchmark completed after 8s for server_id=104
2023-11-15 11:24:22 [info     ] CPU benchmark score is 82 for server_id=104
2023-11-15 11:24:23 [info     ] CPU benchmark completed after 1s for server_id=47058
2023-11-15 11:24:23 [info     ] CPU benchmark score is 82 for server_id=47058
2023-11-15 11:24:24 [info     ] CPU benchmark completed after 10s for server_id=16448
2023-11-15 11:24:24 [info     ] CPU benchmark score is 100 for server_id=16448
2023-11-15 11:24:25 [info     ] CPU benchmark completed after 10s for server_id=30749
2023-11-15 11:24:25 [info     ] CPU benchmark score is 3 for server_id=30749
2023-11-15 11:24:27 [info     ] CPU benchmark completed after 8s for server_id=32687
2023-11-15 11:24:27 [info     ] CPU benchmark score is 9 for server_id=32687
2023-11-15 11:24:27 [info     ] Out of 10, 3 servers failed. failed_servers=[7085, 30749, 32687]
```

So, whats good about this?
Operators usually check at the end of the log first, and aggregating everything the operators need to know at the end is good practice.

By aggregating the failed servers at the end, the operators that will read the log will instantly know which servers failed.
They can then `Ctrl+F` the log, or `grep` by `server_id` to filter and troubleshoot.

Assuming the above output was saved into `benchmark.log`, we can do something like below.

```log
$ grep 7085 benchmark.log
2023-11-15 11:24:12 [info     ] Servers to benchmark: [22484, 38612, 27762, 36250, 7085, 16448, 104, 30749, 32687, 47058]
2023-11-15 11:24:15 [info     ] CPU benchmark completed after 3s for server_id=7085
2023-11-15 11:24:15 [info     ] CPU benchmark score is 0 for server_id=7085
2023-11-15 11:24:27 [info     ] Out of 10, 3 servers failed. failed_servers=[7085, 30749, 32687]
```

## Scaling to more complex per-thread workloads

As it is right now, the main thread, `benchmark_multiple_servers()` directly accepts the benchmark score and decides if the server failed or not.

This poses problem if we would add another benchmark, say `benchmark_gpu()`.
`benchmark_multiple_servers()` will require additional logic, and it will be harder to debug/change in the long term.

Instead, we can define a new function `benchmark_single_server()` that will act as a 'main function' for each thread.
We can design it so that `benchmark_multiple_servers()` only interacts with `benchmark_single_server()`.

We can then make `benchmark_single_server()` throw exceptions as a way to communicate to `benchmark_multiple_servers()`.

We will also add `benchmark_gpu()` as a required benchmark of each server.

```python title="benchmark.py" showLineNumbers
import concurrent.futures
import structlog
from time import sleep
from unittest.mock import Mock
from random import randint, sample

MAX_THREADS = 5
BENCHMARK_SCORE_THRESHOLD = 50
logger = structlog.get_logger(__name__)

# highlight-start
class PerformanceBelowExpected(Exception):
    """Hardware performance is below expected"""
# highlight-end

def benchmark_cpu(ssh_client, server_id):
    """CPU benchmarks a single server"""

    # Normally you would run some benchmark commands via the ssh_client
    # But we are just going to simulate it with sleep and random for this tutorial
    benchmark_time = randint(1, 10)
    sleep(benchmark_time)  # Simulate time it needs to benchmark
    logger.info(f"CPU benchmark completed after {benchmark_time}s for {server_id=}")

    benchmark_score = randint(0, 100)
    logger.info(f"CPU benchmark score is {benchmark_score} for {server_id=}")
    return benchmark_score


# highlight-start
def benchmark_gpu(ssh_client, server_id):
    """GPU benchmarks a single server"""

    # Normally you would run some benchmark commands via the ssh_client
    # But we are just going to simulate it with sleep and random for this tutorial
    benchmark_time = randint(1, 10)
    sleep(benchmark_time)  # Simulate time it needs to benchmark
    logger.info(f"GPU benchmark completed after {benchmark_time}s for {server_id=}")

    benchmark_score = randint(0, 100)
    logger.info(f"GPU benchmark score is {benchmark_score} for {server_id=}")
    return benchmark_score


def benchmark_single_server(server_id):
    """Perform benchmarks on a single server"""
    # SSH client is now defined here because it is the same across benchmarks
    ssh_client = Mock()
    ssh_client.connect(server_id)

    cpu_score = benchmark_cpu(ssh_client, server_id)
    gpu_score = benchmark_gpu(ssh_client, server_id)
    if cpu_score < BENCHMARK_SCORE_THRESHOLD or gpu_score < BENCHMARK_SCORE_THRESHOLD:
        raise PerformanceBelowExpected(
            f"Hardware performance is below expectations {server_id=}"
        )
# highlight-end


def benchmark_multiple_servers(server_ids):
    """Orchestrates benchmarks of multiple server"""
    logger.info(f"Servers to benchmark: {server_ids}")
    failed_servers = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        futures = {
            # Dict[asyncio.future,List[int]] (Dict comprehension)
# highlight-next-line
            executor.submit(benchmark_single_server, server_id): server_id
            for server_id in server_ids
        }
        for future in concurrent.futures.as_completed(futures):
            # Will be executed when a thread represented by future is completed.
# highlight-start
            server_id = futures[future]
            if future.exception():  # No exceptions raised == benchmark success
                err = future.exception()
                logger.error(f"Benchmark failed on {server_id=} with {type(err)}: {err}.")
# highlight-end
                failed_servers.append(futures[future])
    logger.info(
        f"Out of {len(server_ids)}, {len(failed_servers)} servers failed. {failed_servers=}"
    )


if __name__ == "__main__":
    # Generate 10 random server_id
    server_ids_to_benchmark = sample(range(1, 50000), 10)
    benchmark_multiple_servers(server_ids_to_benchmark)

```

Changes from the previous script:

- `benchmark_gpu()` function is added
- A new custom exception type `PerformanceBelowExpected` is defined.
- `benchmark_single_server()` function is added as main function per thread. It will throw `PerformanceBelowExpected` to communicate failure to the main thread.
- `ssh_client` is now initialized at `benchmark_single_server()` because it is shared across the whole thread, this reduces overhead.
- `benchmark_multiple_servers()` will now catch threads that raised an exception and mark them as failed.
  Threads that doesn't raise an exception are considered successes.

A sample output of this script will look as below.

```log
$ python3 benchmark.py
2023-11-15 14:55:45 [info     ] Servers to benchmark: [1467, 45545, 7368, 17084, 3923, 14130, 15201, 1978, 6741, 8751]
2023-11-15 14:55:48 [info     ] CPU benchmark completed after 3s for server_id=3923
2023-11-15 14:55:48 [info     ] CPU benchmark score is 53 for server_id=3923
2023-11-15 14:55:49 [info     ] CPU benchmark completed after 4s for server_id=45545
2023-11-15 14:55:49 [info     ] CPU benchmark score is 2 for server_id=45545
2023-11-15 14:55:49 [info     ] CPU benchmark completed after 4s for server_id=17084
2023-11-15 14:55:49 [info     ] CPU benchmark score is 5 for server_id=17084
2023-11-15 14:55:50 [info     ] CPU benchmark completed after 5s for server_id=1467
2023-11-15 14:55:50 [info     ] CPU benchmark score is 63 for server_id=1467
2023-11-15 14:55:50 [info     ] GPU benchmark completed after 1s for server_id=17084
2023-11-15 14:55:50 [info     ] GPU benchmark score is 7 for server_id=17084
2023-11-15 14:55:50 [error    ] Benchmark failed on server_id=17084 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=17084.
2023-11-15 14:55:52 [info     ] GPU benchmark completed after 4s for server_id=3923
2023-11-15 14:55:52 [info     ] GPU benchmark score is 93 for server_id=3923
2023-11-15 14:55:54 [info     ] CPU benchmark completed after 9s for server_id=7368
2023-11-15 14:55:54 [info     ] CPU benchmark score is 41 for server_id=7368
2023-11-15 14:55:54 [info     ] CPU benchmark completed after 2s for server_id=15201
2023-11-15 14:55:54 [info     ] CPU benchmark score is 49 for server_id=15201
2023-11-15 14:55:56 [info     ] GPU benchmark completed after 2s for server_id=7368
2023-11-15 14:55:56 [info     ] GPU benchmark score is 69 for server_id=7368
2023-11-15 14:55:56 [error    ] Benchmark failed on server_id=7368 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=7368.
2023-11-15 14:55:58 [info     ] GPU benchmark completed after 9s for server_id=45545
2023-11-15 14:55:58 [info     ] GPU benchmark score is 36 for server_id=45545
2023-11-15 14:55:58 [error    ] Benchmark failed on server_id=45545 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=45545.
2023-11-15 14:55:59 [info     ] GPU benchmark completed after 9s for server_id=1467
2023-11-15 14:55:59 [info     ] GPU benchmark score is 50 for server_id=1467
2023-11-15 14:55:59 [info     ] CPU benchmark completed after 9s for server_id=14130
2023-11-15 14:55:59 [info     ] CPU benchmark score is 76 for server_id=14130
2023-11-15 14:55:59 [info     ] GPU benchmark completed after 5s for server_id=15201
2023-11-15 14:55:59 [info     ] GPU benchmark score is 33 for server_id=15201
2023-11-15 14:55:59 [error    ] Benchmark failed on server_id=15201 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=15201.
2023-11-15 14:56:00 [info     ] CPU benchmark completed after 2s for server_id=6741
2023-11-15 14:56:00 [info     ] CPU benchmark score is 62 for server_id=6741
2023-11-15 14:56:00 [info     ] GPU benchmark completed after 1s for server_id=14130
2023-11-15 14:56:00 [info     ] GPU benchmark score is 15 for server_id=14130
2023-11-15 14:56:00 [error    ] Benchmark failed on server_id=14130 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=14130.
2023-11-15 14:56:02 [info     ] CPU benchmark completed after 6s for server_id=1978
2023-11-15 14:56:02 [info     ] CPU benchmark score is 77 for server_id=1978
2023-11-15 14:56:04 [info     ] GPU benchmark completed after 4s for server_id=6741
2023-11-15 14:56:04 [info     ] GPU benchmark score is 46 for server_id=6741
2023-11-15 14:56:04 [error    ] Benchmark failed on server_id=6741 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=6741.
2023-11-15 14:56:06 [info     ] CPU benchmark completed after 7s for server_id=8751
2023-11-15 14:56:06 [info     ] CPU benchmark score is 7 for server_id=8751
2023-11-15 14:56:07 [info     ] GPU benchmark completed after 1s for server_id=8751
2023-11-15 14:56:07 [info     ] GPU benchmark score is 99 for server_id=8751
2023-11-15 14:56:07 [error    ] Benchmark failed on server_id=8751 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=8751.
2023-11-15 14:56:11 [info     ] GPU benchmark completed after 9s for server_id=1978
2023-11-15 14:56:11 [info     ] GPU benchmark score is 54 for server_id=1978
2023-11-15 14:56:11 [info     ] Out of 10, 7 servers failed. failed_servers=[17084, 7368, 45545, 15201, 14130, 6741, 8751]
```

A welcome side effect of this approach is that now, `benchmark_multiple_servers()` will also catch unexpected errors and will not crash.

In real world applications, there could be a lot of unexpected errors. In our code alone, `ssh_client` could throw connection errors.

In most cases, we don't want the main thread that orchestrates things to crash at all costs. Main thread crashing could result in unexpected behavior.

:::note
`future.result()` rethrows an error if an error was thrown on the thread. As such, instead of doing `future.exception()` you can also do a try except clause.

I myself prefer the `future.exception()` because it is more friendly to [`pylint broad-exception-caught`](https://pylint.readthedocs.io/en/latest/user_guide/messages/warning/broad-exception-caught.html).
:::

As we can see, adding a 'per-thread main function' abstraction layer could actually simplify the whole process when scaling.

## A more flexible and less verbose logging

So far we put `server_id` manually in the message when calling the the logger.
As is, its really more of an inconvenience but let's think of another situation.

As aligned with our design, we call single threaded functions with `benchmark_single_server()`.
Now, what if for example we decided to use other already-existing single threaded functions?
Those functions will not have `server_id` baked into the log and logs from them will be confusing.
Actually, `ssh_client` would be a good example of this. functions from the `ssh_client` class will most likely be a single threaded function and we need to find a way to log it.

Luckily, if we use `structlog`, [`structlog.contextvars.bind_contextvars()`](https://www.structlog.org/en/stable/api.html#structlog.contextvars.bind_contextvars) is perfect for this.
`bind_contextvars()` binds a variable to the current thread it is called on, and subsequent calls of structlog's logger, even different instances of it, will output the context variable in the log.

As such, we can modify our existing code this way.

```python title="benchmark.py" showLineNumbers
import concurrent.futures
import structlog
from time import sleep
from unittest.mock import Mock
from random import randint, sample

MAX_THREADS = 5
BENCHMARK_SCORE_THRESHOLD = 50
logger = structlog.get_logger(__name__)


class PerformanceBelowExpected(Exception):
    """Hardware performance is below expected"""

# highlight-next-line
def benchmark_cpu(ssh_client):
    """CPU benchmarks a single server"""

    # Normally you would run some benchmark commands via the ssh_client
    # But we are just going to simulate it with sleep and random for this tutorial
    benchmark_time = randint(1, 10)
    sleep(benchmark_time)  # Simulate time it needs to benchmark
    # highlight-next-line
    logger.info(f"CPU benchmark completed after {benchmark_time}s.")
    benchmark_score = randint(0, 100)
    # highlight-next-line
    logger.info(f"CPU benchmark score is {benchmark_score}.")
    return benchmark_score

# highlight-next-line
def benchmark_gpu(ssh_client):
    """GPU benchmarks a single server"""

    # Normally you would run some benchmark commands via the ssh_client
    # But we are just going to simulate it with sleep and random for this tutorial
    benchmark_time = randint(1, 10)
    sleep(benchmark_time)  # Simulate time it needs to benchmark
    # highlight-next-line
    logger.info(f"GPU benchmark completed after {benchmark_time}s.")
    benchmark_score = randint(0, 100)
    # highlight-next-line
    logger.info(f"GPU benchmark score is {benchmark_score}.")
    return benchmark_score


def benchmark_single_server(server_id):
    """Perform benchmarks on a single server"""
    # SSH client is now defined here because it is the same across benchmarks
    # highlight-next-line
    structlog.contextvars.bind_contextvars(server_id=server_id)
    ssh_client = Mock()
    ssh_client.connect(server_id)

    # highlight-next-line
    cpu_score = benchmark_cpu(ssh_client)
    # highlight-next-line
    gpu_score = benchmark_gpu(ssh_client)
    if cpu_score < BENCHMARK_SCORE_THRESHOLD or gpu_score < BENCHMARK_SCORE_THRESHOLD:
        raise PerformanceBelowExpected(
            f"Hardware performance is below expectations {server_id=}"
        )


def benchmark_multiple_servers(server_ids):
    """Orchestrates benchmarks of multiple server"""
    logger.info(f"Servers to benchmark: {server_ids}")
    failed_servers = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        futures = {
            # Dict[asyncio.future,List[int]] (Dict comprehension)
            executor.submit(benchmark_single_server, server_id): server_id
            for server_id in server_ids
        }
        for future in concurrent.futures.as_completed(futures):
            # Will be executed when a thread represented by future is completed.
            server_id = futures[future]
            if future.exception():  # No exceptions raised == benchmark success
                err = future.exception()
                logger.error(
                    f"Benchmark failed on {server_id=} with {type(err)}: {err}."
                )
                failed_servers.append(futures[future])

    logger.info(
        f"Out of {len(server_ids)}, {len(failed_servers)} servers failed. {failed_servers=}"
    )


if __name__ == "__main__":
    # Generate 10 random server_id
    server_ids_to_benchmark = sample(range(1, 50000), 10)
    benchmark_multiple_servers(server_ids_to_benchmark)
```

A sample output of this script will look like below.

```log
$ python3 benchmark.py
2023-11-15 14:58:31 [info     ] Servers to benchmark: [5304, 256, 11673, 5614, 44759, 11242, 25182, 25801, 9711, 28137]
2023-11-15 14:58:32 [info     ] CPU benchmark completed after 1s. server_id=5614
2023-11-15 14:58:32 [info     ] CPU benchmark score is 81.     server_id=5614
2023-11-15 14:58:34 [info     ] CPU benchmark completed after 3s. server_id=256
2023-11-15 14:58:34 [info     ] CPU benchmark score is 80.     server_id=256
2023-11-15 14:58:36 [info     ] CPU benchmark completed after 5s. server_id=5304
2023-11-15 14:58:36 [info     ] CPU benchmark score is 63.     server_id=5304
2023-11-15 14:58:38 [info     ] CPU benchmark completed after 7s. server_id=11673
2023-11-15 14:58:38 [info     ] CPU benchmark score is 7.      server_id=11673
2023-11-15 14:58:39 [info     ] CPU benchmark completed after 8s. server_id=44759
2023-11-15 14:58:39 [info     ] CPU benchmark score is 49.     server_id=44759
2023-11-15 14:58:40 [info     ] GPU benchmark completed after 8s. server_id=5614
2023-11-15 14:58:40 [info     ] GPU benchmark score is 82.     server_id=5614
2023-11-15 14:58:42 [info     ] GPU benchmark completed after 8s. server_id=256
2023-11-15 14:58:42 [info     ] GPU benchmark score is 61.     server_id=256
2023-11-15 14:58:42 [info     ] GPU benchmark completed after 6s. server_id=5304
2023-11-15 14:58:42 [info     ] GPU benchmark score is 20.     server_id=5304
2023-11-15 14:58:42 [error    ] Benchmark failed on server_id=5304 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=5304.
2023-11-15 14:58:42 [info     ] GPU benchmark completed after 3s. server_id=44759
2023-11-15 14:58:42 [info     ] GPU benchmark score is 71.     server_id=44759
2023-11-15 14:58:42 [error    ] Benchmark failed on server_id=44759 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=44759.
2023-11-15 14:58:43 [info     ] GPU benchmark completed after 5s. server_id=11673
2023-11-15 14:58:43 [info     ] GPU benchmark score is 73.     server_id=11673
2023-11-15 14:58:43 [error    ] Benchmark failed on server_id=11673 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=11673.
2023-11-15 14:58:44 [info     ] CPU benchmark completed after 2s. server_id=25801
2023-11-15 14:58:44 [info     ] CPU benchmark score is 91.     server_id=25801
2023-11-15 14:58:46 [info     ] CPU benchmark completed after 6s. server_id=11242
2023-11-15 14:58:46 [info     ] CPU benchmark completed after 3s. server_id=28137
2023-11-15 14:58:46 [info     ] CPU benchmark score is 47.     server_id=11242
2023-11-15 14:58:46 [info     ] CPU benchmark score is 57.     server_id=28137
2023-11-15 14:58:46 [info     ] GPU benchmark completed after 2s. server_id=25801
2023-11-15 14:58:46 [info     ] GPU benchmark score is 96.     server_id=25801
2023-11-15 14:58:47 [info     ] GPU benchmark completed after 1s. server_id=28137
2023-11-15 14:58:47 [info     ] GPU benchmark score is 99.     server_id=28137
2023-11-15 14:58:48 [info     ] GPU benchmark completed after 2s. server_id=11242
2023-11-15 14:58:48 [info     ] GPU benchmark score is 81.     server_id=11242
2023-11-15 14:58:48 [error    ] Benchmark failed on server_id=11242 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=11242.
2023-11-15 14:58:50 [info     ] CPU benchmark completed after 8s. server_id=25182
2023-11-15 14:58:50 [info     ] CPU benchmark score is 87.     server_id=25182
2023-11-15 14:58:52 [info     ] CPU benchmark completed after 10s. server_id=9711
2023-11-15 14:58:52 [info     ] CPU benchmark score is 52.     server_id=9711
2023-11-15 14:58:55 [info     ] GPU benchmark completed after 5s. server_id=25182
2023-11-15 14:58:55 [info     ] GPU benchmark score is 14.     server_id=25182
2023-11-15 14:58:55 [error    ] Benchmark failed on server_id=25182 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=25182.
2023-11-15 14:58:56 [info     ] GPU benchmark completed after 4s. server_id=9711
2023-11-15 14:58:56 [info     ] GPU benchmark score is 11.     server_id=9711
2023-11-15 14:58:56 [error    ] Benchmark failed on server_id=9711 with <class '__main__.PerformanceBelowExpected'>: Hardware performance is below expectations server_id=9711.
2023-11-15 14:58:56 [info     ] Out of 10, 6 servers failed. failed_servers=[5304, 44759, 11673, 11242, 25182, 9711]
```

As we can see, even though we deleted the `server_id` from each message, we can set context variable at the start of a thread and all subsequent structlog calls for that thread does show `server_id`.

As mentioned, the great thing about this is that all structlog calls, including the ones from libraries will have `server_id` with it.
Also, notice that the main thread doesn't have any context variable set to it.

Naturally, this also work with `grep` or manual searching with `Ctrl+f`.

```log
$ grep 25801 benchmark.log
2023-11-15 14:58:31 [info     ] Servers to benchmark: [5304, 256, 11673, 5614, 44759, 11242, 25182, 25801, 9711, 28137]
2023-11-15 14:58:44 [info     ] CPU benchmark completed after 2s. server_id=25801
2023-11-15 14:58:44 [info     ] CPU benchmark score is 91.     server_id=25801
2023-11-15 14:58:46 [info     ] GPU benchmark completed after 2s. server_id=25801
2023-11-15 14:58:46 [info     ] GPU benchmark score is 96.     server_id=25801
```

## Conclusion

Multithreading comes in different shapes.
In this note we discussed an example of multithreading usage for server automations.

We started with a basic syntax and address each problem little by little, and in the end we have an easily extensible multithreaded code that produces easily debuggable log.
We also show that this approach is great for re-using existing single-threaded functions and making it multithreaded.

In a real-world deployment, scripts like this may be run either by trigger or periodically by a CI/CD tool like Jenkins. It will also most probably receive a config and the servers to benchmark from somewhere and do something to the servers that failed the benchmark.

Last updated: November 15, 2023
