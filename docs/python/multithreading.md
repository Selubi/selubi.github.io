---
id: python-multithreading
title: Multithreading
sidebar_label: Multithreading
sidebar_position: 100
tags:
  - Python
---

# Background

Depending the writer, a guide on multi-threading will focus on different things.

For me, my background is server operation automations.
As such, my uses for multithreading is performing automations on multiple server at once (e.g. one server per thread),
how to orchestrate it effectively and how to make a good log for easier troubleshooting.

It is worth mentioning that python has a [Global Interpreter Lock](https://wiki.python.org/moin/GlobalInterpreterLock) (GIL).
This makes sure that only a single thread can be executed at a single point in time.

In this tutorial we will consider a scenario where we want to perform benchmarks on remote servers.
Hence, our use-case will be I/O bound (i.e. waiting for remote server to finish benchmarking) and will not be affected by GIL's demerit.
During "wait periods" GIL will be released and the interpreter could work on other threads.

# Basic syntax

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

# The not-blind orchestrator

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

# Scaling to more complex per-thread workloads

As it is right now, the main thread, `benchmark_multiple_servers()` directly accepts the benchmark score and decides if the server failed or not.

This poses problem if we would add another benchmark, say `benchmark_gpu()`.
`benchmark_multiple_servers()` will require additional logic, and it will be harder to debug/change in the long term.

Instead, we can define a new function `benchmark_single_server()` that will act as a 'main function' for each thread.
We can design it so that `benchmark_multiple_servers()` only interact and orchestrate with `benchmark_single_server()`.

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
                logger.error(f"Benchmark failed on {server_id=} with {err}.")
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
2023-11-15 12:24:00 [info     ] Servers to benchmark: [24318, 25634, 45461, 16233, 35516, 7582, 37233, 41992, 14548, 24315]
2023-11-15 12:24:01 [info     ] CPU benchmark completed after 1s for server_id=25634
2023-11-15 12:24:01 [info     ] CPU benchmark score is 34 for server_id=25634
2023-11-15 12:24:03 [info     ] CPU benchmark completed after 3s for server_id=24318
2023-11-15 12:24:03 [info     ] CPU benchmark score is 36 for server_id=24318
2023-11-15 12:24:07 [info     ] CPU benchmark completed after 7s for server_id=35516
2023-11-15 12:24:07 [info     ] CPU benchmark score is 26 for server_id=35516
2023-11-15 12:24:07 [info     ] GPU benchmark completed after 4s for server_id=24318
2023-11-15 12:24:07 [info     ] GPU benchmark score is 36 for server_id=24318
2023-11-15 12:24:07 [error    ] Benchmark failed on server_id=24318 with Hardware performance is below expectations server_id=24318.
2023-11-15 12:24:08 [info     ] CPU benchmark completed after 8s for server_id=16233
2023-11-15 12:24:08 [info     ] CPU benchmark score is 79 for server_id=16233
2023-11-15 12:24:08 [info     ] GPU benchmark completed after 7s for server_id=25634
2023-11-15 12:24:08 [info     ] GPU benchmark score is 12 for server_id=25634
2023-11-15 12:24:08 [error    ] Benchmark failed on server_id=25634 with Hardware performance is below expectations server_id=25634.
2023-11-15 12:24:09 [info     ] CPU benchmark completed after 9s for server_id=45461
2023-11-15 12:24:09 [info     ] CPU benchmark score is 92 for server_id=45461
2023-11-15 12:24:09 [info     ] CPU benchmark completed after 1s for server_id=37233
2023-11-15 12:24:09 [info     ] CPU benchmark score is 17 for server_id=37233
2023-11-15 12:24:11 [info     ] GPU benchmark completed after 3s for server_id=16233
2023-11-15 12:24:11 [info     ] GPU benchmark score is 84 for server_id=16233
2023-11-15 12:24:16 [info     ] GPU benchmark completed after 7s for server_id=37233
2023-11-15 12:24:16 [info     ] GPU benchmark score is 12 for server_id=37233
2023-11-15 12:24:16 [error    ] Benchmark failed on server_id=37233 with Hardware performance is below expectations server_id=37233.
2023-11-15 12:24:17 [info     ] GPU benchmark completed after 8s for server_id=45461
2023-11-15 12:24:17 [info     ] GPU benchmark score is 26 for server_id=45461
2023-11-15 12:24:17 [info     ] GPU benchmark completed after 10s for server_id=35516
2023-11-15 12:24:17 [error    ] Benchmark failed on server_id=45461 with Hardware performance is below expectations server_id=45461.
2023-11-15 12:24:17 [info     ] GPU benchmark score is 70 for server_id=35516
2023-11-15 12:24:17 [error    ] Benchmark failed on server_id=35516 with Hardware performance is below expectations server_id=35516.
2023-11-15 12:24:17 [info     ] CPU benchmark completed after 10s for server_id=7582
2023-11-15 12:24:17 [info     ] CPU benchmark score is 15 for server_id=7582
2023-11-15 12:24:20 [info     ] CPU benchmark completed after 3s for server_id=24315
2023-11-15 12:24:20 [info     ] CPU benchmark score is 76 for server_id=24315
2023-11-15 12:24:21 [info     ] GPU benchmark completed after 1s for server_id=24315
2023-11-15 12:24:21 [info     ] CPU benchmark completed after 10s for server_id=41992
2023-11-15 12:24:21 [info     ] GPU benchmark score is 25 for server_id=24315
2023-11-15 12:24:21 [info     ] CPU benchmark score is 54 for server_id=41992
2023-11-15 12:24:21 [error    ] Benchmark failed on server_id=24315 with Hardware performance is below expectations server_id=24315.
2023-11-15 12:24:24 [info     ] GPU benchmark completed after 3s for server_id=41992
2023-11-15 12:24:24 [info     ] GPU benchmark score is 61 for server_id=41992
2023-11-15 12:24:25 [info     ] GPU benchmark completed after 8s for server_id=7582
2023-11-15 12:24:25 [info     ] GPU benchmark score is 52 for server_id=7582
2023-11-15 12:24:25 [error    ] Benchmark failed on server_id=7582 with Hardware performance is below expectations server_id=7582.
2023-11-15 12:24:25 [info     ] CPU benchmark completed after 9s for server_id=14548
2023-11-15 12:24:25 [info     ] CPU benchmark score is 93 for server_id=14548
2023-11-15 12:24:28 [info     ] GPU benchmark completed after 3s for server_id=14548
2023-11-15 12:24:28 [info     ] GPU benchmark score is 87 for server_id=14548
2023-11-15 12:24:28 [info     ] Out of 10, 7 servers failed. failed_servers=[24318, 25634, 37233, 45461, 35516, 24315, 7582]
```

A welcome side effect of this approach is that now, `benchmark_multiple_servers()` will also catch unexpected errors and will not crash.

In real world applications, there could be a lot of unexpected errors. In our code alone, `ssh_client` could throw connection errors.

In most cases, we don't want the main thread that orchestrates things to crash at all costs. Main thread crashing could result in unexpected behavior.

:::note
`future.result()` rethrows an error if an error was thrown on the thread. As such, instead of doing `future.exception()` you can also do a try except clause.

I myself prefer the `future.exception()` because it is more friendly to [`pylint broad-exception-caught`](https://pylint.readthedocs.io/en/latest/user_guide/messages/warning/broad-exception-caught.html).
:::

As we can see, adding a 'per-thread main function' abstraction layer could actually simplify the whole process when scaling.

Last updated: November 15, 2023
