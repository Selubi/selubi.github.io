---
id: setup-os-mac
title: Mac OS Setup (Ventura)
sidebar_label: Mac OS
tags:
  - Setup
  - Operating System
  - Mac OS
---

My setup settings on Mac OS (Ventura). From a fresh Mac OS installation.

This setup is done at Macbook Pro 14" M2.

## System Related Settings

- Enable dark mode at `System Settings > Appearance`
- Setup Japanese <-> English input switching
  - Enable Caps Lock key to [switch between Japanese input and English](https://support.apple.com/en-euro/guide/mac-help/mchl84525d76/mac). `System Settings > Language input methods > All Input Sources > Use the Caps Lock key to switch to and from ABC`
  - Type カタカナ with shift key while on hiragana input by enabling it at `System Settings > Language input methods > Japanese - Romaji > Shift key action > Type Katakana`
  - Disable all input mode (except Hiragana which is the default) at `System Settings > Language input methods > Japanese - Romaji`
  - To input weird inputs such as half-width Katakana or full-width Romaji, type with hiragana input and scroll up during the conversion.
- Setup keyboard
  - Change modifier keys at `System Settings > Keyboard > Keyboard Shortcuts > Modifier Keys`
    - Caps Lock (󰘲)-> 󰘲 Caps Lock
    - Control (^) key -> ⌘ Command
    - Option (⌥) key -> ⌥ Option
    - Command (⌘) key -> ^ Control
    - Globe key () -> ⌘ Command
- Add Home folder to Finder `Finder > Settings > Sidebar`
- Show menu bar even when on full screen `Settings > Desktop & Dock > Automatically hide and show the menu bar > Never`

## Applications Setup

We install everything with Homebrew for easier app management and cleanup.

### Install Xcode Command Line Tools and Homebrew

1. Install [Xcode Command Line Tools](https://www.manpagez.com/man/1/xcode-select/)
   ```bash
   xcode-select --install
   ```
2. Install [Homebrew](https://brew.sh/) and check the output for installation path.
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Add homebrew to bash login profile

   ```bash
   echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> ~/.profile
   eval "$(/opt/homebrew/bin/brew shellenv)"
   which brew # Check path of homebrew, if empty its not registered.
   ```

### List of Apps to Install

- [1Password](https://1password.com/) - Password manager
  ```bash
  brew install --cask 1password
  ```
- [Mos](https://mos.caldis.me/) - Set mouse scroll independent to trackpad.
  ```bash
  brew install --cask mos
  ```
  Open via `Finder > Applications > Right Click > Open` when opening for the first time.
- [Arc](https://arc.net/) - Browser

  ```bash
  brew install --cask arc
  ```

  Custom shortcut

  - Go back: ⌘E
  - Go forward: ⌘⇧E
  - Add Split View: ⌘D
  - New Little Arc Window: ⌘N
  - New Window: ⌘⇧N
  - New Incognito Window: ⌘^⇧N
  - Open Extension: Removed
  - Pin/Unpin Tab: Removed

- [Rectangle](https://rectangleapp.com/) - Window snapping
  ```bash
  brew install --cask rectangle
  ```
- [Fira Code Nerd Font](https://www.nerdfonts.com/font-downloads) - Font

  ```bash
  brew tap homebrew/cask-fonts
  brew install --cask font-fira-code-nerd-font
  ```

- [Visual Studio Code](https://code.visualstudio.com/) - Code editor

  ```bash
  brew install --cask visual-studio-code
  ```

  Do [Visual Studio Code Setup](app-vscode.md) after.

- [iTerm2](https://iterm2.com/) - Replacement Terminal
  ```bash
  brew install --cask iterm2
  ```
  Get the [profile.json](./config/iterm.md) and import it via `iTerm2 > Settings > Profiles > Other Actions > Import JSON Profiles...`

## Development Environment Setup

### Setup [Z Shell (zsh)](https://zsh.sourceforge.io/) as the default shell

We will also use the brew's zsh instead of the default one

1. Install zsh
   ```bash
   brew install zsh
   which zsh # Check path of zsh. /bin/zsh is not the brew one
   ```
2. Add it to list of shells
   ```bash
   echo "$(which zsh)" | sudo tee -a /etc/shells
   ```
3. Change the default shell
   ```bash
   chsh -s "$(which zsh)"
   ```
4. Readd brew to login profile which is now `.zprofile`
   ```bash
   echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> ~/.zprofile
   ```
5. Re-login to Mac OS, launch terminal and check zsh and brew settings
   ```bash
   echo $SHELL # Current shell path
   which brew # Homebrew path
   ```

Do [Shell Setup (Z Shell)](./env-zsh.md) after.
