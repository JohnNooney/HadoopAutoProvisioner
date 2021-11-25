from flask_restful import Resource, reqparse
import docker
import subprocess


class Builder(Resource):
    def __init__(self):
        self.origin = 'http://localhost:3000'

    def get(self):
        return {"data": "test"}, \
               200, \
               {'Access-Control-Allow-Origin': self.origin}  # return data and 200 OK code

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('data', required=True)

        args = parser.parse_args()  # parse arguments to dictionary

        print(args['data'])

        print("starting container...")
        containerId = self.startContainer("test cmd")

        return {'received': args, 'containerId': containerId}, \
               200, \
               {'Access-Control-Allow-Origin': self.origin}

    # method for pre-flight requests. Checks to make sure browser can communicate
    def options(self):
        return {'Allow': 'POST, GET, OPTIONS'}, \
               200, \
               {'Access-Control-Allow-Origin': self.origin,
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'}

    def startContainer(self, cmd):
        # client = docker.from_env()
        # container = client.containers.run("johnnoon74/getting-started", detach=True)
        # print(container.id)
        # docker - compose - f ../hadoop-cluster/docker-compose.yml up - d
        result = subprocess.check_output(['docker', 'compose', '-f', '../hadoop-cluster/docker-compose.yml', 'up', '-d'])
        print("subprocess response: " + result.decode())
        return result.decode()
