#!/bin/bash

echo "stop container, remove image, volume and network to server-send-events"
docker-compose down

docker rmi server-sent-events_app:latest
docker rmi mysq:8.0.30-debian

echo "up docker-compose"
docker-compose up
