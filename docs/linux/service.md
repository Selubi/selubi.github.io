---
id: linux-concept-service
title: Service Manager
sidebar_label: Service Manager
sidebar_position: 103
tags:
  - Linux
---

Main source of this document: [LPIC-1 Exam 101 Learning Material: 101.3](https://learning.lpi.org/en/learning-materials/learning-materials/)

## What are services, processes and jobs?

In Linux, a process is a running instance of a computer program. Basically any running program is a process, nomatter by who or from where it is executed from.

A service (also called daemons) usually refers to a background process (a process that does not need user interaction) that provides functionality for the operating system. Services are usually ran during boot and managed by the service manager.

A job is a concept related to the shell not the OS itself. A job is a process that we, the user, start interactively.

Details on jobs and processes will be discussed in another note. We will focus on services and service managers on this note.

## What about service managers?

Service Managers are the program that manages services and it is the first program launched by the kernel boot. Strictly speaking, it is the first process executed in the [user-space environment](https://en.wikipedia.org/wiki/User_space_and_kernel_space). This is why its PID (process identification number) is always `1`.

`systemd` is the service manager most used in modern linux distributions. We will discuss mostly about `systemd` and then explain the difference with its predecessor, `SysV` after.

## `systemd`: Service Manager of modern linux distribution

`systemd` is the manager for most modern linux distribution. In `systemd`, system resources and services are referred to as units. For example, the docker service is called `docker.service`, and the collection of units needed for a graphical desktop environment is called `graphical.target`. As shown by these examples, the naming scheme of units follows `<name>.<type>`.

Some of the major unit types include:

- `service` - Individual service. The most common unit. More explanations below.
- `target` - A collection of other units to represent a system state. More explanations below.
- `socket` - Unit for inter-process communication.
- `device` - Unit associated with a hardware device. A device will only taken as a unit if a udev rule for it exists.
- `mount` - A mount point definition in the filesyste, similar to `/etc/fstab`.
- `automount` - A mount unit that is automatically activated instead of manually activated. More explanations below.
- `snapshot` - Saved state of systemd manager

### Mount units vs. automount units.

## Extra Notes

- The exact definition of service and daemons are rather foggy. It is safe to assume that it refers to the background process that is closely related to the operating system, and managed by service managers.
- There are also other service managers such as `Upstart` that we didn't discuss, as modern linux systems mostly used `systemd` and legacy systems `SysV`
