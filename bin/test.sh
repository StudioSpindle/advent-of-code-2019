#!/usr/bin/env bash

argument=$1

if [[ $argument > "0" || $argument < "3" ]]
then
  echo "Running test for day$argument"
  node ./day$argument/test.js
else
  echo "Running all tests:"
  node ./day1/test.js
  node ./day2/test.js
  node ./day3/test.js
fi
