---
id: linux-concept-grub
title: GRUB Bootloader
sidebar_label: GRUB Bootloader
sidebar_position: 102
tags:
  - Linux
---

One of the primary sources of this document is the [LPIC-1 Exam 101 Learning Material: 102.2](https://learning.lpi.org/en/learning-materials/learning-materials/).
However, particularly for this topic, plenty of scattered information across the internet is used as the source.

## What is it?

A bootloader is the first software that runs after the computer is powered on. It is executed by the system firmware (UEFI/BIOS), whose primary responsibility is identifying and loading the operating system kernel and passing control to it.

The bootloader screen is typically skipped if the system only has one OS. If you ever saw a list of operating systems to boot from, that screen is the bootloader.

When you install a Linux distribution, it usually comes with a bootloader called [GRUB (GRand Unified Bootloader)](https://www.gnu.org/software/grub/).

When we refer to GRUB, we usually refer to GRUB 2, which replaced the original GRUB (now called GRUB Legacy).

In UEFI systems, GRUB is installed in an ESP (EFI System Partition) as an EFI Application. If the system has multiple GRUB, which may happen when you install multiple OSes, it will show as separate entries in the UEFI bootloader configuration.

In BIOS systems, GRUB is installed in the MBR (Master Boot Record). [BIOS only executes the MBR of the first disk](./bios.md#bios-difference-to-uefi), so other MBRs (in different disks) are ignored even if it exists.

A single GRUB can handle the boot of multiple operating systems when appropriately configured.

## Location of GRUB and its config files

In UEFI based system, GRUB is loaded from the file `grubx64.efi` or `grubia32.efi` for 64-bit and 32-bit systems, respectively, from the ESP. Linux distributions often mount the contents of the ESP at `/boot/efi` or `/efi` (the exact location depends on the distribution).

:::note
After you reach the Operating System, `/boot/efi` does not impact the current session. The purpose of mounting it is to configure it for the sessions after.
:::

The location of the GRUB config file is a topic that is confusing to find a definite answer on. First, GRUB reads the configuration from a file called `grub.cfg`.

In BIOS based machine, the `grub.cfg` is located on `/boot/grub`. Here, GRUB (located in MBR) is configured to look for the config files in the pre-specified partition. A reminder that [BIOS and UEFI partition works differently](https://superuser.com/questions/368173/what-is-the-maximum-number-of-partitions-that-can-be-made-on-a-hard-drive).

`grub.cfg` may be stored in ESP with GRUB itself in UEFI systems, but this is not always true. In many cases, to maintain compatibility with BIOS, it is located in `/boot/grub`, which is the mount location of the boot partition. If there is no boot partition, `/boot/grub` (and consequently `grub.cfg`) is located on the root partition.

RHEL (Red Hat Enterprise Linux) used to put `grub.cfg` in the ESP for UEFI based machine and `/boot/grub` on others, but [RHEL 9 changes this location to `/boot/grub` uniformly](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html-single/9.0_release_notes/index#enhancement_boot-loader).

GRUB checks the [`$prefix` variable](https://www.gnu.org/software/grub/manual/grub/html_node/prefix.html) for the `grub.cfg` location. This is set during the installation of GRUB.

:::note
The `$prefix` variable is for the GRUB command line, not the Linux one.
:::

## Installing GRUB

GRUB typically comes with a Linux installation. However, sometimes we may want to install it by ourselves.

Installing GRUB usually means creating the EFI Application Partition in which GRUB resides.

On UEFI-based systems, running `grub-install` without any options will install GRUB to `/boot/efi/`, the mount point for the EFI system partition. This works if you already have an EFI partition. If we install it this way, the boot directory (configuration directory) will depend on the Linux distribution.

If we have a fresh drive with nothing on it, we can install GRUB by modifying the `grub-install` command as follows

```bash
grub-install --boot-directory=<DESIRED_BOOT_CONFIGURATION_PATH> <DESIRED_DEVICE_PATH>
```

When running this command, grub will be installed in the `<DESIRED_DEVICE_PATH>` such as `/dev/sda` and that GRUB will look for the configuration for the OS you are currently installing from at `<DESIRED_BOOT_CONFIGURATION_PATH>`.

Here, `<DESIRED_BOOT_CONFIGURATION_PATH>` can be a directory in the root partition, such as `/boot/` or a mount directory of a boot partition.
For example, if we have a boot partition at `/dev/sda1` and want to install GRUB on the same device, we can execute the below command.

## Configuring GRUB

### Configuring the behavior of GRUB itself

In this section, GRUB configuration files are assumed to be located at `/boot/grub/grub.cfg`

It is not recommended to change the contents of `grub.cfg` directly. Instead, we can edit `/etc/default/grub` and `/etc/grub.d/` and run the `update-grub` command.

`update-grub` is a shortcut to `grub-mkconfig -o /boot/grub/grub.cfg` or something equivalent.

`/etc/default/grub` contains parameters to configure the grub behavior itself. Below is an example `/etc/default/grub`.

```bash title="/etc/default/grub"
# Default GRUB configuration file

# Set the default boot entry. (e.g. '0' for the first entry)
GRUB_DEFAULT=0

# Uncomment and set to 'true' to enable GRUB to remember the last boot choice
GRUB_SAVEDEFAULT="true"

# Set the timeout in seconds for GRUB menu to automatically boot the default entry. -1 for no time limit.
GRUB_TIMEOUT=5

# Additional kernel command-line parameters for all Linux entries (including recovery)
GRUB_CMDLINE_LINUX=""

# Additional kernel command-line parameters for the default Linux entry (excluding recovery)
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"

# Enable GRUB to unlock encrypted disks at boot
GRUB_ENABLE_CRYPTODISK="y"
```

By default, two menu entries are generated for each Linux kernel, one with the default options and one entry for recovery. `GRUB_CMDLINE_LINUX` modifies the recovery entries while `GRUB_CMDLINE_LINUX_DEFAULT` does not.

### Configuring GRUB Menu Entries

By default, `update-grub` will detect kernels and OSes present on the machine and generate the entries automatically. New entries could also be added manually to the `/etc/grub.d/`.

`/etc/grub.d/` contains scripts that are to be executed in numerical order. Scripts in this directory should be executable. The naming convention of scripts contained here depends on each distribution.

Usually, we can add a menu entry to the `/etc/grub.d/40_custom` file. An example menu entry is shown below.

```
menuentry "Default OS" {
    set root=(hd0,1)
    linux /vmlinuz root=/dev/sda1 ro quiet splash
    initrd /initrd.img
```

- `set root=(hd0,1)` - Sets device and partition of the root folder of OS. `hd0`,`hd1`,... corresponds to `/dev/sda`,`dev/sdb`,... in linux. Partition numbering starts at 1. So, this configuration in particular equates to `/dev/sda1`
- `/vmlinuz` - Location of Linux kernel. Because the kernel is located directly inside the root folder, we can assume that this configuration has a separate boot partition, and it is not located at `/dev/sda1` `(hd0,1)`. If there is no boot partition and the boot folder is located within the root partition, something like `/boot/vmlinuz` will instead be shown instead.

Instead of directly specifying the device and partition, GRUB 2 can also search for a file system with a specific UUID (Universally Unique Identifier). In that case, we can replace `set root=(hd0,1)` with the configuration below.

```bash
search --set=root --fs-uuid <UUID>
```

## Interacting with GRUB

GRUB screen will usually be skipped if we have only one OS installed.
If we want to show GRUB, press `Shift` or `Esc` during boot.
The grub screen is a list of menu entries to boot into.

When selecting a menu entry, press `E` to edit the options (such as kernel parameters) for that entry.
This action will open an editor related to that entry's configuration.
An example use-case for this is booting to rescue mode.
We can do that by setting `systemd.unit=rescue.target` on systemd-based entries.

We can also press `C` to enter the GRUB shell and type `help` to list all available commands.

## Extra Notes

The information regarding bootloaders is all over the place. For example, below are some questions that might get different answers.

- If we install GRUB via RHEL installation and Ubuntu after that, will Ubuntu's installation wizard GRUB create a different ESP or modify the existing one?
- Where is the exact location of `grub.cfg` for `X` distro?
- What are the exact contents of the `ESP`?
- How does the Windows bootloader play with GRUB?

To get definite answers to these, we need to do experimentation. Always do a backup before messing with GRUB, as a wrong configuration can easily break things.

Last updated: July 28, 2023
