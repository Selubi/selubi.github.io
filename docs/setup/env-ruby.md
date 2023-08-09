---
id: setup-env-ruby
title: Ruby environment setup with rbenv and bundler
sidebar_label: Ruby
sidebar_position: 1
tags:
  - Setup
  - Environment
  - Ruby
---

Setup for ruby development environment. We will use [rbenv](https://github.com/rbenv/rbenv) (version manager) + [bundler](https://bundler.io/) (project environment manager)

# Setup rbenv

This section is for the installation of rbenv itself. It should be only done once per machine.

rbenv is a ruby version manager that allows installation, switching, and scoping of multiple ruby versions.

1. Install rbenv with OS package manager
   ```bash title="Mac OS"
   brew install rbenv ruby-build
   ```
1. Check your installation with `rbenv init`
   ```bash
   rbenv init
   ```
1. Add rbenv to shell init script.

   ```bash title="zsh"
   echo '# Ruby' >> ~/.zprofile
   echo 'eval "$(rbenv init - zsh)"' >> ~/.zprofile
   ```

   `eval "$(rbenv init - zsh)` should be whatever is outputted by step 2.

   If you put this in `~/.zprofile`, relog.

   If you put this in `~/.zshrc`, run `source ~/.zshrc`.

1. Install the ruby version you want
   ```bash
   rbenv install -l # Lists all latest stable ruby version available
   rbenv install <RUBY_VERSION> # <RUBY_VERSION> is one of the outputs from previous command.
   ```
1. Set global ruby version

   ```bash
   rbenv global <RUBY_VERSION>
   ```

1. Check ruby installation
   ```bash
   which ruby # Should output ~/.rbenv/shims/ruby instead of /bin/ruby
   ruby --version # Should output previously set global ruby version
   ```

## Setup project environment

This section is for configuring project environment. It should be done per project.

1. Install dependencies defined in `Gemfile`. On the working directory with `Gemfile` run

   ```bash
   bundle install
   ```

1. Run the ruby file within the current project context
   ```bash
   bundle exec ruby <ruby_file>
   ```
