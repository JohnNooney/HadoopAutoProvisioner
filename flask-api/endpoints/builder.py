from flask_restful import Resource, reqparse
import docker
import ast
import subprocess

# This endpoint takes care of building the Hadoop cluster from a docker-compose file
class Builder(Resource):
    def __init__(self):
        self.origin = 'http://localhost:3000'
        self.status = 200
        self.payload = "default"

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

        except Exception as e:
            print("Unable to start container, error: ", e)
            self.status = 400
            self.payload = "Error. Unable to start container."

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
        # docker - compose - f ../hadoop-cluster/docker-compose.yml up - d
        #result = subprocess.check_output(['docker', 'compose', '-f', 'hadoop-cluster/docker-compose.yml', 'up', '-d'])
        #print("subprocess response: " + result.decode())
        #return result.decode()
        return "test"

    def stopCluster(self):
        result = subprocess.check_output(['docker', 'compose', '-f', 'hadoop-cluster/docker-compose.yml', 'down'])
        print("subprocess response: " + result.decode())
        return result.decode()
