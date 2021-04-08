#!/bin/bash
sudo rm -r /opt/project/*
sudo rm -r /var/www/project/*
sudo cp server.js /opt/project
sudo cp installserver.sh /opt/project
sudo chmod +x /opt/project/installserver.sh
sudo cp clientfiles/* /var/www/project
