from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'Dodge'
urlpatterns = [
    url('', views.leave_main)
]
