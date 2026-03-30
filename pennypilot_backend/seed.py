import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'base.settings')
django.setup()

from budgets.models import Budget
from transactions.models import Category
from users.models import User

# get existing user and categories
user = User.objects.get(email='test@test.com')

food = Category.objects.get(name='Food', user=None)
rent = Category.objects.get(name='Rent', user=None)
transport = Category.objects.get(name='Transport', user=None)
health = Category.objects.get(name='Health', user=None)
entertainment = Category.objects.get(name='Entertainment', user=None)

budgets = [
    {'category': food,          'limit_amount': 100,  'month': 'MAR', 'year': 2026},
    {'category': rent,          'limit_amount': 1000, 'month': 'MAR', 'year': 2026},
    {'category': transport,     'limit_amount': 300,  'month': 'MAR', 'year': 2026},
    {'category': health,        'limit_amount': 200,  'month': 'MAR', 'year': 2026},
    {'category': entertainment, 'limit_amount': 150,  'month': 'MAR', 'year': 2026},
]

for b in budgets:
    budget, created = Budget.objects.get_or_create(
        user=user,
        category=b['category'],
        month=b['month'],
        year=b['year'],
        defaults={'limit_amount': b['limit_amount']}
    )
    if created:
        print(f'✅ Budget {b["category"].name} - ${b["limit_amount"]} created')
    else:
        print(f'⚠️ Budget {b["category"].name} already exists')

print('\n🎉 Budget seeding complete!')
