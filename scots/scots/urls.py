from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('consults.urls')),
    path('', include('accounts.urls')),
    path('', include('director.urls')),
]
