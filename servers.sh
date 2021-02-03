#!/bin/sh

export DOCKERHOST=${APPLICATION_URL-$(docker run --rm --net=host eclipse/che-ip)}

myip="$(dig +short myip.opendns.com @resolver1.opendns.com)"
echo "My WAN/Public IP address: ${myip}"
export IP=${myip}

echo "your local docker host ip address is: ${DOCKERHOST}"

# server 1
NAME_1=server1

echo "start ${NAME_1}" 

if [ !"$(docker ps -qq -f name=${NAME_1})" ]; then
    echo "container ${NAME_1} is running, delete it first"
    docker rm ${NAME_1} -f
fi

docker build -t ${NAME_1} -f ../server1/Dockerfile ../server1

#server2

NAME_TOO=server2
echo "start ${NAME_TOO}" 

if [ !"$(docker ps -qq -f name=${NAME_TOO})" ]; then
    echo "container ${NAME_TOO} is running, delete it first"
    docker rm ${NAME_TOO} -f
fi

docker build -t ${NAME_TOO} -f ../server2/Dockerfile ../server2


docker-compose -f ../server2/docker-compose.yml up &
docker-compose -f ../server1/docker-compose.yml up &
docker exec -it server1 sh &

#docker-compose run server1 sh &