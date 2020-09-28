import pytest


def test_root_url(client):
    resp = client.get('/')
    assert resp.status_code == 200


@pytest.mark.skip
def test_post_csv_success(client):
    resp = client.post('/api/csv-files')
    assert resp.status_code == 200


@pytest.mark.skip
def test_delete_csv_success(client):
    csv_id = 1
    resp = client.delete(f'/api/csv-files/{csv_id}')
    assert resp.status_code == 200


@pytest.mark.skip
def test_get_csv_success(client):
    csv_id = 1
    resp = client.get(f'/api/csv-files/{csv_id}')
    assert resp.status_code == 200


@pytest.mark.skip
def test_get_csv_list_success(client):
    resp = client.get('/api/csv-files/')
    assert resp.status_code == 200
