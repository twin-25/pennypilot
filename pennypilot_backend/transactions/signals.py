from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Transaction
from budgets.models import Budget
from django.db.models import Sum
from datetime import datetime
from notifications.models import Notification

@receiver(post_save, sender=Transaction)
def check_budget(sender, instance, created, **kwargs):
  if created:
    now = datetime.now()
    month = now.strftime('%b').upper()
    year = now.year

    category = instance.category
    user = instance.user

    if instance.type != 'EXP':
      return
    
    try:
      budget = Budget.objects.get(user = user, year = year, month = month, category = category)

    except Budget.DoesNotExist:
      return
    
    totalTransactions = totalTransactions = Transaction.objects.filter(
    category=category,
    user=user,
    date__month=now.month,  
    date__year=now.year,    
    )
    total = totalTransactions.aggregate(
    Sum('amount')
    )['amount__sum'] or 0
    
    percentage = (total/budget.limit_amount) * 100


    if percentage >= 80:
      Notification.objects.create(
        user = user,
        message = f"⚠️ You've used {percentage:.0f}% of your {category.name} budget!"
      )
    


