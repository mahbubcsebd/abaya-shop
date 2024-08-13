#!/bin/bash

# Define variables
REMOTE_USER="root"
REMOTE_HOST="194.238.16.105"
REMOTE_PORT="22"
REMOTE_DIR="/var/www/abayaa.shop"

# Build the Next.js project
echo "Building the Next.js project..."
npm run build
npm cache clean --force

# Archive the built project
echo "Archiving the built project..."
tar -czf nextjs-app.tar.gz .next public package.json next.config.mjs # Adjust files as per your project structure

# Copy the archive to the remote server
echo "Copying files to remote server..."
#scp -i "$SSH_KEY" nextjs-app.tar.gz "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
rsync -avz -e "ssh" nextjs-app.tar.gz ${REMOTE_USER}@${REMOTE_HOST}:$REMOTE_DIR;

# SSH into the remote server, extract the files, install dependencies, and start the app
echo "Connecting to remote server..."
ssh ${REMOTE_USER}@${REMOTE_HOST} << EOF

  cd "$REMOTE_DIR"

  # Extract the files
  echo "Extracting files..."
  tar -xzf nextjs-app.tar.gz

  # Cleanup
  echo "Cleaning up..."
  rm nextjs-app.tar.gz

  # Check if next is installed and install if not
  if ! command -v next &> /dev/null; then
    echo "Next.js not found. Installing Next.js..."
    npm i next
  else
    echo "Next.js is already installed."
  fi

  # Restart the service
  sudo systemctl restart abayaa.service

  echo "Deployment completed successfully."
EOF

if [ $? -ne 0 ]; then
    echo "Remote execution failed. Aborting deployment."
    exit 1
fi

echo "Deployment script finished."