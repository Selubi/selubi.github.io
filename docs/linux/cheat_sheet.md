---
id: linux-cheat-sheet
title: Linux Cheat Sheet
sidebar_label: Cheat Sheet
sidebar_position: 1
tags:
  - Linux
---

Notable commands, variables and files for administering linux.

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
