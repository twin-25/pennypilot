from django.urls import path
from . import views


urlpatterns = [
  path('', views.getNotifications, name= 'get-notifications' ),
  path('<int:id>/mark-as-read/', views.markAsRead, name='mark_as read' ),
  path('<int:id>/delete/', views.deleteNotification, name= 'delete-notification' ),

]