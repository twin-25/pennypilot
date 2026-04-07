from django.shortcuts import render
import stripe 
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from users.models import User
from django.http import HttpResponse


stripe.api_key = settings.STRIPE_SECRET_KEY
price_id = settings.STRIPE_PRICE_ID


# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCheckoutSession(request):
  try:
    session = stripe.checkout.Session.create(
      payment_method_types=['card'],

      line_items=[{
        'price':price_id,
        'quantity':1
      }],
      mode = 'subscription',
      customer_email=request.user.email,
      client_reference_id=str(request.user.id),

      success_url='http://localhost:5173/payment-success',
      cancel_url='http://localhost:5173/payment-cancel',
      metadata={
        'user_id' : request.user.id
      },
      subscription_data={
        'trial_period_days':7
      },

    )

    return Response({
      'url': session.url
    })

    
  except Exception as e:
    return Response({'error':str(e)}, status=500)
    


@api_view(['POST'])
@permission_classes([AllowAny])
def stripeWebhook(request):
  payload = request.body
  endpoint_secret = settings.STRIPE_WEBHOOK_SECRET
  sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
  event = None

  try:
    event = stripe.Webhook.construct_event(
       payload, sig_header, endpoint_secret
    )
  except ValueError as e:
    # Invalid payload
    return Response({'error':'Invalid payload'}, status=400)
  except stripe.error.SignatureVerificationError:
     return Response({'error':'Invalid signature'}, status=400)


  # Handle the event
  if event.type == 'checkout.session.completed':
    session = event['data']['object']
    try:
        user_id = session['metadata']['user_id']
    except (KeyError, TypeError):
        print('No user_id in metadata — test event, skipping')
        return HttpResponse(status=200)
    try:
      user = User.objects.get(id=user_id)
      user.is_pro = True
      user.save()
      print(f' user {user.email} upgraded to pro!')
    
    except User.DoesNotExist:
      return Response({'error':'USER not Found'}, status=404)
    

  return HttpResponse(status=200)
