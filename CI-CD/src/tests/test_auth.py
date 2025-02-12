from fastapi.testclient import TestClient
from src.tests import app
from src.tests.datasets import dataset

from sqlalchemy import select
from src.models import Users
from src.utils.webtokens import logged_as

client = TestClient(app)


def test_register(dataset):
    url = f"/auth/register"

    data = {"password": "0000"}
    response = client.post(url, json=data)
    assert response.status_code == 422

    data = {"username": "", "password": "0000"}
    response = client.post(url, json=data)
    assert response.status_code == 422

    data = {"username": "superusername", "password": "0000"}
    response = client.post(url, json=data)
    result = dataset.session.scalars(
        select(Users).where(Users.username == data["username"])
    ).first()
    assert response.status_code == 201
    assert result is not None


def test_authenticate(dataset):
    url = "/auth"

    # without body
    response = client.post(url)
    assert response.status_code == 422

    # wrong password
    data = {"username": dataset.user_1.username,
            "password": "randominvalidpassword"}
    response = client.post(url, json=data)
    assert response.status_code == 403
    assert client.cookies.get("access_token") is None

    data = {
        "username": dataset.user_1.username,
        "password": dataset.user_1.password_nonhashed,
    }
    response = client.post(url, json=data)
    assert response.status_code == 200
    assert client.cookies.get("access_token") is not None


def test_logout(dataset):
    url = "/auth"

    # not logged
    client.cookies = None
    response = client.delete(url)
    assert response.status_code == 403

    with logged_as(client, dataset.user_1):
        response = client.delete(url)
        assert response.status_code == 204
