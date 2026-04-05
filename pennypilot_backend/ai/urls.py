from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('tips/', views.getAiTips, name = 'ai-tips' ),
    path('analysis/', views.getAiAnalysis, name='ai-analysis'),
    path('report/', views.getAiReport, name='ai-report'),

]