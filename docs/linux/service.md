---
id: linux-concept-service
title: Service Manager
sidebar_label: Service Manager
sidebar_position: 103
tags:
  - Linux
---

Main source of this document: [LPIC-1 Exam 101 Learning Material: 101.3](https://learning.lpi.org/en/learning-materials/learning-materials/)

## What are services, processes, and jobs?

In Linux, a process is a running instance of a computer program. Any running program is a process, no matter by who or from where it is executed.

A service (also called daemons) usually refers to a background process (a process that does not need user interaction) that provides functionality for the operating system. Services are generally started during boot and managed by the service manager.

A job is a concept related to the shell, not the OS itself. A job is a process that we, the user, start interactively.

Details on jobs and processes will be discussed in another note. We will focus on services and service managers on this note.

## What about service managers?

Service Managers are the program that manages services, and it is the first program launched by the kernel boot. Strictly speaking, it is the first process executed in the [user-space environment](https://en.wikipedia.org/wiki/User_space_and_kernel_space). This is why its PID (process identification number) is always `1`.

`systemd` is the service manager most used in modern Linux distributions. We will discuss mainly `systemd` and then explain the difference with its predecessor, `SysV`.

## `systemd`: Service manager of modern Linux distribution

### A Brief Overview

`systemd` is the manager for most modern Linux distributions. In `systemd`, system resources and services are referred to as units. For example, the docker service is called `docker.service`, and the collection of units needed for a graphical desktop environment is called `graphical.target`. As shown by these examples, the naming scheme of units follows `<name>.<type>`.

Some of the primary unit types include:

- `service` - Individual service. The most common unit.
- `target` - A collection of other units representing a system state.
- `socket` - Unit for inter-process communication.
- `device` - Unit associated with a hardware device. A device will only be taken as a unit if a udev rule for it exists.
- `mount` - A mount point definition in the filesystem, similar to `/etc/fstab`.
- `automount` - A mount unit that is automatically activated instead of manually activated.

Configuration files of every unit are located in `/lib/systemd/system/`

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

We can interact with `systemd` with the `systemctl` utility. Here is a list of frequently used `systemctl` commands. Here, `<type>` refers to unit type the command applies to.

#### General

- `systemctl list-unit-files` - Lists all available units and show if they are enabled. Pass the option `--type=TYPE` to only show units of `TYPE` type.
- `systemctl list-unit` - Lists all active units. Pass the option `--type=TYPE` to only show units of `TYPE` type.
- `systemctl reboot` - Reboot the system. Same effect as `systemctl isolate reboot.target`
- `systemctl poweroff` - Power off the system. Same effect as `systemctl isolate shutdown.target`
- `systemctl suspend` - Sleeps the system. Data in memory is as is.
- `systemctl hibernate` - Hibernates the system. Data in memory is moved to disk.
- `systemctl rescue` - Puts the system in rescue mode (similar to "safe mode" on Windows). Same effect as `systemctl isolate rescue.target`

#### Services

- `systemctl start [<service>]`　- Starts unit
- `systemctl stop [<service>]`　- Stops unit
- `systemctl restart [<service>]`　- Restarts unit
- `systemctl status [<service>]`　- Shows the state of unit
- `systemctl is-active [<service>]`　- Shows `active` if unit is running, `inactive` otherwise.
- `systemctl enable [<service>]`　- Makes unit start from the next system initialization. Does NOT start unit immediately.
- `systemctl disable [<service>]`　- Unit will not start from the next system initialization.
- `systemctl is-enabled [<service>]` - Outputs `enabled` or `disabled`.

#### Targets

- `systemctl isolate [<target>]` - Alternate to the target unit.
- `systemctl set-default [<target>]` - Set the default initialization target. Usually defaults to `multi-user.target` or `graphical.target`.
- `systemctl get-default` - Get the default initialization target.

### More on units

#### What exactly are targets?

Targets are a unit containing a collection of other units to represent a system state.
If our Linux installation has a graphical desktop environment, that is a system state in which the GUI is loaded (as opposed to a CLI only installation).
The collection of units needed to achieve this state is called the `graphical.target`.
For example, in an installation of Ubuntu for desktop use, this `graphical.target` is the default target.
The default target is the target unit that is targeted when the system boots (i.e., the default state of the system we want to achieve on the boot process).

In this `graphical.target`, there might be multiple units, such as `mutter.service` if we use GNOME for our desktop environment, `network.target` to provide network connectivity, etc.

Some targets could co-exist and complement each other such as the `graphical.target` and `network.target`, however some targets, such as `rescue.target` (single user target) and `multi-user.target` (usually the default target for a non-graphical Linux installation) are mutually exclusive.

There can be only one default target. It will usually be `multi-user.target` or `graphical.target`. Another notable target is the `rescue.target`, a system state for recovery akin to "Safe Mode" for Windows.

#### Mount units vs. automount units

On a mount unit configuration such as the `/lib/systemd/system/sample.mount` example above, we can pass the `x-systemd.automount=true` to enable automount. When automounting is available, the device is not mounted right away. Instead, when an access to `/mnt/usb` is detected (via [kernel inotify event](https://man7.org/linux/man-pages/man7/inotify.7.html)), `/dev/sdb1` is mounted at that time and the `sample.automount` event is created. When `/mnt/usb` doesn't get accessed after a while after mounting, it is automatically dismounted.

This is in contrast to if you activate the mount unit via `systemctl mount sample.mount`, it will mount `/dev/sdb1` to `/mnt/usb` until we unmount it with `systemctl umount sample.mount`.

## SysVinit: The legacy service manager

SysVinit is a service manager replaced by `systemd`, which we might still encounter in legacy systems.
SysVinit systems are easily understandable if we understand the concept of target units in `systemd`.

In SysVinit, there are only 6 desired system state which is called runlevels.
Each runlevel is mutually exclusive to the other (i.e., you cannot have two runlevels active at the same time).
What services should be enabled and disabled are defined at each runlevel.
In systemd terms, think of it as having 6 mutually exclusive targets as the whole service manager.

The runlevels are defined below:

- `Runlevel 0` - Shutdown (equivalent to systemd's `shutdown.target`)
- `Runlevel 1, s or single` - Single user mode (`rescue.target`)
- `Runlevel 2,3,4` - Multi-user mode. 3 is the most used one (`multi-user.target`)
- `Runlevel 5` - Graphical multi-user mode (`graphical.target`)
- `Runlevel 6` - Restart (`reboot.target`)

The settings, such as default runlevel, is set on the `/etc/inittab` file.

```ini title=/etc/inittab
# id:runlevels:action:process is the syntax
...
id:x:initdefault # Default runlevel is x, x should not be 0 or 6
...
```

During boot, the program `/sbin/init` will look into this `/etc/inittab` and get the default runlevel. If for example, the default runlevel is 3, it will execute the scripts stored at `/etc/init.d/rc3.d/`.

An example of `/etc/init.d/rc3.d/` contents is as follows.

```
S01network
S02sshd
S10cron
K20apache2
K30smbd
K99halt
```

Here, files starting with `S` indicates that the service should be started, and `K` means that the service should be killed to achieve the desired runlevel. The two digits after it represents the order the service should be started and killed. Lastly, there is the service name itself.

Some useful commands related to runlevels:

- `runlevel` - Shows current runlevel
- `telinit <runlevel>` - Change system to runlevel `<runlevel>`
- `telinit q` - Reload configuration. Run this if `/etc/inittab` is modified.

## Extra Notes

- The exact definition of service and daemons are rather foggy. It is safe to assume that it refers to the background process closely related to the operating system and managed by service managers.
- There are also other service managers such as `Upstart` that we didn't discuss, as modern Linux systems mostly use `systemd` and legacy systems `SysV`

Last Updated: July 28, 2023
