from django.db import models
from django.conf import settings

from colorfield.fields import ColorField

from django.contrib.auth.models import AbstractUser



class Choices:
  card_type = (
    ('CC', 'Credit Card'),
    ('D', 'Debit Card'),
  )

  payment_mode = (
    ('CASH', 'cash'),
    ('C', 'card'),
  )
  payment_type = (
    ('EXP', 'Expense'),
    ('INC', 'Income'),
  )


# Create your models here.
class Category(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL,  on_delete=models.CASCADE,null=True,blank=True)
  name = models.CharField(blank = False, null=True, max_length= 100)
  icon = models.CharField(max_length=10)
  color = ColorField(default = "#F7F2F2", format="hexa")
  def __str__(self):
        return self.name


class Transaction(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  category = models.ForeignKey(Category, on_delete=models.CASCADE)
  amount = models.DecimalField(max_digits=10, decimal_places=2)
  type = models.CharField(choices=Choices().payment_type, default='EXP', max_length=3)
  mode_of_payment = models.CharField(choices=Choices().payment_mode, default='CASH', max_length=4)
  card_type = models.CharField(choices=Choices().card_type, blank=True, null=True, max_length=2)
  date = models.DateField(blank=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  note = models.TextField(max_length=100, blank = True, null=True)


  def __str__(self):
        return f"{self.user} - {self.type} - {self.amount}"