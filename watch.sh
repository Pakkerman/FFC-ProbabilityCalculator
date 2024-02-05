#!/bin/bash

while true; do
    clear
    echo -e '\n\n ------- watch mode ------- \n\n'
    python3 main.py
    fswatch -1 prob_calculator.py main.py test_module.py
done
