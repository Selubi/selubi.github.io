---
id: linux-boot-grub
title: GRUB Bootloader
sidebar_label: GRUB Bootloader
sidebar_position: 2
tags:
  - Linux
---

One of the main sources of this article is the [LPIC-1 Exam 101 Learning Material: 102.2](https://learning.lpi.org/en/learning-materials/learning-materials/).
However, particularly for this topic, plenty of scattered information across the internet is used as the source.

## What is it?

A bootloader is the first software that runs after the computer is powered on. It is executed by the system firmware (UEFI/BIOS), whose main responsibility is to identify and load the operating system kernel and pass control to it. When you install a Linux distribution, it usually comes with a bootloader called [GRUB (GRand Unified Bootloader)](https://www.gnu.org/software/grub/).

When we refer to GRUB, usually, we are referring to GRUB 2, which replaced the original GRUB (now called GRUB Legacy).

In UEFI systems, GRUB is installed in an ESP (EFI System Partition) as an EFI Application. If the system has multiple GRUB, which may happen when you install multiple OSes, it will show as separate entries in the UEFI bootloader configuration.

In BIOS systems, GRUB is installed in the MBR (Master Boot Record). [BIOS only executes the MBR of the first disk](./bios.md#bios-difference-to-uefi), so other MBRs (in different disks) are ignored even if it exists.

A single GRUB can handle the boot of multiple operating systems when configured properly.

## Configuring GRUB

### Location of GRUB and its config files

In UEFI based system, GRUB is loaded from the file `grubx64.efi` or `grubia32.efi` for 64-bit and 32-bit systems, respectively, from the ESP. Linux distributions often mount the contents of the ESP at `/boot/efi` or `/efi` (the exact location depends on the distribution).

:::note
After you reach the Operating System, `/boot/efi` does not impact the current session. The purpose of mounting it is to configure it for the sessions after.
:::

The location of the GRUB config file is a topic that is confusing to find a definite answer on. First, GRUB reads the configuration from a file called `grub.cfg`.

<!-- However, this `grub.cfg` location is very flexible to the point that it's hard to pinpoint.  -->

In BIOS based machine, the `grub.cfg` is located on `/boot/grub`. Here, GRUB (located in MBR) is configured to look for the config files in the pre-specified partition. A reminder that [BIOS and UEFI partition works differently](https://superuser.com/questions/368173/what-is-the-maximum-number-of-partitions-that-can-be-made-on-a-hard-drive).

`grub.cfg` may be stored in ESP with GRUB itself in UEFI systems, but this is not always true. In many cases, to maintain compatibility with BIOS, it is located in `/boot/grub`, which is the mount location of the boot partition. If there is no boot partition, `/boot/grub` (and consequently `grub.cfg`) is located on the root partition.

RHEL (Red Hat Enterprise Linux) used to put `grub.cfg` in the ESP for UEFI based machine and `/boot/grub` on others, but [RHEL 9 changes this location to `/boot/grub` uniformly](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html-single/9.0_release_notes/index#enhancement_boot-loader).

GRUB checks the [`$prefix` variable](https://www.gnu.org/software/grub/manual/grub/html_node/prefix.html) for the `grub.cfg` location. This is set during the installation of GRUB.

:::note
The `$prefix` variable is for the GRUB command line, not the Linux one.
:::

### Configuring `grub.cfg`

TODO

## Extra Notes

The information regarding bootloaders is all over the place. For example, below are some questions that might get different answers.

- If we install GRUB via RHEL installation and Ubuntu after that, will Ubuntu's installation wizard GRUB create a different ESP or modify the existing one?
- Where is the exact location of `grub.cfg` for `X` distro?
- What are the exact contents of the `ESP`?
- How does the Windows bootloader play with GRUB?

To get definite answers to these, we need to do experimentation. Always do a backup before messing with GRUB, as a wrong configuration can easily break things.

Last updated: July 7, 2023
