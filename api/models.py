from os import path

from django.db import models
from django.db.models.signals import post_init
from django.dispatch import receiver

from . import utils


class CsvFile(models.Model):
    name = models.CharField(max_length=256)
    digest = models.CharField(max_length=128, unique=True)
    file = models.FileField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.file:
            self.digest = utils.md5_digest(self.file)
            self.name = path.basename(self.file.name)

    def __str__(self):
        return self.name
