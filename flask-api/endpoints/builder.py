from flask_restful import Resource, reqparse
import docker
import os
import json
import yaml
import ast
import subprocess

# This endpoint takes care of building the Hadoop cluster from a docker-compose file
class Builder(Resource):
    def __init__(self):
        self.origin = 'http://localhost:3000'
        self.status = 200
        self.payload = "default"
        self.baseYamlFile = './hadoop-cluster/base-docker-compose.yml'
        self.newYamlFile = './hadoop-cluster/docker-compose.yml'
        self.yaml = {}
        self.recievedData = {}

    def get(self):
        self.status = 200
        self.readStoredDict()

        if self.recievedData:
            self.payload = {"payload": self.recievedData}
        else:
            self.payload = {"payload": "none"}

        return self.payload, \
               self.status, \
               {'Access-Control-Allow-Origin': self.origin}  # return data and 200 OK code

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('data', required=False)
        parser.add_argument('type', required=True)

        args = parser.parse_args()  # parse arguments to dictionary

        try:
            print("POST incoming type: ", args)
            if args['type'] == "container":
                print("starting container...")
                containerId = self.startContainer("test cmd")
                self.status = 200
                self.payload = {"containerId": containerId}
            elif args['type'] == "cluster":
                print("starting cluster...")
                containerId = self.startCluster(args['data'])
                self.status = 200
                self.payload = {"clusterConf": "Successfully started"}
            elif args['type'] == "stop":
                print("stopping cluster...")
                self.stopCluster()
                self.status = 200
                self.payload = {"clusterConf": "Successfully Stopped"}

        except Exception as e:
            print("Unable to accept request, error: ", e)
            self.status = 400
            self.payload = "Error: Unable to accept request. Check server. "

        finally:
            return {'received': args, 'payload': self.payload}, \
                   self.status, \
                   {'Access-Control-Allow-Origin': self.origin}



    # method for pre-flight requests. Checks to make sure browser can communicate
    def options(self):
        return {'Allow': 'POST, GET, OPTIONS'}, \
               self.status, \
               {'Access-Control-Allow-Origin': self.origin,
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'}

    def startContainer(self, cmd):
        # client = docker.from_env()
        # container = client.containers.run("johnnoon74/getting-started", detach=True)
        # print(container.id)
        result = subprocess.check_output(['docker', 'run', '-d', 'johnnoon74/getting-started'])
        print("subprocess response: " + result.decode())
        return result.decode()
        return container.id


    # if ran in container / stopping will also need to be in container
    def startCluster(self, vars):
        dict = ast.literal_eval(vars)
        print("dict: ", dict)
        print("Cluster Name: ", dict["name_node_cluster_name"])

        # map each dict value to environment variables to be used in the docker compose
        self.writeEnv(dict)

        # load base yaml file and append new data based on request from UI
        self.loadYaml()
        self.writeYaml(dict)

        # TODO: surround this with a try/catch later on
        # docker - compose - f ./hadoop-cluster/docker-compose.yml up - d
        result = subprocess.check_output(['docker', 'compose', '-f', 'hadoop-cluster/docker-compose.yml', 'up', '-d'])
        print("subprocess response: " + result.decode())

        self.storeDict(dict)

        return result.decode()
        # return "test"

    def stopCluster(self):

        result = subprocess.check_output(['docker', 'compose', '-f', 'hadoop-cluster/docker-compose.yml', 'down', '-v'])
        print("subprocess response: " + result.decode())

        self.deleteDict()

        return result.decode()
        # return "test"

    # store dictionary sent by UI. Used to restore state
    def storeDict(self, dict):
        print("writing cached json for UI state...")
        with open("cached-state.json", "w") as f:
            json.dump(dict, f)

    def readStoredDict(self):
        print("reading cached json for UI state...")
        try:
            with open("cached-state.json", 'r') as f:
                self.recievedData = json.load(f)
                print("read json: ", self.recievedData)
        except FileNotFoundError:
            print("No saved cached state")
            self.recievedData = {}

    # delete stored dictionary
    def deleteDict(self):
        os.remove("cached-state.json")

    # write Hadoop cluster data to .env file
    def writeEnv(self, dict):
        with open("./hadoop-cluster/user_hadoop.env", "w") as f:
            f.write("CLUSTER_NAME="+dict["name_node_cluster_name"])

    # load yaml from docker-compose only first time
    def loadYaml(self):
        if not self.yaml:
            with open(self.baseYamlFile, 'r') as f:
                self.yaml = yaml.load(f, Loader=yaml.FullLoader)

    # reset yaml dict to starting data
    def resetYaml(self):
        # write yaml to file
        with open(self.baseYamlFile, 'w') as f:
            yaml.dump(self.yaml, f)

    # used to modify yaml in order to add resources to cluster as necessary
    def writeYaml(self, dict):
        self.resetYaml()
        yamlData = self.yaml
        print(yamlData)
        preUpdateServices = yamlData['services']

        dataNodeYaml = {}
        volumesYaml = {}
        resourceManagerNodeYaml = {}
        nodeManagerYaml = {}
        sparkYaml = {}

        # based on how many worker nodes requested
        for i in range(int(dict['data_node_workers'])):
            # DataNode modifier
            dataNodeYaml = {**dataNodeYaml, 'datanode' + str(i + 1): {'image': 'uhopper/hadoop-datanode',
                                                                      'hostname': 'datanode' + str(i + 1) + '.hadoop',
                                                                      'networks': ['hadoop'],
                                                                      'depends_on': ['namenode'],
                                                                      'volumes': ['datanode-vol'+str(i + 1)+':/hadoop/dfs/data'],
                                                                      'env_file': ['./hadoop.env']}}
            volumesYaml = {**volumesYaml, 'datanode-vol'+str(i + 1): {}}

        # based on if the resource manager was enabled
        if 'yarn_resource_manager' in dict:
            resourceManagerNodeYaml = {'resourcemanager': {'depends_on': ['namenode'], 'env_file': ['./hadoop.env'],
                                                           'hostname': 'resourcemanager.hadoop',
                                                           'image': 'uhopper/hadoop-resourcemanager',
                                                           'networks': ['hadoop'], 'ports': ['8088:8088']}}

            # based on how many node managers requested
            if 'yarn_node_managers' in dict:
                for i in range(int(dict['yarn_node_managers'])):
                    # Node manager modifier
                    nodeManagerYaml = {**nodeManagerYaml,
                                       'nodemanager' + str(i + 1): {'depends_on': ['namenode', 'resourcemanager'],
                                                                    'env_file': ['./hadoop.env'],
                                                                    'hostname': 'nodemanager' + str(i + 1) + '.hadoop',
                                                                    'image': 'uhopper/hadoop-nodemanager',
                                                                    'networks': ['hadoop'], 'ports': [str(8042+i)+':8042']}} # increment port forward

            # based on if spark was enabled
            if 'extras_spark' in dict:
                sparkYaml = {
                    'spark': {'command': 'tail -f /var/log/dmesg', 'env_file': ['./hadoop.env'], 'hostname': 'spark.hadoop',
                              'image': 'uhopper/hadoop-spark', 'networks': ['hadoop'],
                              'ports': ['4040:4040', '9000:9000', '8080:8080']}}

        # combine data node yaml with the services already in the docker-compose
        newYamlData = {'services': {**dataNodeYaml, **resourceManagerNodeYaml, **nodeManagerYaml, **sparkYaml, **preUpdateServices},
                       'volumes': {**volumesYaml, 'namenode-vol':{}}}

        # merge data in full docker-compose yaml
        yamlData.update(newYamlData)

        # write yaml to file
        with open(self.newYamlFile, 'w') as f:
            yaml.dump(yamlData, f)