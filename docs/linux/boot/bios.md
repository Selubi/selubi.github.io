---
id: linux-boot-bios
title: BIOS and UEFI
sidebar_label: BIOS and UEFI
sidebar_position: 1
tags:
  - Linux
---

Main source of this article: [LPIC-1 Exam 101 Learning Material: 101.2](https://learning.lpi.org/en/learning-materials/learning-materials/)

## UEFI and BIOS short overview

### What is it?

BIOS (Basic Input/Output System) and UEFI (Unified Extensible Firmware Interface) is a pre-installed firmware that is typically integrated into the motherboard. UEFI is the successor for BIOS and is mostly what we will encounter in modern computer. As such we will mostly focus on UEFI.

:::note
The term "BIOS" is often used to refer to this firmware that stands between hardware and OS, regardless of it being UEFI or the actual BIOS.
:::

We can usually access BIOS/UEFI by pressing the `delete` button on the keyboard during power-on process.

### Broadly, what is it for?

### Loading and passing the control OS kernel

One of the main responsibility of BIOS/UEFI is to load and launch the bootloader and passing control to it (which in turn loads the OS kernel and passes control to it).

#### Tweaking low level hardware settings

We can tweak low level hardware settings via BIOS/UEFI. For example, when building gaming PCs you would usually enable memory overcloking from the BIOS/UEFI.

## UEFI: Deeper Dive

### Components related to UEFI

UEFI can detect and run EFI Applications. One example of an EFI application is bootloaders such as GRUB. EFI Applications are stored in a partition called ESP (EFI System Partition).

The settings of UEFI is stored in a non-volatile memory called NVRAM. This settings presists even when power is turned off. NVRAM stores UEFI settings such as boot order, hardware configuration, etc. When you change a configuration, UEFI updates the content of NVRAM.

We can think of UEFI as a platform, NVRAM stores the settings for the platform, and EFI Applications as the appliations that can run on UEFI platform.

### Pre-bootloader boot steps of UEFI

On machines with UEFI, the pre-operating system boot steps are:

1. The POST (power-on self-test) is executed to identify hardware failures
2. UEFI activates basic components to load the system, such as video output, keyboard, and storage
3. UEFI firmware reads configurations stored at NVRAM and executes the pre-defined EFI application stored in ESP's filesystem. Usually this is a bootloader such as GRUB.

### Extra things to note

- The EFP is compatible with FAT12, FAT16, and FAT32 filesystem and ISO-9660 for optical media.
- Secure boot is a part of the UEFI standard, which only allows the execution of EFI applications authorized by hardware manufacturer.
- GUID Partition Table is also a part of the UEFI standard.

## BIOS: Difference to UEFI

To boot with BIOS, we need something called MBR (Master boot record). MBR is a data structure located on the first 512 byte of a disk. It contains the first stage of the bootloader.

Instead of detecting external partitions for the bootloader, BIOS looks for MBR in the first storage device (in the order defined in BIOS config utility). It then loads the first stage of bootloader which in turn calls the second stage. The second stage of the bootloader is responsible for presenting boot options and loading the OS kernel.

Last updated: 6th July 2023
