from flask_restful import Resource, reqparse
import ast
import subprocess

# This endpoint takes care of scraping data from the Hadoop Cluster
class Scraper(Resource):
    def __init__(self):
        self.origin = 'http://localhost:3000' # only allow request from this host
        self.status = 200
        self.payload = "default"
        self.rootUrl = 'http://localhost:'

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('data', required=True)

        args = parser.parse_args()  # parse arguments to dictionary

        print("scraper POST incoming data: ", args['data'])
        body = args['data']

        data = self.getClusterUrls(ast.literal_eval(body))

        self.status = 200

        # TODO: payload should be set with data from getClusterDetails()
        self.payload = {"payload": data}

        return self.payload, \
               self.status, \
               {'Access-Control-Allow-Origin': self.origin}  # return data and 200 OK code

    # method for pre-flight requests. Checks to make sure browser can communicate
    def options(self):
        return {'Allow': 'POST, OPTIONS'}, \
               self.status, \
               {'Access-Control-Allow-Origin': self.origin,
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'}

    def getContainerPort(self, container):
        print('getting ', container, ' port...')
        result = subprocess.check_output(['docker', 'port', container])
        print(container, " request subprocess response: " + result.decode())

        # put result into a format that can be iterated
        portData = result.decode().replace("\n", ":").split(':')

        # if port data has more than one open port
        if len(portData) > 3:
            print(portData)
            return portData[1::2]
        elif len(portData) == 3:
            # only one port exists
            return portData[1]
        else:
            return "no port found"



    # if ran in container / stopping will also need to be in container
    def getClusterUrls(self, dict):

        nameNode = ''
        yarnNode = ''
        dataNodes = []
        sparkNode = []

        # get the name node's open port
        nameNode = self.rootUrl + self.getContainerPort('hadoop-cluster-namenode-1')
        print("namenode port: ", nameNode, "\n")

        # get the yarn node's open port (resource manager)
        if dict['yarn_resource_manager']:
            yarnNode = self.rootUrl+self.getContainerPort('hadoop-cluster-resourcemanager-1')
            print("yarn port: ", yarnNode, "\n")

            # get the node manager's open ports (same as the data node)
            for i in range(int(dict['yarn_node_managers'])):
                dataNodePort = self.getContainerPort('hadoop-cluster-nodemanager'+str(i + 1)+'-1')
                dataNodes.append(self.rootUrl+dataNodePort)

            print("yarn port: ", dataNodes, "\n")


        # get the spark container's open port
        if dict['extras_spark']:
            sparkNodePorts = self.getContainerPort('hadoop-cluster-spark-1')

            for port in sparkNodePorts:
                if port:
                    sparkNode.append(self.rootUrl+port)
            print("spark ports: ", sparkNode, "\n")

        return {"namenode": nameNode,
                "yarn": yarnNode,
                "datanodes": dataNodes,
                "spark": sparkNode}
