import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'base.settings')
django.setup()

# now import models AFTER setup
from transactions.models import Category
from users.models import User

# 2. Create categories — user=None means default for everyone
categories = [
    {'name': 'Food',         'icon': '🍔', 'color': '#FF5733'},
    {'name': 'Rent',         'icon': '🏠', 'color': '#33FF57'},
    {'name': 'Transport',    'icon': '🚗', 'color': '#3357FF'},
    {'name': 'Health',       'icon': '💊', 'color': '#FF33F5'},
    {'name': 'Entertainment','icon': '🎮', 'color': '#F5FF33'},
    {'name': 'Salary',       'icon': '💰', 'color': '#33FFF5'},
    {'name': 'Shopping',     'icon': '🛍️', 'color': '#FF9933'},
    {'name': 'Education',    'icon': '📚', 'color': '#9933FF'},
]

for cat in categories:
    category, created = Category.objects.get_or_create(
        name=cat['name'],
        user=None,  # ← default category visible to all users!
        defaults={
            'icon': cat['icon'],
            'color': cat['color']
        }
    )
    if created:
        print(f'✅ Category {cat["name"]} created')