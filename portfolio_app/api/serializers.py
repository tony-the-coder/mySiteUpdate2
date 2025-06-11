# portfolio_app/api/serializers.py
from rest_framework import serializers
from portfolio_app.models import Certificate

class CertificateSerializer(serializers.ModelSerializer):
    # This field will return the absolute URL for the image
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Certificate
        fields = ['id', 'title', 'description', 'issuing_body', 'issue_date', 'credential_id', 'credential_url', 'image_url', 'order']
        # read_only_fields are automatically set for fields not in 'fields' for ModelSerializer
        # You can explicitly list them if you prefer for clarity, but it's often not strictly necessary here.

    def get_image_url(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            # self.context.get('request') is crucial to build absolute URLs in DRF
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None