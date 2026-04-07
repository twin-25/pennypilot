from django.urls import path
from . import views

urlpatterns = [
    path('create-checkout/', views.createCheckoutSession, name='create-checkout'),
    path('webhook/', views.stripeWebhook, name='stripe-webhook'),
]