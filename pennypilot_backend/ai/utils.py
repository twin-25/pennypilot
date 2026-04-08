from .models import AiusageLog
from datetime import datetime

def check_and_log_usage(user, feature, limit = 3):
  now = datetime.now()

  usage = AiusageLog.objects.filter(
    user = user,
    feature = feature,
    created_at__month = now.month,
    created_at__year = now.year
  ).count()

  if usage >= limit:
    return False, usage
  
  AiusageLog.objects.create(user=user, feature=feature)

  return True, usage + 1



