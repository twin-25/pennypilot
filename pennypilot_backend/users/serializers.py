from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.first_name
        token['email'] = user.email
        token['is_pro'] = user.is_pro

        return token
  

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email','first_name', 'last_name', 'date_of_birth', 'ai_usage_count', 'is_pro', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user 
    



        





