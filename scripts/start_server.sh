#!/usr/bin/env bash
#
# Start Server
#
# Starts a meteor application, writes output to meteor.output and writes the process PID to meteor.pid
# so that it can be closed easily later via stop_server.sh
#
meteor --settings settings.json > meteor.output & echo $! > meteor.pid