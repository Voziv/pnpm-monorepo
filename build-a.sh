#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Should be the entire monorepo
CONTEXT_DIR="${SCRIPT_DIR}"

# Relative path to the service we want to build from the context dir.
SERVICE_DIR="services/service-a"

docker build \
  --tag "service-a:latest" \
  --build-arg "VERSION=latest" \
  --build-arg "SERVICE_DIR=services/service-a" \
  --file "${SCRIPT_DIR}/templates/node/Dockerfile" \
  "${CONTEXT_DIR}"
