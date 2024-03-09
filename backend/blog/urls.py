from django.urls import path
from .views import *
urlpatterns = [
    path('news/', NewsAPI.as_view(), name='news',),
    path('news/<int:pk>', NewsDetailView.as_view(),name='news_item'),
    path('categories/', CategoryAPI.as_view(), name='categories'),
]
