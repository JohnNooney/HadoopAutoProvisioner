# HadoopAutoProvisioner
A user-friendly way of provisioning a cluster for the big data framework Hadoop

## Current Implementation
Right now there are two services being used to spin a cluster progmatically. The Flask API and a React Frontend. The user will interact with the React frontend and through the use of POST or GET requests, commands are sent to the Flask API to perform. Right now the Flask API accepts a GET for testing the connection and a POST which will provide the API with the correct configuration information needed to spin up a cluster. Currently a cluster is not being spun up. Instead a sample Docker conatiner is starting up in place of a cluster. Future implemenations will add this.

## How To
Start up the container for each service

### Build Containers
**Flask API**
1. navigate to ``` <project root>/flask-api ```
2. run docker command ``` docker build -t flask-api . ```


**React Frontend (hadoop-creator)**
1. navigate to ``` <project root>/hadoop-creator ```
2. run docker command ``` docker build -t hadoop-creator . ```

### Start Containers
**Flask API**
``` docker run -dp 5000:5000 -v //var/run/docker.sock:/var/run/docker.sock -v //usr/bin/docker:/usr/bin/docker flask-api ```

**React Frontend**
``` docker run -dp 3000:3000 hadoop-creator ```

### Operation
1. navigate to browser http://localhost:3000/
2. click GET button to test connection with API
3. click POST button to start container

Note: May need to wait for docker to pull container. This may take a bit. Once done you will see the container has started in docker
``` docker ps ``` to see all running containers. or see them via Docker Desktop
