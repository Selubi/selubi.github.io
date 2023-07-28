---
id: linux-cheat-sheet
title: Linux Cheat Sheet
sidebar_label: Cheat Sheet
sidebar_position: 1
tags:
  - Linux
---

Notable commands, variables and files for administering linux.

Paths ending with `/` is a directory, and those without it is a file. Example: `~/test` is a file and `~/test/` is a folder.

## Environment Variables

Environment variables are variables accessible by a specific instance of a process, usually within a shell session.

### Commands:

- `VARIABLE=value` - Assigns `value` to `VARIABLE`. If `VARIABLE` already exxists, this overwrites its previous value.
- `$VARIABLE` - Accesses the value of `VARIABLE`. When a command is executed, `$VARIABLE` is expanded to its values.
- `echo $VARIABLE` - Displays the value of `VARIABLE`.
- `set` - Lists all currently set environment variables.
- `unset VARIABLE` - Removes the environment variable `VARIABLE`.
- `export VARIABLE` - Makes `VARIABLE` accessible to child processes spawned by the current process. `export VARIABLE=value` is equivalent to `VARIABLE=value && export VARIABLE`.

## GRUB (Bootloader)

UEFI system and GRUB 2 is assumed in this section.

### Commands:

- `grub-install` - Installs GRUB to `/boot/efi/`. Pass the `--efi-directory` option to install to other directory.
- `update-grub` - Shortcut to the command `grub-mkconfig -o /boot/grub/grub.cfg`. Updates GRUB configuration file (commonly located in `/boot/grub/grub.cfg`) from the definitions in `/etc/default/grub` and `/etc/grub.d/`
- Press`C` when on GRUB menu screen to access GRUB shell.

### Variables:

- `$prefix` - GRUB configuration path location. (This is a variable for GRUB shell, not linux one)

### Files:

- `/boot/efi/` - Mount point of ESP (EFI System Partition) containing the actual bootloader UEFI accesses
- `/boot/grub/grub.cfg` - Common location for GRUB configuration file. Located in root partition. Do not edit directly, edit `/etc/default/grub` and run `update-grub` instead.
- `/etc/grub.d/` - `update-grub` changes `/boot/grub/grub.cfg` based on this folder. Contents are executed in numerical order. Custom entries are usualy added to `40_custom` file. Example entry is shown below.
  ```
  menuentry "Default OS" {
      set root=(hd0,1)
      linux /vmlinuz root=/dev/sda1 ro quiet splash
      initrd /initrd.img
  ```
  - `set root=(hd0,1)` - Sets device and partition of root folder of OS. `hd0`,`hd1`,... corresponds to `/dev/sda`,`dev/sdb`,... in linux. Partition numbering starts at 1. So, this configuration in particular equates to `/dev/sda1`
  - `/vmlinuz` - Location of linux kernel. Because the kernel is located directly inside root folder, we can assume that this configuration has a seperate boot partition and it is not located at `/dev/sda1` `(hd0,1)`. If there is no boot partition and the boot folder is located within root parition, something like `/boot/vmlinuz` will instead be shown instead.

## systemd (Service Manager)

### Commands:

#### General

- `systemctl list-unit-files` - Lists all available units and show if they are enabled. Pass the option `--type=TYPE` to only show units of `TYPE` type.
- `systemctl list-units` - Lists all active units. Pass the option `--type=TYPE` to only show units of `TYPE` type.
- `systemctl reboot` - Reboot the system. Same effect as `systemctl isolate reboot.target`
- `systemctl poweroff` - Power off the system. Same effect as `systemctl isolate shutdown.target`
- `systemctl suspend` - Sleeps the system. Data in memory is saved as is.
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
- `systemctl set-default [<target>]` - Set the default initialization target for subsequent boots. Usually defaults to `multi-user.target` or `graphical.target`.
- `systemctl get-default` - Get the default initialization target.

### Files:

- `/lib/systemd/system/` - Location of unit configuration file

## Shared Libraries

### Commands:

- `ldconfig` - Reads `/etc/ld.so.conf` and `/etc/ld.so.conf.d/*` to configure shared library location and caches them into `/etc/ld.so.cache`.
  - `-p` - Shows currently cached shared library (do not update the cache).
  - `-v` - Updates the cache and show the cache while doing so.
- `ldd [program || so]` - Shows shared library dependencies of a program or shared object.
- `objdump` & `readelf` - Examines contents of object, binary, and shared library files

### Variables:

- `$LD_LIBRARY_PATH` - Colon (`:`) separated set of directories to look for libraries. User configured. Empty by default.

### Files:

- `/etc/ld.so.conf.d/` - `ld` (dynamic linker) looks for shared library paths defined in files in this folder.

Last updated: July 28, 2023
