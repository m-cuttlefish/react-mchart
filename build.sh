#!/bin/bash

lessfiles=$(find Chart/**/*.less)


for file in $lessfiles; do
    echo $file
    lessc $file >> css/style.css
done
