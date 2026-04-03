from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Transaction
from budgets.models import Budget
from django.db.models import Sum
from datetime import datetime
from notifications.models import Notification
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

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
            budget = Budget.objects.get(
                user=user, year=year, month=month, category=category)
        except Budget.DoesNotExist:
            return

        total = Transaction.objects.filter(
            category=category,
            user=user,
            date__month=now.month,
            date__year=now.year,
            type='EXP'
        ).aggregate(Sum('amount'))['amount__sum'] or 0

        percentage = (total / budget.limit_amount) * 100

        print(f'Signal fired! percentage: {percentage}')

        #  set message for both cases
        if percentage >= 100:
            message = f"🚨 You've exceeded your {category.name} budget!"
        elif percentage >= 80:
            message = f"⚠️ You've used 80% of your {category.name} budget!"
        else:
            return  # under 80% — do nothing

        #  create notification + send websocket for BOTH cases
        Notification.objects.get_or_create(
            user=user,
            message=message
        )

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"notifications_{user.id}",
            {
                'type': 'send_notification',
                'message': message
            }
        )