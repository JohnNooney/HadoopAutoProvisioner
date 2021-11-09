from flask import Flask  # flask=1.1.2
from flask_restful import Api, reqparse

from endpoints.builder import Builder

app = Flask(__name__)
api = Api(app)

# add endpoints
api.add_resource(Builder, '/build')  # '/build' is our entry point

if __name__ == '__main__':
    app.run()  # run our Flask app