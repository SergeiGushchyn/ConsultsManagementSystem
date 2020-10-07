from django.db import models
from django.contrib.auth.models import User
from jsonfield import JSONField

class AccountDetails(models.Model):
   user = models.ForeignKey(User, on_delete=models.CASCADE)
   num_of_consults = models.IntegerField()
   schedule = JSONField()