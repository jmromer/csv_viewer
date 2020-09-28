def cors(get_response):
    def middleware(request):
        response = get_response(request)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "X-CSRFToken"
        response["Access-Control-Allow-Methods"] = "DELETE"
        return response

    return middleware
