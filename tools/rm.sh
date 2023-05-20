#!/bin/bash
# Deletes a file/folder in both locales
# usage: ./tools/rm.sh <PATH_TO_DELETE>

source ./tools/config.sh

if [ $# -ne 1 ]; then
    echo "Error: Invalid number of arguments. Pass a path to delete."
    echo "usage: ./tools/rm.sh <PATH_TO_DELETE>"
    echo "usage: make rm target=<PATH_TO_DELETE>"
    exit 1
fi

TO_DELETE=$1

for folder in "${FOLDERS[@]}"; do
   # Delete the file/folder in each locale
   rm -rf "$folder/$TO_DELETE"
done
