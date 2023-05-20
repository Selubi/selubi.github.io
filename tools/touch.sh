#!/bin/bash
# Makes a file in both locales

EN_FOLDER="./docs"
JA_FOLDER="./i18n/ja/docusaurus-plugin-content-docs/current"
TO_CREATE=$1

# Create the folder structure in english locale
mkdir -p "$EN_FOLDER/$(dirname "$TO_CREATE")"

# Create the folder structure in japanese locale
mkdir -p "$JA_FOLDER/$(dirname "$TO_CREATE")"

# Create the file in english locale
touch "$EN_FOLDER/$TO_CREATE"

# Create the file in japanese locale
touch "$JA_FOLDER/$TO_CREATE"
