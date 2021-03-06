# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.8-slim-buster

EXPOSE 5000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Flask app name
ENV FLASK_APP=api

# Create volume that gets access to host's Docker remote API

VOLUME /var/run/docker.sock
VOLUME /usr/bin/docker

WORKDIR /opt/app

# Install pip requirements
COPY . .
RUN python -m pip install -r requirements.txt

RUN apt update 
RUN echo "y" | apt install curl

# allow for docker compose commands
RUN curl -sL https://github.com/docker/compose-cli/releases/download/v2.0.0-beta.3/docker-compose-linux-amd64 -o ~/.docker/cli-plugins/docker-compose --create-dirs
RUN chmod 755 ~/.docker/cli-plugins/docker-compose

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
# RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /opt/app  
# && chmod u=x /var/run/dock.sock
# USER appuser

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]

# when running image use: docker run -dp 5000:5000 -v //var/run/docker.sock:/var/run/docker.sock -v //usr/bin/docker:/usr/bin/docker <image_name> 