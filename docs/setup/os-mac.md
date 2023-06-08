---
id: setup-os-mac
title: Mac OS Setup (Ventura)
tags:
  - Setup
  - Operating System
  - Mac OS
---

My setup settings on Mac OS (Ventura). From a fresh Mac OS installation. 

This setup is done at Macbook Pro 14" M2.

## System Related Settings
-  Enable dark mode at `System Settings > Appearance`
-  Setup Japanese <-> English input switching
    - Enable Caps Lock key to [switch between Japanese input and English](https://support.apple.com/en-euro/guide/mac-help/mchl84525d76/mac). `System Settings > Language input methods > All Input Sources > Use the Caps Lock key to switch to and from ABC`
    - Type カタカナ with shift key while on hiragana input by enabling it at `System Settings > Language input methods > Japanese - Romaji > Shift key action > Type Katakana`
    - Disable all input mode (except Hiragana which is the default) at `System Settings > Language input methods > Japanese - Romaji`
    - To input weird inputs such as half-width Katakana or full-width Romaji, type with hiragana input and scroll up during the conversion.
- Setup keyboard
    - Change modifier keys at `System Settings > Keyboard > Keyboard Shortcuts > Modifier Keys`
        - Caps Lock -> Caps Lock
        - Control (^) key -> ⌘ Command
        - Option (⌥) key -> ⌥ Option
        - Command (⌘) key -> ^ Control
        - Globe key -> ⌘ Command
- Add Home folder to Finder `Finder > Settings > Sidebar`

## Applications Setup
We install everything with Homebrew for easier app management and cleanup.
### Install  Xcode CLI and Homebrew
1. Install Xcode CLI 
    ```bash
    xcode-select --install
    ```
2. Install [Homebrew](https://brew.sh/) and check the output for installation path.
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
3. Add homebrew to bash login profile
    ```bash
    (echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> ~/.profile
    eval "$(/opt/homebrew/bin/brew shellenv)"
    which brew # Check path of homebrew, if empty its not registered.
    ```

## Development Environment Setup
### Setup [Z shell (zsh)](https://zsh.sourceforge.io/)
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