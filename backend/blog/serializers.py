from rest_framework import serializers
from .models import *


class NewsSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = CategorySerializer(instance.category).data
        return data

    class Meta:
        model = News
        fields = ('id', 'name', 'category', 'image', 'about', 'author', 'file', 'date')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')
