from flask_restful import Resource, reqparse
import subprocess
import ast

# This endpoint takes care of sending commands to the Hadoop Cluster
class Commander(Resource):
    def __init__(self):
        self.origin = 'http://localhost:3000' # only allow request from this host
        self.status = 200
        self.payload = "default"

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('data', required=True)

        args = parser.parse_args()  # parse arguments to dictionary

        print("POST incoming data: ", args['data'])
        dict = ast.literal_eval(args['data'])
        self.runJob(dict['job'])

        self.status = 200
        self.payload = {"payload": "test POST"}
        return self.payload, \
               self.status, \
               {'Access-Control-Allow-Origin': self.origin}  # return data and 200 OK code

    # method for pre-flight requests. Checks to make sure browser can communicate
    def options(self):
        return {'Allow': 'POST, OPTIONS'}, \
               self.status, \
               {'Access-Control-Allow-Origin': self.origin,
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'}

    def runJob(self, jobData):
        result = ''
        if jobData["type"] == "spark":
            print("starting spark job...")
            subprocess.run(['docker', 'exec', 'hadoop-cluster_spark_1', 'spark-submit',
                                              '--class', 'org.apache.spark.examples.SparkPi', '--master', 'yarn',
                                              '--deploy-mode', 'cluster', 'examples/jars/spark-examples_2.11-2.0.2.jar',
                                              '1000'])
            # result = result.decode()
            print("subprocess finished...")
