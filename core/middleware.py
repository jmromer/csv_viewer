def cors(get_response):
    def middleware(request):
        resp = get_response(request)
        resp["Access-Control-Allow-Origin"] = "*"
        resp["Access-Control-Allow-Headers"] = "X-CSRFToken"
        resp["Access-Control-Allow-Methods"] = "DELETE"
        return resp

    return middleware
