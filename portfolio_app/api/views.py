# portfolio_app/api/views.py
from rest_framework import viewsets
from portfolio_app.models import Certificate
from .serializers import CertificateSerializer

class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing certificates.
    Uses ReadOnlyModelViewSet as certificates are typically read-only via API.
    """
    queryset = Certificate.objects.filter(is_active=True).order_by('order', '-issue_date')
    serializer_class = CertificateSerializer
    # Add authentication/permission classes if needed, e.g.,
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticatedOrReadOnly]

    # If you have an 'is_active' field or similar to control visibility:
    def get_queryset(self):
        # Ensure only active certificates are shown, if you add an is_active field to Certificate model
        # (Based on your models.py, Certificate does not have is_active, but if you add it, uncomment below)
        # return Certificate.objects.filter(is_active=True).order_by('order', '-issue_date')
        return Certificate.objects.all().order_by('order', '-issue_date') # Default: show all