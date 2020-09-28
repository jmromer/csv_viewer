from api import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(
    'csv-files',
    views.CsvFileViewSet,
    basename='csv-files',
)

urlpatterns = [
    path('', include('client.urls')),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
