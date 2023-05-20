# Overview
This repository is the base repository for [blog.selubi.tech](https://blog.selubi.tech/).
For more information, visit the website itself.

# Operations
## Installing the dependency
Install nodejs 18 and enable yarn. When on a fresh ubuntu:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs
corepack enable
```
Clone repo and install dependency
```bash
make install
```
## Serving at localhost for development
```bash
make serve
```

## Building the static site
The build folder is `./build`
```bash
make build
```

# Resources
[Docusaurus' doncusaurus.config.js](https://github.com/facebook/docusaurus/blob/main/website/docusaurus.config.js)
