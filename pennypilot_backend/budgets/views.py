from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import BudgetSerializer
from .models import Budget

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

  serializer = BudgetSerializer(budgets, many= True)
  return Response(serializer.data, status=status.HTTP_200_OK)


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






