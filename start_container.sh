#!/bin/bash
# just set few variable
HOST_BASE_DIR=$PWD
HOST_PROJECT_DIR="Reactivities"
DOCKER_PROJECT_DIR="/home"
DS="/"
HOST_FULL_PATH="$HOST_BASE_DIR$DS$HOST_PROJECT_DIR"
CLIENT_PORTS="3000:3000"
API_PORTS="4999:4999"
NETWORK_NAME="mynetwork"
# myframework:1 = nodejs/npm/tsc/apache2
# myframework:2 = nodejs/npm/tsc/apache2/php/phpmyadmin/mysql
IMAGE_NAME="netcore:2"
CONTAINER_ALIAS="myframework"
ENTRY_POINT="/bin/bash"


# give permission for project
sudo chmod -R 777 $HOST_FULL_PATH

# Show the command :)
sudo docker run -v $HOST_FULL_PATH:$DOCKER_PROJECT_DIR -it --rm -p $CLIENT_PORTS -p $API_PORTS --network $NETWORK_NAME --privileged --name $CONTAINER_ALIAS $IMAGE_NAME $ENTRY_POINT

