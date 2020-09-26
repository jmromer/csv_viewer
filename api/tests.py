def test_root_url(client):
    resp = client.get("/")
    assert resp.status_code == 200


def test_post_csv_success(client):
    resp = client.get("/csvs")
    assert resp.status_code == 200
