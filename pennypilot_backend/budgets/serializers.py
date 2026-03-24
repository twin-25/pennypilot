from rest_framework import serializers
from .models import Budget
from transactions.serializers import CategorySerializer


class BudgetSerializer(serializers.ModelSerializer):
  category = CategorySerializer(many = False, read_only = True)
  class Meta:
    model = Budget
    fields = ['id', 'limit_amount', 'month', 'category', 'year']

  def create(self, validated_data):
    user = self.context['request'].user
    budget = Budget.objects.create(user = user, **validated_data)
    return budget