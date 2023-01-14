# Doordisc Client Source

This repository contains the sources for the Doordisc client (frontend).

## Running
Below are instructions to help you run `dd-client`.

### Development
To run a development server, execute the following commands.
- `npm run start-dev`

### Production (local)
To run this for production locally, run the following commands.
- `npm run start`

### Production (dockerized, preferred)
Simply create an image from the Dockerfile included here.

To do this, run `docker build -t dd-client .` in the repository root.

Then you can create a container based on this image.