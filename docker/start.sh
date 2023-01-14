#!/bin/bash

# Builds the client for NGINX to serve
# This is done so the client configuration can be changed - it should not be baked into the kernel.
echo Building client
cd /usr/src/client
npm run build