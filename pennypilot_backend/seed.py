import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'base.settings')
django.setup()

from users.models import User
from transactions.models import Category, Transaction
from budgets.models import Budget
from datetime import date

# 1. Create test user
user, created = User.objects.get_or_create(
    email='test@test.com',
    defaults={
        'username': 'testuser',
        'first_name': 'John',
        'last_name': 'Doe',
    }
)
if created:
    user.set_password('test1234')
    user.save()
    print('✅ User created')

# 2. Create categories
categories = [
    {'name': 'Food',        'icon': '🍔', 'color': '#FF5733'},
    {'name': 'Rent',        'icon': '🏠', 'color': '#33FF57'},
    {'name': 'Transport',   'icon': '🚗', 'color': '#3357FF'},
    {'name': 'Health',      'icon': '💊', 'color': '#FF33F5'},
    {'name': 'Entertainment','icon': '🎮', 'color': '#F5FF33'},
    {'name': 'Salary',      'icon': '💰', 'color': '#33FFF5'},
]

created_categories = {}
for cat in categories:
    category, created = Category.objects.get_or_create(
        name=cat['name'],
        defaults={'icon': cat['icon'], 'color': cat['color']}
    )
    created_categories[cat['name']] = category
    if created:
        print(f'✅ Category {cat["name"]} created')

# 3. Create transactions
transactions = [
    {'type': 'INC', 'amount': 3000, 'category': 'Salary',        'date': date(2025, 1, 1),  'note': 'Monthly salary'},
    {'type': 'EXP', 'amount': 800,  'category': 'Rent',          'date': date(2025, 1, 2),  'note': 'January rent'},
    {'type': 'EXP', 'amount': 400,  'category': 'Food',          'date': date(2025, 1, 5),  'note': 'Groceries'},
    {'type': 'EXP', 'amount': 200,  'category': 'Transport',     'date': date(2025, 1, 8),  'note': 'Bus pass'},
    {'type': 'EXP', 'amount': 150,  'category': 'Health',        'date': date(2025, 1, 10), 'note': 'Gym membership'},
    {'type': 'EXP', 'amount': 100,  'category': 'Entertainment', 'date': date(2025, 1, 15), 'note': 'Netflix + games'},
    {'type': 'INC', 'amount': 500,  'category': 'Salary',        'date': date(2025, 1, 20), 'note': 'Freelance work'},
    {'type': 'EXP', 'amount': 50,   'category': 'Food',          'date': date(2025, 1, 22), 'note': 'Restaurant'},
]

for t in transactions:
    Transaction.objects.get_or_create(
        user=user,
        category=created_categories[t['category']],
        amount=t['amount'],
        date=t['date'],
        defaults={
            'type': t['type'],
            'note': t['note'],
            'mode_of_payment': 'CASH'
        }
    )
    print(f'✅ Transaction {t["category"]} - {t["amount"]} created')

# 4. Create budgets
budgets = [
    {'category': 'Food',        'limit_amount': 500,  'month': 'JAN', 'year': 2025},
    {'category': 'Rent',        'limit_amount': 1000, 'month': 'JAN', 'year': 2025},
    {'category': 'Transport',   'limit_amount': 300,  'month': 'JAN', 'year': 2025},
    {'category': 'Health',      'limit_amount': 200,  'month': 'JAN', 'year': 2025},
    {'category': 'Entertainment','limit_amount': 150, 'month': 'JAN', 'year': 2025},
]

for b in budgets:
    Budget.objects.get_or_create(
        user=user,
        category=created_categories[b['category']],
        month=b['month'],
        year=b['year'],
        defaults={'limit_amount': b['limit_amount']}
    )
    print(f'✅ Budget {b["category"]} created')

print('\n🎉 Seeding complete!')
print(f'📧 Email: test@test.com')
print(f'🔑 Password: test1234')