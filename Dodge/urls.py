from django.urls import path
from django.urls import re_path as url
from . import views

app_name = 'Dodge'
urlpatterns = [
    url('register_commit', views.register_commit, name="register_commit"),
    url('register', views.register),
    url(r'^leave$', views.leave_main),
    url(r'^enter$', views.enter_main),

]
