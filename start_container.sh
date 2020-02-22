#!/bin/bash
# just set few variable
HOST_BASE_DIR=$PWD
HOST_PROJECT_DIR="project"
DOCKER_PROJECT_DIR="/home/shared"
DS="/"
HOST_FULL_PATH="$HOST_BASE_DIR$DS$HOST_PROJECT_DIR"
EXPOSED_PORTS="5000:5000"
NETWORK_NAME="mynetwork"
# myframework:1 = nodejs/npm/tsc/apache2
# myframework:2 = nodejs/npm/tsc/apache2/php/phpmyadmin/mysql
IMAGE_NAME="netcore"
CONTAINER_ALIAS="myframework"
ENTRY_POINT="/bin/bash"


# give permission for project
sudo chmod -R 777 $HOST_FULL_PATH

# Show the command :)
sudo docker run -v $HOST_FULL_PATH:$DOCKER_PROJECT_DIR -it --rm -p $EXPOSED_PORTS --network $NETWORK_NAME --privileged --name $CONTAINER_ALIAS $IMAGE_NAME $ENTRY_POINT

