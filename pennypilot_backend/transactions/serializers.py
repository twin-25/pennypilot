from rest_framework import serializers
from .models import User, Category, Transaction



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'color']

    def create(self, validated_data):
        user = self.context['request'].user
        category = Category.objects.create(user = user, **validated_data)
        return category


class TransactionSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many = False, read_only = True)
    class Meta:
        model = Transaction
        exclude = ['created_at', 'updated_at']

    def create(self, validated_data):
        user = self.context['request'].user
        transaction = Transaction.objects.create(user = user , **validated_data)
        return transaction
    