#!/usr/bin/env bash

argument=$1
rootDir="./built/"

echo "Build new project"
tsc

if [ ! -z $argument ] && [[ $argument > "0" || $argument < "3" ]]; then
  echo "Running test for day$argument"
  node $rootDir/src/day$argument/test.js
else
  echo "Running all tests:"
  node $rootDir/src/day1/test.js
  node $rootDir/src/day2/test.js
  node $rootDir/src/day3/test.js
fi
