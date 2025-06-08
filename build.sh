#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies for the React app
npm install --prefix reactland

# Build the React app for production
npm run build --prefix reactland

# Run Django's collectstatic to gather all static files
python manage.py collectstatic --no-input