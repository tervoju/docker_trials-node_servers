#!/bin/sh

NAME=server2
echo "start ${NAME}" 
export DOCKERHOST=${APPLICATION_URL-$(docker run --rm --net=host eclipse/che-ip)}

myip="$(dig +short myip.opendns.com @resolver1.opendns.com)"
echo "My WAN/Public IP address: ${myip}"
export IP=${myip}

echo "your local docker host ip address is: ${DOCKERHOST}"

if [ !"$(docker ps -qq -f name=${NAME})" ]; then
    echo "container ${NAME} is running, delete it first"
    docker rm ${NAME} -f
fi

docker build -t ${NAME} .
docker-compose up &