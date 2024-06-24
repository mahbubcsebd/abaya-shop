#!/bin/bash

# Define variables
REMOTE_USER="root"
REMOTE_HOST="156.67.218.148"
REMOTE_PORT="9443"
REMOTE_DIR="/var/www/daarib.com"

# Build the Next.js project
echo "Building the Next.js project..."
npm run build

# Archive the built project
echo "Archiving the built project..."
tar -czf nextjs-app.tar.gz .next public package.json next.config.mjs  # Adjust files as per your project structure

# Copy the archive to the remote server
echo "Copying files to remote server..."
#scp -i "$SSH_KEY" nextjs-app.tar.gz "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR"
rsync -avz -e "ssh -p $REMOTE_PORT" nextjs-app.tar.gz ${REMOTE_USER}@${REMOTE_HOST}:$REMOTE_DIR;

# SSH into the remote server, extract the files, install dependencies, and start the app
echo "Connecting to remote server..."
ssh -p $REMOTE_PORT ${REMOTE_USER}@${REMOTE_HOST} << EOF

  cd "$REMOTE_DIR"

  # Cleanup
  echo "Cleaning up..."
  rm nextjs-app.tar.gz

  sudo systemctl restart daarib.service

  echo "Deployment completed successfully."
EOF

if [ $? -ne 0 ]; then
    echo "Remote execution failed. Aborting deployment."
    exit 1
fi

echo "Deployment script finished."