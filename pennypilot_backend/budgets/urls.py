from django.urls import path
from . import views

urlPatterns = [
  path('', views.getBudgets,name = 'get-budgets' ),
  path('create/', views.createBudget, name='create-budget'),
  path('<int:id>/update/', views.updateBudget,name = 'update-budget' ),
  path('<int:id>/delete/', views.deleteBudget, name = 'delete-budget'),
  

]