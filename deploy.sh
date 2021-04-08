#!/bin/bash
rm /opt/project/*
rm /var/www/project/*
cp server.js /opt/project
cp installserver.sh /opt/project
cp clientfiles/* /var/www/project
