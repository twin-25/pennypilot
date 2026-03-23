from django.db import models

from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.

class User(AbstractUser):
  email = models.EmailField(max_length=254, unique=True)
  date_of_birth = models.DateField(null=True, blank=True)
  is_pro = models.BooleanField(default=False)
  ai_usage_count = models.IntegerField(default=0)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

