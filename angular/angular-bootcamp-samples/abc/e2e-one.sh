#!/bin/bash

# While developing on a single example, it is helpful to run the E2E
# tests for that example repeatedly in a loop. This is only workable
# though, if you can arrange things so that the browser window which
# pops up, is on a secondary screen or otherwise out of the way of
# your workspace.

if [ -z "$1" ]
  then
    echo "No argument supplied"
fi

while true; do
  ./node_modules/.bin/protractor --specs=$1-*/**/**.e2e-spec.ts
  sleep 5
done
