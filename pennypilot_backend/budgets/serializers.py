from rest_framework import serializers
from .models import Budget
from transactions.serializers import CategorySerializer
from transactions.models import Category

class BudgetSerializer(serializers.ModelSerializer):
  category = CategorySerializer(many = False, read_only = True)
  category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
  
  class Meta:
    model = Budget
    fields = ['id', 'limit_amount', 'month', 'category', 'category_id', 'year']

  def get_category(self, obj):
        return {
            'id': obj.category.id,
            'name': obj.category.name,
            'icon': obj.category.icon,
            'color': obj.category.color,
        }

  def create(self, validated_data):
    user = self.context['request'].user
    budget = Budget.objects.create(user = user, **validated_data)
    return budget