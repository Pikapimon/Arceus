from django.urls import path
from django.urls import re_path as url
from . import views

app_name = 'tech_exh'
urlpatterns = [
    url('getdata', views.get_data),
    url('index', views.map_home),

]
