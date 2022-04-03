# HadoopAutoProvisioner
A user-friendly way of provisioning a cluster for the big data framework Hadoop. This appliction contains a React Frontend and a Flask API. Both of these work together to spin up Docker-based Hadoop Cluster. The React frontend will walk you through what Hadoop is and help you quickly start up a Hadoop cluster. 

## How To
Start up the container for each service

### Quick Start
1. ``` docker run -dp 5000:5000 -v //var/run/docker.sock:/var/run/docker.sock -v //usr/bin/docker:/usr/bin/docker --name hadoopapi johnnoon74/hadoopapi:latest  ```
2. ``` docker run -dp 3000:3000 --name hadoopcreator johnnoon74/hadoopcreator:latest ```

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


Note: Make sure both the React UI and the API started up with no issues
``` docker ps ``` to see all running containers. or see them via Docker Desktop

### Operation
1. navigate to browser - http://localhost:3000/
2. Read through welcome page to get started quickly

