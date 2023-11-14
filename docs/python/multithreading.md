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

# Scenario

Consider that we want to perform periodical benchmarks on servers.

Here, we assume that:

- There is a `ProvisionerClient` class to interact with server provisioner API that can perform:
  - `ProvisionerClient.install(server_id, osystem)` - Installs the `osystem` OS to the machine. May raise `ServerOperationError` when failed.
  - `ProvisionerClient.benchmark(server_id)` - Performs benchmarks on the machine. Returns a benchmark score.
  - `ProvisionerClient.destroy(server_id)` - Uninstalls the OS from machine and returns it to a clean slate. May raise `ServerOperationError` when failed.
  - `ProvisionerClient.mark_as_broken(server_id)` - Mark the server as broken
- We can perform operations or get informations on a particular server with `server_id`
- Clean state: A state where a machine is ready to accept OS installation, but have nothing installed on it yet.

As we can see, the types of functions from `ProvisionerClient` we are dealing with are functions that performs actions instead of functions that manipulates data.
These types of function, are usually designed to be self-contained and throw exceptions when needed. As such, handling these exceptions are crucial.

Say we now want to implement a python script that is periodically run by a CI/CD job like Jenkins.
The script requirements:

- Takes a `server_ids: List[int]` argument
- Performs benchmark in each server, mark the server as broken if the performance is below a certain treshold.
- Mark the server as broken if there is an install / destroy error.

As we can see, an operation of a server will not affect other servers. This is a textbook example of when to use multithreading.

# Implementation

We will use the `concurrent.futures` module `ThreadPoolExecutor` class to handle the multithreading. A sample implementation would look like this.

```python title="benchmark.py"
import concurrent.futures
import ProvisionerClient

MAX_THREAD=15
BENCHMARK_THRESHOLD=50

def PerformanceError(Exception):
    """Server performance is below expected treshold"""

def benchmark_single_server(provisioner, server_id):
    """A single threaded function that installs, performs benchmarks on, and destroys single server"""
    provisioner.install(server_id)

    if provisioner.benchmark(server_id) < BENCHMARK_THRESHOLD:
        raise PerformanceError

    provisioner.destroy(server_id)

def benchmark_multiple_server(provisioner, server_ids):
    success_servers = []
    failed_servers = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_THREAD) as executor:
        futures = {  # Dict[asyncio.future,int] (Dict comprehension)
            executor.submit(benchmark_single_server, provisioner, server_id): server_id
            for server_id in server_ids
        }

        # Collect the succeeded and failed servers
        for future in concurrent.futures.as_completed(futures):
            server_id = futures[future]  # Get server id from futures dict.
            if future.exception():
                provisioner.mark_as_broken(server_id)
                failed_servers += [server_id]
            else:
                success_servers += [server_id]

    return success_servers, failed_servers

if __name__ == "__main__":
    provisioner = ProvisionerClient()
    benchmark_multiple_server(provisioner, sys.argv[1:])

```

Last updated: November 14, 2023
