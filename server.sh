#!/bin/sh
# Server Shell script for Docker

# Build latest artifact
npm run Build

# Start server
node server.js