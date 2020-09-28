from django.core.cache import cache
from django.db.utils import IntegrityError
from rest_framework import status, viewsets
from rest_framework.response import Response

from .errors import AttachmentError
from .forms import UploadCsvFileForm
from .models import CsvFile
from .serializers import (CsvFilePayloadSerializer, CsvFileSerializer,
                          UserSerializer)
from .services import parse_csv


class CsvFileViewSet(viewsets.ViewSet):
    def list(self, request, format=None):
        csv_files = CsvFile.objects.all()
        serializer = CsvFileSerializer(
            csv_files,
            many=True,
            context={'request': request},
        )
        return Response({'csv_files': serializer.data})

    def create(self, request, format=None):
        try:
            form = UploadCsvFileForm(request.POST, request.FILES)
            # TODO: Allow multiple file upload
            attachment = request.FILES['file']

            if form.is_valid():
                CsvFile(file=attachment).save()
                # TODO: Enqueue processing and caching in the background
                return Response(None, status=status.HTTP_201_CREATED)

            messages = [{
                field: message
            } for field, errors in form.errors.items() for message in errors]
            raise AttachmentError(*messages)

        except IntegrityError as err:
            # TODO: Delete attachment record if not saved
            data = {'errors': ['This file has already been saved.']}
            return Response(data, status=status.HTTP_409_CONFLICT)
        except Exception as err:
            data = {'errors': err.args}
            return Response(data, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def retrieve(self, request, pk=None, format=None):
        try:
            data = cache.get(f'csv:{pk}')
            if not data:
                csv_file = CsvFile.objects.get(pk=pk)
                csv_data = parse_csv(csv_file.file)
                serializer = CsvFilePayloadSerializer(
                    csv_file,
                    csv_data,
                    context={'request': request},
                )
                data = serializer.data
                cache.set(f'csv:{pk}', data)
            return Response(data)

        except CsvFile.DoesNotExist as err:
            data = {'errors': err.args}
            return Response(data, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None, format=None):
        try:
            csv_file = CsvFile.objects.get(pk=pk)
            csv_file.delete()
            return Response(None)
        except CsvFile.DoesNotExist as err:
            data = {'errors': err.args}
            return Response(data, status=status.HTTP_404_NOT_FOUND)
