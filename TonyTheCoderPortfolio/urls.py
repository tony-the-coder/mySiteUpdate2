# TonyTheCoderPortfolio/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Import DRF components
from rest_framework import routers
from portfolio_app.api.views import CertificateViewSet # Import your CertificateViewSet from the API folder

# Create a router for your API
router = routers.DefaultRouter()
router.register(r'certificates', CertificateViewSet) # Register the CertificateViewSet at '/api/certificates/'

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("portfolio_app.urls")), # This includes your regular Django views
    path("ckeditor5/", include('django_ckeditor_5.urls')),
    path('accounts/', include('django.contrib.auth.urls')), # For login/logout etc.

    # API URLs for Django REST Framework
    path('api/', include(router.urls)), # This line is where the /api/certificates/ endpoint is created
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')), # Optional: for browsable API login/logout
]

# Serve static and media files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)