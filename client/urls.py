from api.forms import UploadCsvFileForm
from django.apps import AppConfig
from django.shortcuts import render
from django.urls import path
from django.views.decorators.http import require_GET


class ClientConfig(AppConfig):
    name = 'client'


@require_GET
def root(request):
    context = {'form': UploadCsvFileForm()}
    return render(request, 'index.html', context)


urlpatterns = [
    path('', root),
]
