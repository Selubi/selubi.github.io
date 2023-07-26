---
id: linux-concept-service
title: Service Manager
sidebar_label: Service Manager
sidebar_position: 103
tags:
  - Linux
---

Main source of this document: [LPIC-1 Exam 101 Learning Material: 101.3](https://learning.lpi.org/en/learning-materials/learning-materials/)

## Services, Processes and Jobs

In Linux, a process is a running instance of a computer program. Basically any running program is a process, nomatter by who or from where it is executed from.

A service (also called daemons) usually refers to a background process (a process that does not need user interaction) that provides functionality for the operating system. Services are usually ran during boot and managed by the service manager.

A job is a concept related to the shell not the OS itself. A job is a process that we, the user, start interactively.

Details on jobs and processes will be discussed in another note. We will focus on services and service managers on this note.

## Service Managers

Service Managers are the program that manages services and it is the first program launched by the kernel boot. Strictly speaking, it is the first process executed in the [user-space environment](https://en.wikipedia.org/wiki/User_space_and_kernel_space). This is why its PID (process identification number) is always `1`.

`systemd` is the service manager most used in modern linux distributions. We will discuss mostly about `systemd` and then explain the difference with its predecessor, `SysV` after.

## Extra Notes

- The exact definition of service and daemons are rather foggy. It is safe to assume that it refers to the background process that is closely related to the operating system, and managed by service managers.
- There are also other service managers such as `Upstart` that we didn't discuss, as modern linux systems mostly used `systemd` and legacy systems `SysV`
