from .models import User
from django.conf import settings

from django.utils import timezone
from datetime import timedelta, date
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .serializers import ( MyTokenObtainPairSerializer, UserSerializer )
from rest_framework_simplejwt.views import TokenObtainPairView

from django.utils import timezone

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
  serializer = UserSerializer(data = request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView (TokenObtainPairView):
   serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
  user = request.user
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
  user = request.user
  data = request.data
  serializer = UserSerializer(user, data = data, many=False, partial = True)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



