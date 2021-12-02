@echo off
echo STARTING CONTAINERS
docker run -dp 3000:3000 johnnoon74/hadoopcreator
docker run -dp 5000:5000 -v //var/run/docker.sock:/var/run/docker.sock -v //usr/bin/docker:/usr/bin/docker johnnoon74/hadoopapi