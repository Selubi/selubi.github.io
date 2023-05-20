#!/bin/bash
# Makes a file in both locales

EN_FOLDER="./docs"
JA_FOLDER="./i18n/ja/docusaurus-plugin-content-docs/current"
TO_DELETE=$1

# Create the file in english locale
rm -rf "$EN_FOLDER/$TO_DELETE"

# Create the file in japanese locale
rm -rf "$JA_FOLDER/$TO_DELETE"
