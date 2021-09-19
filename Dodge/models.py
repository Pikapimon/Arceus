from django.db import models
import datetime
from django.utils import timezone

# Create your models here.


class Dodger(models.Model):
    id_number = models.CharField(primary_key=True, max_length=255, null=False)
    name = models.CharField(max_length=255, null=False)
    phone_number = models.CharField(max_length=255, null=False)
    stu_id = models.CharField(max_length=255, default='20201249350')
    college_name = models.CharField(max_length=255, default='电子与信息工程学院')
    class_name = models.CharField(max_length=255, default='电子通信工程1班')
    latest_using_date = models.DateTimeField(default=timezone.now())
    added_time = models.DateTimeField(default=timezone.now())
    invited_code = models.CharField(
        max_length=255, null=False, default='6g1OZbvm')
    mail_addr = models.CharField(max_length=255, null=False, default='')
    valid_times = models.IntegerField(default=5)

    def __str__(self):
        return self.name


class InvitationCode(models.Model):
    recent_code = models.CharField(
        primary_key=True, max_length=255, null=False)

    def __str__(self):
        return self.recent_code
