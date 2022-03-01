from flask_restful import Resource, reqparse
import subprocess

# This endpoint takes care of scraping data from the Hadoop Cluster
class Scraper(Resource):
    def __init__(self):
        self.origin = 'http://localhost:3000' # only allow request from this host
        self.status = 200
        self.payload = "default"
        self.namenode = "http://localhost:50070"
        self.yarn = "http://localhost:8088"
        self.datanodes = ["http://localhost:8042/", "http://localhost:8043/"] # TODO: set dynamically
        self.spark = "http://localhost:"
        self.sparknotebook = "http://localhost:"

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('data', required=True)

        args = parser.parse_args()  # parse arguments to dictionary

        print("GET incoming data: ", args['data'])

        self.status = 200

        # TODO: payload should be set with data from getClusterDetails()
        self.payload = {"payload": {
            "namenode":self.namenode,
            "yarn":self.yarn,
            "datanodes":self.datanodes,
            "spark":self.spark}}

        return self.payload, \
               self.status, \
               {'Access-Control-Allow-Origin': self.origin}  # return data and 200 OK code

    # method for pre-flight requests. Checks to make sure browser can communicate
    def options(self):
        return {'Allow': 'GET, OPTIONS'}, \
               self.status, \
               {'Access-Control-Allow-Origin': self.origin,
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'}

    # if ran in container / stopping will also need to be in container
    def getClusterDetails(self):
        # docker - compose - f ./hadoop-cluster/docker-compose.yml up - d
        # result = subprocess.check_output(['docker', 'compose', '-f', 'hadoop-cluster/base-docker-compose.yml', 'up', '-d'])
        # print("subprocess response: " + result.decode())
        # return result.decode()
        return "test"
