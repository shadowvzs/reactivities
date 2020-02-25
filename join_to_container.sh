#!/bin/bash
# just set few variable
CONTAINER_ALIAS="myframework"
ENTRY_POINT="/bin/bash"

# Show the command :)
sudo docker exec -it $CONTAINER_ALIAS $ENTRY_POINT

