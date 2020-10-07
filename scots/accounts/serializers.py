from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from accounts.models import AccountDetails

class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model = User
      fields = ('id', 'username', 'first_name', 'last_name', 'is_staff')

class RegisterSerializer(serializers.ModelSerializer):
   class Meta:
      model = User
      fields = ('id', 'username', 'password', 'first_name', 'last_name')
      extra_kwargs = {'password': {'write_only': True}}

      def create(self, validated_data):
         user = User.objects.create_user(validated_data['username'],
         validated_data['password'], first_name=validated_data['first_name'],
         last_name=validated_data['last_name'], is_staff=validated_data['is_staff'])
         return user

class LoginSerializer(serializers.Serializer):
   username = serializers.CharField()
   password = serializers.CharField()

   def validate(self, data):
      user = authenticate(**data)
      if user and user.is_active:
         return user
      raise serializers.ValidationError("Incorrect Credentials")

class AccountDetailsSerializer(serializers.ModelSerializer):
   schedule = serializers.JSONField()
   class Meta:
      model = AccountDetails
      fields = ('user', 'num_of_consults', 'schedule')
   