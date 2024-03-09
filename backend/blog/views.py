from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response


class NewsAPI(APIView):
    def get(self, request):
        category_id = request.GET.get('category')
        news = News.objects.all()
        if category_id:
            news = news.filter(category_id=category_id)
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)


class NewsDetailView(APIView):
    def get(self, request, pk, format=None):
        try:
            news = News.objects.get(pk=pk)
            serializer = NewsSerializer(news)
            return Response(serializer.data)
        except News.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CategoryAPI(APIView):
    def get(self, request):
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)
