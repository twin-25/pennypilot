from django.shortcuts import render
from .models import Notification
from .serializers import NotificationsSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated

# Create your views here.

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getNotifications(request):
  
  notifications = Notification.objects.filter(user = request.user) .order_by('-created_at')


  serializer = NotificationsSerializer(notifications, many = True)

  return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def markAsRead(request, id):
  try:
    notification = Notification.objects.get(user = request.user, pk = id)

  except Notification.DoesNotExist:
    return Response({'detail':'No Notification'}, status = status.HTTP_404_NOT_FOUND)

  notification.is_read = True

  notification.save()
  return Response({'detail':'notification marked as read'}, status= status.HTTP_200_OK)




@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteNotification(request, id):
  try:
    notification = Notification.objects.get(user = request.user, pk = id)

  except Notification.DoesNotExist:
    return Response({'detail':'No Notification'}, status = status.HTTP_404_NOT_FOUND)

  notification.delete()

  return Response({'detail':'notification deleted'}, status= status.HTTP_204_NO_CONTENT)





