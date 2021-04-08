#!/bin/bash
rm /opt/project/*
rm /var/www/project/*
cp server.js /opt/project
cp installserver.sh /opt/project
chmod +x /opt/project/installserver.sh
cp clientfiles/* /var/www/project
bash /opt/project/installserver.sh
