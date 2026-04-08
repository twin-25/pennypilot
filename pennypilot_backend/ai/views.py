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
import json
from django.db.models import Sum, Count
from .utils import check_and_log_usage
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
  
  Be funny, witty and respectful.

  return ONLY a JSON array:
  [
  {{"tip": "your tip here", "icon": "emoji"}},
  {{"tip": "your tip here", "icon": "emoji"}},
  {{"tip": "your tip here", "icon": "emoji"}}
]
  '''
  if not user.is_pro:
     allowed, usage = check_and_log_usage(user, 'tips', limit=3)
     if not allowed:
        return Response({
           'error':'limit_exceeded',
           'message':'Upgrade to Pro for unlimited AI Tips!!',
           'usage': usage,
           'limit': 3
        }, status=status.HTTP_403_FORDIDDEN)


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
      
      max_tokens = 500

    
    )

    raw = response.choices[0].message.content
    raw = raw.replace('```json', '').replace('```', '').strip()
    analysis = json.loads(raw)

    return Response({
      'analysis': analysis
    }, status = status.HTTP_200_OK)
  
  except Exception as e:
    return Response({
      'error':str(e)
    }, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
  

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getAiAnalysis(request):
    user = request.user
    now = datetime.now()
    last_month = now - timedelta(days=30)  

    if not user.is_pro:
     allowed, usage = check_and_log_usage(user, 'tips', limit=3)
     if not allowed:
        return Response({
           'error':'limit_exceeded',
           'message':'Upgrade to Pro for unlimited AI Analytics!!',
           'usage': usage,
           'limit': 3
        }, status=status.HTTP_403_FORDIDDEN)

    # detailed transactions
    current_transactions = list(Transaction.objects.filter(
        user=user,
        date__gte=last_month
    ).values(
        'category__name', 'category__icon',
        'amount', 'date', 'note',
        'mode_of_payment', 'type'
    ))

    previous_transactions = list(Transaction.objects.filter(
        user=user,
        date__gte=last_month - timedelta(days=30),
        date__lt=last_month  
    ).values(
        'category__name', 'category__icon',
        'amount', 'date', 'note',
        'mode_of_payment', 'type'
    ))

    # aggregated totals
    current_totals = list(Transaction.objects.filter(
        user=user,
        date__gte=last_month
    ).values('category__name').annotate(
        total=Sum('amount'), count=Count('id')
    ))

    previous_totals = list(Transaction.objects.filter(
        user=user,
        date__gte=last_month - timedelta(days=30),
        date__lt=last_month 
    ).values('category__name').annotate(
        total=Sum('amount'), count=Count('id')
    ))

    prompt = f'''Analyze spending patterns of {user.first_name}.
    
    Individual transactions (spot anomalies):
    Current: {current_transactions}
    Previous: {previous_transactions}

    Category totals:
    Current month: {current_totals}
    Previous month: {previous_totals}

    Look for:
    - Suspicious large single transactions
    - Sudden increase in frequency
    - Categories exceeding budget
    - Suspicious patterns

    Be funny, witty and respectful.

    Return ONLY a JSON array:
    [
      {{"type": "anomaly", "category": "Food",
        "message": "your analysis here", "icon": "⚠️"}},
      {{"type": "increase", "category": "Transport",
        "message": "your analysis here", "icon": "📈"}}
    ]
    '''

    try:
        response = client.chat.completions.create(
            model='llama-3.3-70b-versatile',
            messages=[
                {
                    'role': 'system',
                    'content': 'You are a witty but helpful financial assistant.'
                },
                {
                    'role': 'user',
                    'content': prompt
                }
            ],
            max_tokens=1000
        )

        raw = response.choices[0].message.content
        raw = raw.replace('```json', '').replace('```', '').strip()
        analysis = json.loads(raw)

        return Response({
            'analysis': analysis
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getAiReport(request):
    user = request.user
    now = datetime.now()
    last_month = now - timedelta(days=30) 

    if not user.is_pro:
     allowed, usage = check_and_log_usage(user, 'tips', limit=1)
     if not allowed:
        return Response({
           'error':'limit_exceeded',
           'message':'Upgrade to Pro for unlimited AI Reports!!',
           'usage': usage,
           'limit': 1
        }, status=status.HTTP_403_FORDIDDEN)

    current_transactions = list(Transaction.objects.filter(
        user=user,
        date__gte=last_month
    ).values(
        'category__name', 'category__icon',
        'amount', 'date', 'note',
        'mode_of_payment', 'type'
    ))

    previous_transactions = list(Transaction.objects.filter(
        user=user,
        date__gte=last_month - timedelta(days=30),
        date__lt=last_month  
    ).values(
        'category__name', 'category__icon',
        'amount', 'date', 'note',
        'mode_of_payment', 'type'
    ))

    budgets = Budget.objects.filter(user=user, month = datetime.now().strftime('%b').upper(),year = datetime.now().year)
    budget_data = BudgetSerializer(budgets, many=True).data


    prompt = f'''Generate a comprehensive monthly financial report for {user.first_name}.
    
    Individual transactions (spot anomalies):
    Current: {current_transactions}
    Previous: {previous_transactions}

    these are the budgets:
    {budget_data}

    You Should:
    -calculate income vs expenses
    -calculate savings rate
    -identify to spending categories
    -compare with last month
    -find biggest win and concern
    -give next month recommendations

    Be funny, witty and respectful.

    Return ONLY this JSON:
    {{
      "summary": "2-3 sentence overview",
      "income": 0,
      "expenses": 0,
      "savings": 0,
      "savings_rate": 0,
      "biggest_win": "what they did well",
      "biggest_concern": "main problem",
      "top_categories": [
        {{"name": "Food", "total": 0, "icon": "🍔", "percentage": 0}}
      ],
      "next_month_tips": ["tip1", "tip2", "tip3"]
    }}
    '''

    try:
        response = client.chat.completions.create(
            model='llama-3.3-70b-versatile',
            messages=[
                {
                    'role': 'system',
                    'content': 'You are a witty but helpful financial assistant.'
                },
                {
                    'role': 'user',
                    'content': prompt
                }
            ],
            max_tokens=2000
        )

        raw = response.choices[0].message.content
        raw = raw.replace('```json', '').replace('```', '').strip()
        analysis = json.loads(raw)

        return Response({
            'analysis': analysis
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
