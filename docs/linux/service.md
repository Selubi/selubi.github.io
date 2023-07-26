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

A service (also called daemons) usually refers to a background process (a process that does not need user interaction) that provides functionality for the operating system. Services are usually ran during boot and managed by the service manager. `systemd` is the service manager is most modern linux distributions.

A job is a concept related to the shell not the OS itself. A job is a process that we, the user, start interactively. Details on jobs will be discussed in another note.
