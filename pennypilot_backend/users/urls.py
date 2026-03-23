from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
  path('register/', views.register, name='register-view'),
  path('login/', views.MyTokenObtainPairView.as_view(), name = 'login'),
  path('login/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
  path('profile/', views.getUserProfile, name='get-user-profile'),
  path('profile/update/', views.updateUserProfile, name = 'update-user-profile'),
]