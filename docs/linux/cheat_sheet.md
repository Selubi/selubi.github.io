---
id: linux-cheat-sheet
title: Linux Cheat Sheet
sidebar_label: Cheat Sheet
sidebar_position: 1
tags:
  - Linux
---

Notable commands, variables and files for administering linux.

## GRUB (Bootloader)

UEFI system and GRUB 2 is assumed in this section.

### Commands:

- `grub-install` - Installs GRUB to `/boot/efi`. Pass the `--efi-directory` option to install to other directory.
- `update-grub` - Updates GRUB configuration file (commonly located in `/boot/grub/grub.cfg`) from the definitions in `/etc/default/grub`
- Press`C` when on GRUB menu screen to access GRUB shell.

### Variables:

- `$prefix` - GRUB configuration path location. (This is a variable for GRUB shell, not linux one)

### Files:

- `/boot/efi` - Mount point of ESP (EFI System Partition) containing the actual bootloader UEFI accesses
- `/boot/grub/grub.cfg` - Common location for GRUB configuration file. Located in root partition. Do not edit directly, edit `/etc/default/grub` and run `update-grub` instead.
- `/etc/default/grub.d/` - `update-grub` changes `/boot/grub/grub.cfg` based on this folder. Contents are executed in numerical order. Custom entries are usualy added to `40_custom` file. Example entry is shown below.
  ```
  menuentry "Default OS" {
      set root=(hd0,1)
      linux /vmlinuz root=/dev/sda1 ro quiet splash
      initrd /initrd.img
  ```
  - `set root=(hd0,1)` - Sets device and partition of root folder of OS. `hd0`,`hd1`,... corresponds to `/dev/sda`,`dev/sdb`,... in linux. Partition numbering starts at 1. So, this configuration in particular equates to `/dev/sda1`
  - `/vmlinuz` - Location of linux kernel. Because the kernel is located directly inside root folder, we can assume that this configuration has a seperate boot partition and it is not located at `/dev/sda1` `(hd0,1)`. If there is no boot partition and the boot folder is located within root parition, something like `/boot/vmlinuz` will instead be shown instead.

## Shared Libraries

### Commands:

- `ldconfig` - Reads `/etc/ld.so.conf` and `/etc/ld.so.conf.d/*` to configure shared library location and caches them into `/etc/ld.so.cache`.
  - `-p` - Shows currently cached shared library (do not update the cache).
  - `-v` - Updates the cache and show the cache while doing so.
- `ldd [program || so]` - Shows shared library dependencies of a program or shared object.
- `objdump` & `readelf` - Examines contents of object, binary, and shared library files

### Variables:

- `LD_LIBRARY_PATH` - Colon (`:`) separated set of directories to look for libraries for user configuration. Empty by default.

### Files:

- `/etc/ld.so.conf.d/` - `ld` (dynamic linker) looks for shared library paths defined in files in this folder.

Last updated: July 20, 2023
