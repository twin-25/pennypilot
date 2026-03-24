from django.db import models
from django.conf import settings
from transactions.models import Category

# Create your models here.
class Choices:
  month = (
    ('JAN', 'January'),
    ('FEB', 'February'),
    ('MAR', 'MARCH'),
    ('APR', 'April'),
    ('MAY', 'May'),
    ('JUN', 'June'),
    ('JUL', 'July'),
    ('AUG', 'August'),
    ('SEP', 'September'),
    ('OCT', 'October'),
    ('NOV', 'November'),
    ('DEC', 'December')
  )


class Budget(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  category = models.ForeignKey(Category,on_delete=models.CASCADE)
  limit_amount = models.DecimalField(max_digits=10, decimal_places=2)
  month = models.CharField(choices=Choices.month, max_length=3)
  year = models.IntegerField()

  def __str__(self):
    return f"{self.user}-{self.category} - {self.month}/{self.year}"
  
  class Meta:
    unique_together = ['user', 'category', 'month', 'year']