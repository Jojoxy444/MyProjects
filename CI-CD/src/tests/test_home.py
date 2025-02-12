from fastapi.testclient import TestClient
from src.tests import app

client = TestClient(app)


def test_home():
    url = "/"
    response = client.get(url)
    assert response.status_code == 200
