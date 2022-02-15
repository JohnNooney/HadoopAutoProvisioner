from flask_restful import Resource, reqparse


class Health(Resource):
    def __init__(self):
        self.origin = '*'
        self.status = 200
        self.payload = ""

    def get(self):
        self.status = 200
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