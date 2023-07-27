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

### A Brief Overview

`systemd` is the manager for most modern linux distribution. In `systemd`, system resources and services are referred to as units. For example, the docker service is called `docker.service`, and the collection of units needed for a graphical desktop environment is called `graphical.target`. As shown by these examples, the naming scheme of units follows `<name>.<type>`.

Some of the major unit types include:

- `service` - Individual service. The most common unit. More explanations below.
- `target` - A collection of other units to represent a system state. More explanations below.
- `socket` - Unit for inter-process communication.
- `device` - Unit associated with a hardware device. A device will only taken as a unit if a udev rule for it exists.
- `mount` - A mount point definition in the filesyste, similar to `/etc/fstab`.
- `automount` - A mount unit that is automatically activated instead of manually activated. More explanations below.
- `snapshot` - Saved state of systemd manager

Configuration files of every unit is located in `/lib/systemd/system/`

Here is an example of a configuration for a `.mount` unit.

```ini title=/lib/systemd/system/sample.mount
[Unit]
Description=USB Drive Automount sample

[Mount]
What=/dev/sdb1
Where=/mnt/usb
Type=auto
Options=defaults,noatime
x-systemd.automount=true

[Install]
WantedBy=multi-user.target
```

### Interacting with `systemd` with `systemctl`

We can interact with `systemd` with the `systemctl` utility. Here is a list of frequently used `systemctl` commands. Here, `<type>` refers to unit type the command is applicable to.

#### General

- `systemctl list-unit-files` - Lists all available units and show if they are enabled. Pass the option `--type=TYPE` to only show units of `TYPE` type.
- `systemctl list-unit` - Lists all active units
- `systemctl reboot` - Reboot the system. Same effect as `systemctl isolate reboot.target`
- `systemctl poweroff` - Power off the system. Same effect as `systemctl isolate shutdown.target`
- `systemctl suspend` - Sleeps the system. Data in memory is as is.
- `systemctl hibernate` - Hibernates the system. Data in memory is moved to disk.

#### Services

- `systemctl start [<service>]`　- Starts unit
- `systemctl stop [<service>]`　- Stops unit
- `systemctl restart [<service>]`　- Restarts unit
- `systemctl status [<service>]`　- Shows state of unit
- `systemctl is-active [<service>]`　- Shows `active` if unit is running, `inactive` otherwise.
- `systemctl enable [<service>]`　- Makes unit start starting from next system initialization. Does NOT start unit immediately.
- `systemctl disable [<service>]`　- Unit will not start starting from next system initialization.
- `systemctl is-enabled [<service>]` - Outputs `enabled` or `disabled`.

#### Targets

- `systemctl isolate [<target>]` - Alternate to the target unit.
- `systemctl set-default [<target>]` - Set the default initialization target. Usually defaults to `multi-user.target` or `graphical.target`.
- `systemctl get-default` - Get the default initialization target.

### More on units

#### What exactly are targets?

Targets are basically a unit that contains a collection of other units to represent a state. For example if we have a graphical desktop environment, the `graphical.target` is the default target when the system boots.

In this `graphical.target` there might be multiple units, such as `mutter.service` if we use GNOME for our desktop environment, `network.target` to provide network connectivity, etc.

Some targets could co-exist and complement each other such as the `graphical.target` and `network.target`, however some targets such as `rescue.target` (single user target) and `multi-user.target` (usually the default target for a non-graphical linux installations) are mutually exclusive.

#### Mount units vs. automount units.

On a mount unit configuration such as the `/lib/systemd/system/sample.mount` example above, we can pass the `x-systemd.automount=true` to enable automount. When automounting is available, the device is not mounted right away. Instead, when an access to `/mnt/usb` is detected (via [kernel inotify event](https://man7.org/linux/man-pages/man7/inotify.7.html)), `/dev/sdb1` is mounted at that time and the `sample.automount` event is created. When `/mnt/usb` doesn't get accessed after a period of time after mounting, it is automatically dismounted.

This is in contrast to if you activate the mount unit via `systemctl mount sample.mount`, it will mount `/dev/sdb1` to `/mnt/usb` until we unmount it with `systemctl umount sample.mount`.

## Extra Notes

- The exact definition of service and daemons are rather foggy. It is safe to assume that it refers to the background process that is closely related to the operating system, and managed by service managers.
- There are also other service managers such as `Upstart` that we didn't discuss, as modern linux systems mostly used `systemd` and legacy systems `SysV`
