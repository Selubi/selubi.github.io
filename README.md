# Overview

This repository is the base repository for [notes.selubi.tech](https://notes.selubi.tech/).
For more information, visit the website itself.

# Operations

## Installing the dependency

Install nodejs 18. When on a fresh ubuntu:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs
```

Clone repo and install dependency

```bash
make install
```

## Serving at localhost for development

```bash
make serve-en # English version serve
```

## Building the static site

The build folder is `./build`

```bash
make build
```

## Creating a file for all locale

```bash
make touch target="<PATH_TO_FILE>"
```

## Deleting a file or folder from all locale

```bash
make rm target="<PATH_TO_FILE_OR_FOLDER>"
```

# Resources

[Docusaurus' doncusaurus.config.js](https://github.com/facebook/docusaurus/blob/main/website/docusaurus.config.js)
