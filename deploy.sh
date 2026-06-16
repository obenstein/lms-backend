#!/bin/bash

set -e

APP_DIR="/home/ec2-user/lms-backend"

echo "Starting deployment..."

cd $APP_DIR

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm i -f

echo "Restarting PM2..."

if pm2 describe lms-backend > /dev/null; then
    pm2 reload ecosystem.config.cjs --only lms-backend
else
    pm2 start ecosystem.config.cjs
fi

echo "Saving PM2 process list..."
pm2 save

echo "Deployment completed successfully."
