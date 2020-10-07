import gspread
import json
from . import column_names as coln
from . import column_indexes as coli
from oauth2client.service_account import ServiceAccountCredentials
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status

# This class allows to modify records in table that were assigned to a specific consultant
class ConsultsViewSet(viewsets.ViewSet):
   permission_classes = [
      permissions.IsAuthenticated,
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

   # display all the records in the table that were assigned to the consultant
   def list(self, request):
      wks = self.get_worksheet()
      all_records = wks.get_all_records()
      consults = []
      for item in wks.findall(request.user.get_full_name()):
         # indexes of the Google Spreadsheet are 2 positions higher from regular array indexing
         ri = item.row - 2
         all_records[ri][coln.options] = all_records[ri][coln.options].partition(" - ")[0]
         all_records[ri].pop("")
         consults.append(
               {"row": item.row, "data": all_records[ri]})
      data = json.dumps(consults)
      return HttpResponse(data, content_type='application/json')

   # update specified record in the table
   def create(self, request):
      wks = self.get_worksheet()
      if request.data[coln.email_sent]:
         wks.update_cell(request.data["row"], coli.email_sent, request.data[coln.email_sent])
      if request.data[coln.first_visit]:
         wks.update_cell(request.data["row"], coli.first_visit, request.data[coln.first_visit])
      if request.data[coln.report_reviewed]:
         wks.update_cell(request.data["row"], coli.report_reviewed, request.data[coln.report_reviewed])
      if request.data[coln.report_sent]:
         wks.update_cell(request.data["row"], coli.report_sent, request.data[coln.report_sent])
      if request.data[coln.comments]:
         wks.update_cell(request.data["row"], coli.comments, request.data[coln.comments])
      return Response(status=status.HTTP_202_ACCEPTED)
