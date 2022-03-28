from flask_restful import Resource, reqparse
import subprocess
import ast
import datetime
import time

# This endpoint takes care of sending commands to the Hadoop Cluster
class Commander(Resource):
    def __init__(self):
        self.origin = 'http://localhost:3000' # only allow request from this host
        self.status = 200
        self.payload = "default"
        self.jobCounter = 0

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

        # get the current datetime for labeling folders
        ts = time.time()
        date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d_%H-%M-%S')

        if jobData["type"] == "spark":
            if jobData["operation"] == "pi":
                print("starting spark pi job...")
                subprocess.run(['docker', 'exec', 'hadoop-cluster_spark_1', 'spark-submit',
                                                  '--class', 'org.apache.spark.examples.SparkPi', '--master', 'yarn',
                                                  '--deploy-mode', 'cluster', 'examples/jars/spark-examples_2.11-2.0.2.jar',
                                                  jobData["modpi"]])
                return "Pi completed..."
            elif jobData["operation"] == "groupby":
                print("starting spark GroupByTest job...")
                subprocess.run(['docker', 'exec', 'hadoop-cluster_spark_1', 'spark-submit',
                                '--class', 'org.apache.spark.examples.GroupByTest', '--master', 'yarn',
                                '--deploy-mode', 'cluster', 'examples/jars/spark-examples_2.11-2.0.2.jar'])
                # result = result.decode()
                return "GroupByTest completed..."
        elif jobData["type"] == "yarn":
            if jobData["operation"] == "pi":
                # pi operation
                print("starting yarn pi job...")
                subprocess.run(['docker', 'exec', 'hadoop-cluster_namenode_1', 'yarn',
                                'jar', '/opt/hadoop-2.7.2/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.2.jar',
                                'pi', jobData["modpi"], jobData["modpi2"]])
                return "Pi completed..."
            elif jobData["operation"] == "terasort":
                # terasort operation
                print("starting yarn tersort job...")

                subprocess.run(['docker', 'exec', 'hadoop-cluster_resourcemanager_1', 'yarn',
                                'jar', '/opt/hadoop-2.7.2/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.2.jar',
                                'teragen', jobData["modtera"], "teragentest_"+date])
                subprocess.run(['docker', 'exec', 'hadoop-cluster_resourcemanager_1', 'yarn',
                                'jar', '/opt/hadoop-2.7.2/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.2.jar',
                                'terasort', "teragentest_"+date, "terasorttest_"+date])
                subprocess.run(['docker', 'exec', 'hadoop-cluster_resourcemanager_1', 'yarn',
                                'jar', '/opt/hadoop-2.7.2/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.2.jar',
                                'teravalidate', "terasorttest_"+date, "teravalidatetest_"+date])

                return "Terasort completed..."

        elif jobData["type"] == "hadoop":
            if jobData["operation"] == "pi":
                print("starting hadoop pi job...")
                subprocess.run(['docker', 'exec', 'hadoop-cluster_namenode_1', 'hadoop',
                                'jar', '/opt/hadoop-2.7.2/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.2.jar',
                                'pi', jobData["modpi"], jobData["modpi2"]])
                return "Pi completed..."
            elif jobData["operation"] == "terasort":
                print("starting hadoop tersort job...")
                subprocess.run(['docker', 'exec', 'hadoop-cluster_namenode_1', 'hadoop',
                                'jar', '/opt/hadoop-2.7.2/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.2.jar',
                                'teragen', jobData["modtera"], "teragentest_"+date])
                subprocess.run(['docker', 'exec', 'hadoop-cluster_namenode_1', 'hadoop',
                                'jar', '/opt/hadoop-2.7.2/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.2.jar',
                                'terasort', "teragentest_"+date, "terasorttest_"+date])
                subprocess.run(['docker', 'exec', 'hadoop-cluster_namenode_1', 'hadoop',
                                'jar', '/opt/hadoop-2.7.2/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.2.jar',
                                'teravalidate', "terasorttest_"+date, "teravalidatetest_"+date])

                return "Terasort completed..."
            print("subprocess finished...")
