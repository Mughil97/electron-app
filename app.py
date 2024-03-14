import logging
import random
import threading
import time

from flask import Flask, request
from flask_socketio import SocketIO

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


def send_random_coordinates():
    while True:
        x = random.randint(0, 800)
        y = random.randint(0, 600)
        socketio.emit("coordinates", {"x": x, "y": y})
        logger.info(f"Sent coordinates: {x}, {y}")
        time.sleep(1)


@socketio.on("connect")
def handle_connect():
    logger.info(f"Client connected: {request.sid}")


@socketio.on("disconnect")
def handle_disconnect():
    logger.info(f"Client disconnected: {request.sid}")


@app.route("/")
def index():
    return "SocketIO Server Running"


if __name__ == "__main__":
    threading.Thread(target=send_random_coordinates).start()
    socketio.run(app, host="localhost", port=2207)
