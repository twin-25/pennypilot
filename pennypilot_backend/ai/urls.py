from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('tips/', views.getAiTips, name = 'ai-tips' ),

]