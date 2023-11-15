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

For me, my background is from bare-metal server operation automations.
As such, my uses for multithreading is performing automations on multiple server at once (e.g. one server per thread),
how to orchestrate it effectively and how to make a good multithreaded log it.

# Basic syntax

Consider that we want to perform benchmarks on servers.

A basic syntax would look something like this

```python title="benchmark.py"
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

    # Normally you would run some benchmark commands via the SSH Client
    # But we are just going to simulate it for this tutorial
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
- If we were to add another benchmark, lets say `benchmark_gpu()` this script won't scale well
- Logging is verbose, we need to add `{server_id=}` in every time. This also makes the log inflexible.
- It doesn't handle unexpected errors.

In the following section we will build on this base syntax address these issues.

# The not-blind orchestrator

Right now, the orchestrator doesn't know which server failed the benchmark.

As someone who reads the log, we can scroll to know which server failed but it is an inconvenience. Imagine trying to find two failed server within hundreds.

To address this, instead of doing a list comprehension for `futures`, we can do a dict comprehension to associate futures with server ids as shown below.

```python title=benchmark.py
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

    # Normally you would run some benchmark commands via the SSH Client
    # But we are just going to simulate it for this tutorial
    benchmark_time = randint(1, 10)
    sleep(benchmark_time)  # Simulate time it needs to benchmark
    logger.info(f"CPU benchmark completed after {benchmark_time}s for {server_id=}")

    benchmark_score = randint(0, 100)
    logger.info(f"CPU benchmark score is {benchmark_score} for {server_id=}")
    return benchmark_score


def benchmark_multiple_servers(server_ids):
    """Orchestrates benchmarks of multiple server"""
    logger.info(f"Servers to benchmark: {server_ids}")
    // highlight-next-line
    failed_servers = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        // highlight-start
        futures = {
            # Dict[asyncio.future,List[int]] (Dict comprehension)
            executor.submit(benchmark_cpu, server_id): server_id
            for server_id in server_ids
        }
        // highlight-end
        for future in concurrent.futures.as_completed(futures):
            # Will be executed when a thread represented by future is completed.
            if future.result() < 50:
                // highlight-next-line
                failed_servers.append(futures[future])
    // highlight-start
    logger.info(
        f"Out of {len(server_ids)}, {len(failed_servers)} servers failed. {failed_servers=}"
    )
    // highlight-end


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
The operators that will read the log will instantly know which servers failed.
They can then `Ctrl+F` the log, or `grep` by `server_id` to filter and troubleshoot.

Assuming the above output was saved into `benchmark.log`, we can do something like below.

```log
$ grep 7085 benchmark.log
2023-11-15 11:24:12 [info     ] Servers to benchmark: [22484, 38612, 27762, 36250, 7085, 16448, 104, 30749, 32687, 47058]
2023-11-15 11:24:15 [info     ] CPU benchmark completed after 3s for server_id=7085
2023-11-15 11:24:15 [info     ] CPU benchmark score is 0 for server_id=7085
2023-11-15 11:24:27 [info     ] Out of 10, 3 servers failed. failed_servers=[7085, 30749, 32687]
```

Last updated: November 14, 2023
