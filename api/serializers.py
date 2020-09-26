from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import serializers

from .models import CsvFile


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')


class CsvFileSerializer(serializers.HyperlinkedModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d")
    url = serializers.HyperlinkedIdentityField(view_name='csv-files-detail',
                                               source='id')

    class Meta:
        model = CsvFile
        fields = ('id', 'url', 'file', 'name', 'created_at')


class CsvFilePayloadSerializer:
    def __init__(self, model, data, **kwargs):
        self.__file_info = CsvFileSerializer(model, context=kwargs['context'])
        self.__table = data.table
        self.__aggregations = data.aggregations

    @property
    def data(self):
        return {
            'csv_file': {
                'info': self.__file_info.data,
                'data': self.__table,
                'aggregations': self.__aggregations,
            }
        }
