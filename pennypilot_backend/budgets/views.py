from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import BudgetSerializer
from .models import Budget
from transactions.models import Transaction
from django.db.models import Sum
from datetime import datetime

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBudgets(request):
  month = request.query_params.get('month')
  year = request.query_params.get('year')
  user = request.user
  if month and year:
    budgets = Budget.objects.filter(user = user, month= month, year = year)
  else:
    budgets = Budget.objects.filter(user = user)

  budget_data = []
  for budget in budgets:
    spent = Transaction.objects.filter(
      user = user, 
      type = 'EXP',
      category=budget.category,
      date__month=datetime.strptime(month, '%b').month if month else datetime.now().month(),
      date__year=int(year) if year else datetime.now().year,
    ).aggregate(Sum('amount'))['amount__sum'] or 0

    budget_data.append({
      'id':budget.id,
      'category':{
        'id':budget.category.id,
        'name':budget.category.name,
        'icon':budget.category.icon,
        'color':budget.category.color,
      },
      'limit_amount': budget.limit_amount,
      'month': budget.month,
      'year': budget.year,
      'spent_amount': spent,
      'percentage': round((spent/budget.limit_amount)*100, 1) if budget.limit_amount>0 else 0
    })

  

  
  return Response(budget_data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBudget(request):
  serializer = BudgetSerializer(data = request.data, context= {'request':request})
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBudget(request, id):
  try:
    budget = Budget.objects.get(user = request.user, pk = id)
  except Budget.DoesNotExist:
    return Response({'detail': 'Budget Does Not Exist'}, status = status.HTTP_404_NOT_FOUND)
  
  serializer = BudgetSerializer(budget, data = request.data, partial = True)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBudget(request, id):
  try:
    budget = Budget.objects.get(user = request.user, pk = id)
  except Budget.DoesNotExist:
    return Response({'detail': 'Budget Does Not Exist'}, status = status.HTTP_404_NOT_FOUND)
  
  budget.delete()

  return Response(status = status.HTTP_204_NO_CONTENT)






