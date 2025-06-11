# portfolio_app/api/views.py
from rest_framework import viewsets
from rest_framework import serializers # Correct import
from portfolio_app.models import Certificate
from .serializers import CertificateSerializer # Correct import

class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing certificates.
    Uses ReadOnlyModelViewSet as certificates are typically read-only via API.
    """
    # THIS IS THE LINE THAT NEEDS TO BE CHANGED:
    # It must NOT try to filter by 'is_active' if the Certificate model doesn't have that field.
    queryset = Certificate.objects.all().order_by('order', '-issue_date') # REMOVE .filter(is_active=True)
    serializer_class = CertificateSerializer
    # Add authentication/permission classes if needed