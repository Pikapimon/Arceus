from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'HoOh'
urlpatterns = [
    url('', views.leafletExample)
]
