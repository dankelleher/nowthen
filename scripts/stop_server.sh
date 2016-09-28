#!/usr/bin/env bash
#
# Stop Server
#
# Stops a meteor server by finding the process group ID of the main meteor process
# and killing all processes with the same group ID (including mongo)
#
kill -TERM -`ps a -o pid,pgid | grep $(cat meteor.pid) | awk '{print $2}'`
rm meteor.pid