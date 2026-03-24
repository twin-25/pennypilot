
from . models import Transaction
from .serializers import TransactionSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.permissions import IsAuthenticated

# Create your views here.

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTransactions(request):
  user = request.user
  transactions = Transaction.objects.filter(user = user)  
  serializer = TransactionSerializer(transactions, many = True)
  return Response(serializer.data, status = status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTransaction(request, id):
  user = request.user
  try:
    transaction = Transaction.objects.get(user = user, pk = id)
  except Transaction.DoesNotExist:
    return Response({'detail': 'Transaction not found'},
                        status=status.HTTP_404_NOT_FOUND)
  
  serializer = TransactionSerializer(transaction, many = False)
  return Response(serializer.data, status = status.HTTP_200_OK)

  


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createTransaction(request):
  serializer = TransactionSerializer(data = request.data, context={'request': request})

  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status = status.HTTP_201_CREATED)
  
  return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST )




@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateTransaction(request, id):
  user = request.user
  try:
    transaction = Transaction.objects.get(pk=id, user=user)

  except Transaction.DoesNotExist:
    return Response({'detail': 'Transaction not found'},
                    status=status.HTTP_404_NOT_FOUND)
  
  serializer = TransactionSerializer(transaction, data = request.data, partial = True)

  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status = status.HTTP_200_OK)
  
  return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteTransaction(request, id):
  user = request.user
  try:
    transaction = Transaction.objects.get(pk = id, user = user)
  except Transaction.DoesNotExist:
    return Response( status= status.HTTP_404_NOT_FOUND )
  transaction.delete()
  return Response(status = status.HTTP_204_NO_CONTENT)


  







