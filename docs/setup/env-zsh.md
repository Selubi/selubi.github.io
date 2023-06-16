---
id: setup-env-zsh
title: Shell Setup (Z Shell)
sidebar_label: Z Shell
sidebar_position: 1
tags:
  - Setup
  - Environment
  - Z Shell
---

My shell setup. I am using [Z Shell (Zsh)](https://zsh.sourceforge.io/), but this documentation may also include non-zsh-exclusive general shell setup.

## Setup

### Setup [Oh My Zsh](https://ohmyz.sh/)

Oh My Zsh is mainly used to install themes to make the shell look pretty.

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Install plugins for Oh My Zsh

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k # Powerlevel 10K
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting # Zsh Syntax Highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions # Zsh Auto Suggestion
```

### Configuration Files

Copy all the configurations file at [Z Shell Configuration Files](./config/zsh.md)
