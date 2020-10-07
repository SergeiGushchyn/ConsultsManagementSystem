from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, AccountDetailsSerializer
from director.models import ScotInfo
from accounts.models import AccountDetails
from django.contrib.auth.hashers import make_password
import json

# API to register consultant in the system
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
       serializer = self.get_serializer(data=request.data)
       serializer.is_valid(raise_exception=True)
       approved = ScotInfo.objects.filter(approved_email=serializer.validated_data['username']).first()
       # allows to register only if consultant's email was approved
       if approved:
          serializer.validated_data['is_staff'] = approved.is_staff
          serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
          user = serializer.save()
          return Response(
            {
               "user": UserSerializer(
                  user, context=self.get_serializer_context()
               ).data,
               "token": AuthToken.objects.create(user)[1],
            }
          )
       else:
          return Response("Email wasn't approved")

# API to login consultant
class LoginAPI(generics.GenericAPIView):
   serializer_class = LoginSerializer

   def post(self, request, *args, **kwargs):
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      user = serializer.validated_data
      return Response({
         "user": UserSerializer(
            user, context=self.get_serializer_context()).data,
         "token": AuthToken.objects.create(user)[1]
      })

# API to retrieve consultant user information
class UserAPI(generics.RetrieveAPIView):
   permission_classes = [
      permissions.IsAuthenticated,
   ]
   serializer_class = UserSerializer

   def get_object(self):
      return self.request.user

# API for consultant schedule
class AccountDetailsView(generics.GenericAPIView):
   queryset = AccountDetails.objects.all()
   permission_classes = [
      permissions.IsAuthenticated
   ]
   serializer_class = AccountDetailsSerializer

   def get(self, request, *args, **kwargs):
      queryset = self.get_queryset()
      serializer = AccountDetailsSerializer(queryset, many=True)
      return Response(serializer.data)

   def post(self, request, *args, **kwargs):
      request.data["user"] = self.request.user.pk
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      acoount = serializer.save()
      return Response(status=status.HTTP_202_ACCEPTED)