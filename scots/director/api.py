import json
import gspread
from .models import ScotInfo
from accounts.models import AccountDetails
from rest_framework import viewsets, permissions
from .serializers import ScotInfoSerializer
from oauth2client.service_account import ServiceAccountCredentials
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status

# This class allows director to approve emails for registration and grand permissions
class ScotInfoViewSet(viewsets.ModelViewSet):
   queryset = ScotInfo.objects.all()
   permission_classes = {
      permissions.IsAdminUser
   }
   serializer_class = ScotInfoSerializer

# This class allows director to view all consults and assign consultants to work with clients
class DirectorViewSet(viewsets.ViewSet):
   permission_classes = [
      permissions.IsAdminUser,
   ]

   # connect to Google Spreadsheet and obtain the content
   def get_worksheet(self):
      scope = ['https://spreadsheets.google.com/feeds',
               'https://www.googleapis.com/auth/drive']
      credentials = ServiceAccountCredentials.from_json_keyfile_name(
         './scots/credentials/client_secret.json', scope)
      gc = gspread.authorize(credentials)
      work_sheet = gc.open("Testing API").sheet1
      return work_sheet

   # display all the records in the table
   def list(self, request):
      wks = self.get_worksheet()
      all_records = wks.get_all_records()
      consults = []
      for i in range(len(all_records)):
         all_records[i].pop("")
         all_records[i]['SCOT Options'] = all_records[i]['SCOT Options'].partition(" - ")[0]
         consults.append(
               {"row": i + 2, "data": all_records[i]})
      data = json.dumps(consults)
      return HttpResponse(data, content_type='application/json')

   # assign consultant to a specific request
   def create(self, request):
      wks = self.get_worksheet()
      scot = AccountDetails.objects.filter(user = request.data["Assigned SCOT"]).first()
      if scot:
         wks.update_cell(request.data["row"], 11, scot.user.get_full_name())
         scot.num_of_consults += 1 
         scot.save()
         return Response(status=status.HTTP_202_ACCEPTED)
      else:
         return Response("Provided data doesn't match existing records")