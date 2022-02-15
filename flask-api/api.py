from flask import Flask  # flask=1.1.2
from flask_restful import Api

from endpoints.builder import Builder
from endpoints.scraper import Scraper
from endpoints.commander import Commander
from endpoints.health import Health

app = Flask(__name__)
api = Api(app)

# add endpoints
api.add_resource(Health, '/') # '/' is the default endpoint 
api.add_resource(Builder, '/build')  # '/build' is our entry point
api.add_resource(Scraper, '/scrape')  # '/scraper' is used for getting cluster information
api.add_resource(Commander, '/command')  # '/scraper' is used for getting cluster information

if __name__ == '__main__':
    app.run()  # run our Flask app