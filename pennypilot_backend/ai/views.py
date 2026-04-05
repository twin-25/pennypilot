from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from transactions.models import Transaction
from transactions.serializers import TransactionSerializer
from budgets.models import Budget
from budgets.serializers import BudgetSerializer
from datetime import datetime, timedelta
import os
from django.conf import settings
from groq import Groq
# Create your views here.


client = Groq(
    api_key=settings.GROQ_API_KEY
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getAiTips(request):
  user = request.user
  transactions = Transaction.objects.filter(user = user , date__gte = datetime.now()- timedelta(days=30))
  budgets = Budget.objects.filter(user=user, month = datetime.now().strftime('%b').upper(),year = datetime.now().year)
  transactions_data = TransactionSerializer(transactions, many=True).data
  budget_data = BudgetSerializer(budgets, many=True).data
  
  prompt = f'''Act as a financial advisor for the {user.first_name}.
  Analyze  their transactions and provide 3 specific actionable tips
  you have acces to 
  transactions: {transactions_data}
  budgets: {budget_data}
  format as  3 numbered tips only.
  Be funny, witty and respectful.
  '''


  try:

    response = client.chat.completions.create(
      model='llama-3.3-70b-versatile',
      messages=[
        {
          'role':'system',
          'content':'You are a helpful financial assistant'
        },
        {
          'role':'user',
          'content': prompt
        }
      ],
      
      max_tokens = 1000

    
    )

    return Response({
      'tips': response.choices[0].message.content
    }, status = status.HTTP_200_OK)
  
  except Exception as e:
    return Response({
      'error':str(e)
    }, status = status.HTTP_500_INTERNAL_SERVER_ERROR)


