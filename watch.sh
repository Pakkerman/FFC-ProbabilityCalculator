#!/bin/bash

while true; do
    echo -e '\n\n ------- watch mode ------- \n\n'
    python3 main.py
    fswatch -1 shape_calculator.py main.py test_module.py
done
