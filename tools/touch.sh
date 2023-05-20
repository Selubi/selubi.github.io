#!/bin/bash
# Makes a file in both locales
# Creates the nesting folder if it doesn't exist
# usage: ./tools/touch.sh <PATH_TO_CREATE>

source ./tools/config.sh

if [ $# -ne 1 ]; then
    echo "Error: Invalid number of arguments. Pass a path to create."
    echo "usage: ./tools/touch.sh <PATH_TO_CREATE>"
    echo "usage: make touch target=<PATH_TO_CREATE>"
    exit 1
fi

TO_CREATE=$1

for folder in "${FOLDERS[@]}"; do
    # Create the folder structure in each locale
   mkdir -p "$folder/$(dirname "$TO_CREATE")"
   # Create the file in each locale
   touch "$folder/$TO_CREATE"
done

