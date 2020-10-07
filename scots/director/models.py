from django.db import models

class ScotInfo(models.Model):
   approved_email = models.CharField(max_length=100, unique=True)
   is_staff = models.BooleanField(default=False)