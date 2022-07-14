from django import views
from django.urls import path
from .views import ProductViews
from . import views

urlpatterns = [
    path('products/', ProductViews.as_view()),
    path('products/<id>', ProductViews.as_view()),
    path('login/', views.login_user, name='login_user'),
]