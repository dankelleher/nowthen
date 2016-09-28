#!/usr/bin/env bash

# Check Server Running
#
# This script blocks (for 500s) until a meteor server started by start_server.sh is running.
#
# This is needed because there is (at present) no straightforward way to run
# an unbundled meteor app as a daemon, without using something like meteor-up.

waitCount=0
waitTime=0
# check if the output file has the string that indicates the server has started
until grep 'App running at' meteor.output || [ $waitCount -gt 150 ]
do
    # wait for a bit
    sleep 5s
    waitCount=`expr $waitCount + 1`
    waitTime=$((waitCount*5))
    echo 'Waited' $waitTime's'
done
# exit with success if we broke the loop before running
[ $waitCount -le 150 ] || (cat meteor.output && exit 1)