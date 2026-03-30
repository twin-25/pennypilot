from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
import json

User = get_user_model()

@database_sync_to_async
def get_user(user_id):
  try:
    return User.objects.get(id = user_id)
  except User.DoesNotExist:
    return None
  

class NotificationConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    try:

      query_str = self.scope['query_string'].decode()
      token = query_str.split('=')[1]

      access_token = AccessToken(token)
      user_id = access_token['user_id']

      self.user = await get_user(user_id)

      if self.user is None:
        await self.close()
        return
      

      self.group_name = f"notifications_{self.user.id}"


      await self.channel_layer.group_add(
        self.group_name,
        self.channel_name
      )

      await self.accept()

    except Exception as e:
      print(f"Websocket connection error: {e}")
      await self.close()

  async def disconnect(self, code):
    if hasattr(self, 'group_name'):
      await self.channel_layer.group_discard(
        self.group_name,
        self.channel_name
      )

  async def receive(self, text_data):
    pass

  async def send_notification(self, event):
    await self.send(text_data=json.dumps({
      'message': event['message']
    }))