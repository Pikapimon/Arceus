from django.shortcuts import render

# Create your views here.


def leafletExample(request):
    return render(request, 'HoOh/leaflet_example.html')
