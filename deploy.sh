#!/bin/bash
sudo rm /opt/project/*
sudo rm /var/www/project/*
sudo cp server.js /opt/project
sudo cp installserver.sh /opt/project
sudo chmod +x /opt/project/installserver.sh
sudo cp clientfiles/* /var/www/project
pm2 start /opt/project/server.js
