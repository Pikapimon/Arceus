from django.db import models
# Create your models here.


class SLP(models.Model):
    def __str__(self):
        return "SLP_"+str(self.district)
    district = models.CharField(primary_key=True, max_length=50, null=False)
    all_data = models.CharField(max_length=500, null=False)


class Temp2(models.Model):
    def __str__(self):
        return "Temp2_"+str(self.district)
    district = models.CharField(primary_key=True, max_length=50, null=False)
    all_data = models.CharField(max_length=500, null=False)


class Tprep(models.Model):
    def __str__(self):
        return "Tprep"+str(self.district)
    district = models.CharField(primary_key=True, max_length=50, null=False)
    all_data = models.CharField(max_length=500, null=False)


class Srads(models.Model):
    def __str__(self):
        return "Srads_"+str(self.district)
    district = models.CharField(primary_key=True, max_length=50, null=False)
    all_data = models.CharField(max_length=500, null=False)


class RH(models.Model):
    def __str__(self):
        return "RH_"+str(self.district)
    district = models.CharField(primary_key=True, max_length=50, null=False)
    all_data = models.CharField(max_length=500, null=False)
