#!/bin/bash

# Define variables
REMOTE_USER="root"
REMOTE_HOST="156.67.218.148"
REMOTE_PORT="9443"  # Default SSH port
REMOTE_DIR="/var/www/daarib.com"

# Copy the built Nuxt.js files to the remote server
rsync -rav -e "ssh -p $REMOTE_PORT" dist/ ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}

# Restart the Nginx server (if needed)
# Replace this command with whatever is appropriate for your server setup
ssh -p $REMOTE_PORT ${REMOTE_USER}@${REMOTE_HOST} "sudo systemctl restart nginx"
