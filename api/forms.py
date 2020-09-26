from django import forms

from .models import CsvFile


class UploadCsvFileForm(forms.Form):
    file = forms.FileField()
