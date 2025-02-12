from fastapi.testclient import TestClient
from src.tests import app
from src.tests.datasets import dataset

from sqlalchemy import select
from src.models import Users
from src.utils.webtokens import logged_as

client = TestClient(app)


def test_get_user(dataset):
    url = f"/users/{dataset.user_1.id}"

    # not logged
    response = client.delete(url)
    assert response.status_code == 403

    with logged_as(client, dataset.user_1):
        response = client.get(url)
        result = dataset.session.scalars(
            select(Users).where(Users.id == dataset.user_1.id)
        ).first()
        assert response.status_code == 200
        for key, value in response.json().items():
            assert value == result.__getattribute__(key)


def test_delete_user(dataset):
    url = f"/users/{dataset.user_1.id}"

    # not logged
    response = client.delete(url)
    assert response.status_code == 403

    with logged_as(client, dataset.user_1):
        response = client.delete(url)
        result = dataset.session.scalars(
            select(Users).where(Users.id == dataset.user_1.id)
        ).first()
        assert response.status_code == 204
        assert result is None


def test_get_all_users(dataset):
    url = "/users"

    # not logged
    response = client.get(url)
    assert response.status_code == 403

    with logged_as(client, dataset.user_1):
        response = client.get(url)
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        assert len(response.json()) >= 3
