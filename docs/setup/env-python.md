---
id: setup-env-python
title: Python Environment Setup with pyenv and venv
sidebar_label: Python
tags:
  - Setup
  - Environment
  - Python
---

Setup for python development environment. We will use [pyenv](https://github.com/pyenv/pyenv/) (version control) + [venv](https://docs.python.org/3/library/venv.html) instead of conda.

## Setup pyenv

This section is for the installation of pyenv itself. It should be only done once per machine.

1. Install pyenv and dependencies with package manager according to the [official suggested build environment](https://github.com/pyenv/pyenv/wiki#how-to-build-cpython-with-framework-support-on-os-x).

   ```bash title="Mac OS"
   brew install openssl readline sqlite3 xz zlib tcl-tk
   ```

1. Initialize pyenv so the shell uses it by default

   ```bash
   pyenv init # Follow the instructions outputted
   ```

   I put mine in the login shell (`.zprofile`) instead of the interactive shell settings.

1. See which versions of python is available for install

   ```bash
   pyenv install -l
   ```

1. Install one of the versions

   ```bash
   pyenv install 3.11 # Installs the latest revision of python 3.11
   ```

   If you encounter dependency errors such as missing lzma lib, it maybe because the dependency in step1 is not configured properly.

1. Set global python version

   ```bash
   pyenv global 3.11
   ```

1. Relogin / restart shell.

1. Verify installation

   ```bash
   which python # Should output ~/.pyenv/shims/python instead of /bin/python
   python --version # Should output previously set global python version
   ```

## Setup project environment

This section is for project environment setup. It should be done for every project.

To start, make sure you're in the project directory.

1. Install the correct python version if needed (optonal).

   ```bash
   pyenv install <PYTHON_VERSION>
   ```

1. Set the local python version (optional)

   ```bash
   pyenv local <PYTHON_VERSION> # Will overwrite .python-version
   ```

   This binds the python version to project directory by creating `.python-version` in the directory.

1. Create virtual environment

   ```bash
   python -m venv .venv # Creates virtual environment at the .venv/ folder
   echo ".venv" >> .gitignore # Add it to .gitignore
   ```

1. Activate the venv and verify

   ```bash
   source .venv/bin/activate
   which python # Should output <PROJECT>/.venv/bin/python
   ```

1. Upgrade pip

   ```bash
   python -m pip install --upgrade pip
   ```

1. If its an existing project that has `requirements.txt`, install the requirements. (optional)
   ```bash
   python -m pip install -r requirements.txt
   ```

Extras:

- Freeze the project requirements into `requirements.txt`
  ```bash
  python -m pip freeze > requirements.txt
  ```
