#!/bin/bash

docker run \
  --rm \
  -it \
  --entrypoint=/bin/bash \
  "service-a:latest"
