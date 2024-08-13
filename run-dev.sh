#!/bin/sh

docker ps -a | grep mongodb-der | docker start mongodb-der || docker run -d --name mongodb-der -p 27017:27017 -v `pwd`/tmp/db:/data/db -w /data/db mongo:3.6
# npm run migrate up
npm run dev
