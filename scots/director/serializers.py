from rest_framework import serializers
from director.models import ScotInfo

class ScotInfoSerializer(serializers.ModelSerializer):
   class Meta:
      model = ScotInfo
      fields = '__all__'