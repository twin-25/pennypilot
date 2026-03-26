from django.urls import path
from . import views


urlpatterns = [
  path('', views.getTransactions, name= 'get-transactions' ),
  path('create/', views.createTransaction, name= 'create-transaction' ),
  path('summary/', views.getDashboard, name='dashboard-summary'),

  path('<int:id>/', views.getTransaction, name= 'get-transaction' ),
  path('<int:id>/update/', views.updateTransaction, name= 'update-transaction' ),
  path('<int:id>/delete/', views.deleteTransaction, name= 'delete-transaction' ),

]