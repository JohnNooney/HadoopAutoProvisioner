from flask_restful import Resource

class Builder(Resource):
    def get(self):
        return {"data":"test"}, 200, {'Access-Control-Allow-Origin': 'http://localhost:3000'} # return data and 200 OK code

    def options(self):
        return {'Allow' : 'POST, GET, OPTIONS' }, 200, \
        { 'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json'}