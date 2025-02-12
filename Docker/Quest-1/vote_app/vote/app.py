"""
Simple application that render a Flask template, and then write the
result of the vote to a Redis database.
"""

from flask import Flask, render_template, request, make_response, g
from redis import Redis
from os import getenv
from socket import gethostname
import random
import json
import logging


option_a = getenv('OPTION_A', "Cats")
option_b = getenv('OPTION_B', "Dogs")
hostname = gethostname()

app = Flask(__name__)
app.logger.setLevel(logging.INFO)

def get_redis():
    """Configure, if needed, the Redis client.

    Returns:
        Redis: the redis client
    """
    if not hasattr(g, 'redis'):
        g.redis = Redis(host="redis", db=0, socket_timeout=5)
    return g.redis

@app.route("/", methods=['POST','GET'])
def render():
    """Main route for the server.

    METHODS:
    - GET: Render the template with option name
    - POST: Add the selected option to the Redis

    Returns:
        Response: the rendered template.
    """
    voter_id = request.cookies.get('voter_id') or hex(random.getrandbits(64))[2:-1]

    vote = None

    if request.method == 'POST':
        redis = get_redis()
        vote = request.form['vote']
        app.logger.info('Received vote for %s', vote)
        data = json.dumps({'voter_id': voter_id, 'vote': vote})
        redis.rpush('votes', data)

    resp = make_response(render_template(
        'index.html',
        option_a=option_a,
        option_b=option_b,
        hostname=hostname,
        vote=vote,
    ))
    resp.set_cookie('voter_id', voter_id)
    return resp


if __name__ == "__main__":
    """If the program is run directly using the python interpreter, run this code"""
    app.run(host='0.0.0.0', port=5050, debug=True)
