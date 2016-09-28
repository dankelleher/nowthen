#!/usr/bin/env bash
#
# Runs the acceptance tests, by default in chrome.
#
# Usage:
# run_acceptance_tests.sh [-b browser] [-w]
#
# -w = run in watch mode
# -b = run with browser
#

browser='--browser=chrome'
watchflag=''

while getopts 'bw' flag; do
  case "${flag}" in
    b) browser="--browser=${OPTARG}" ;;
    w) watchflag="--watch" ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done

chimp --ddp=http://localhost:3000 --path=tests $browser $watchflag