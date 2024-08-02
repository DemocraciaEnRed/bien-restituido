#!/bin/sh

docker ps -a | grep mongodb-der | docker stop mongodb-der 
docker ps -a | grep mongo3.6 | docker start mongo3.6 || docker run -d --name mongo3.6 -p 27017:27017 -v `pwd`/tmp/db:/data/db -w /data/db mongo:3.6

npm run dev