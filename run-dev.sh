#!/bin/sh

docker ps -a | grep mongodb-der | docker stop mongodb-der 
docker ps -a | grep mongo-br | docker start mongo-br || docker run -d --name mongo-br -p 27017:27017 -v `pwd`/tmp/db:/data/db -w /data/db mongo:3.6
npm run migrate up
npm run dev
