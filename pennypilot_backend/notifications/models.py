from django.db import models
from django.conf import settings

# Create your models here.

class Notification(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL,  on_delete=models.CASCADE)
  message = models.TextField(max_length=254, blank=False)
  created_at=models.DateTimeField(auto_now_add=True)
  is_read = models.BooleanField(default = False)
  def __str__(self):
        return f"{self.user} - {self.id}"
