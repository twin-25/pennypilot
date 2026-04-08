from django.db import models
from django.conf import settings

# Create your models here.

class AiusageLog(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  feature = models.CharField(max_length=20)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f'{self.user} - {self.feature} - {self.created_at}'
  

