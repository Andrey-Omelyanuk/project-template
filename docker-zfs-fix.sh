#!/bin/bash
for container_id in $(docker container ls -qa --filter status=removing); do 
        zpool_object=$(docker container inspect --format='{{.GraphDriver.Data.Dataset}}' ${container_id})
        zfs destroy -R "${zpool_object}"
        zfs destroy -R "${zpool_object}-init"
        zfs create "${zpool_object}"
        zfs create "${zpool_object}-init"
        docker container rm $container_id
done
# or 
# docker stop $(docker ps -a -q)
# docker rm $(docker ps -a -q)
# docker rmi $(docker images -q)
# sudo service docker stop
# sudo rm -R /var/lib/docker
# sudo service docker start 