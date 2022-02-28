from flask_restful import Resource, reqparse
import docker
import yaml
import ast
import subprocess

# This endpoint takes care of building the Hadoop cluster from a docker-compose file
class Builder(Resource):
    def __init__(self):
        self.origin = 'http://localhost:3000'
        self.status = 200
        self.payload = "default"
        self.yaml = None
        self.yamlFile = './hadoop-cluster/docker-compose.yml'

    def get(self):
        self.status = 200
        self.payload = {"payload": "test"}
        return self.payload, \
               self.status, \
               {'Access-Control-Allow-Origin': self.origin}  # return data and 200 OK code

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('data', required=True)
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
            elif args['stop'] == "cluster":
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
        self.loadYaml()
        self.writeYaml(dict)

        # docker - compose - f ../hadoop-cluster/docker-compose.yml up - d
        #result = subprocess.check_output(['docker', 'compose', '-f', 'hadoop-cluster/docker-compose.yml', 'up', '-d'])
        #print("subprocess response: " + result.decode())
        #return result.decode()
        return "test"

    def stopCluster(self):
        result = subprocess.check_output(['docker', 'compose', '-f', 'hadoop-cluster/docker-compose.yml', 'down'])
        print("subprocess response: " + result.decode())
        return result.decode()

    # write Hadoop cluster data to .env file
    def writeEnv(self, dict):
        with open("./hadoop-cluster/user_hadoop.env", "w") as f:
            f.write("CLUSTER_NAME="+dict["name_node_cluster_name"])

    def loadYaml(self):
        with open(self.yamlFile, 'r') as f:
            self.yaml = yaml.load(f, Loader=yaml.FullLoader)

    # reset yaml to starting data
    def resetYaml(self):
        # write yaml to file
        with open(self.yamlFile, 'w') as f:
            yaml.dump(self.yaml, f)

     # used to modify yaml in order to add resources to cluster as necessary
    def writeYaml(self, dict):
        self.resetYaml()
        yamlData = self.yaml
        preUpdateServices = yamlData['services']

        # based on how many worker nodes requested add data
        dataNodeYaml = {}
        for i in range(int(dict['data_node_workers'])):
            # DataNode modifier
            dataNodeYaml = {**dataNodeYaml, 'datanode'+str(i+1): {'image': 'uhopper/hadoop-datanode', 'hostname': 'datanode'+str(i+1)+'.hadoop', 'networks': ['hadoop'], 'depends_on': ['namenode'], 'volumes': ['datanode-vol:/hadoop/dfs/data'], 'env_file': ['./hadoop.env']}}

        # combine data node yaml with the services already in the docker-compose
        newYamlData = {'services': {**dataNodeYaml, **preUpdateServices}}

        # merge data in full docker-compose yaml
        yamlData.update(newYamlData)

        # write yaml to file
        with open(self.yamlFile, 'w') as f:
            yaml.dump(yamlData, f)