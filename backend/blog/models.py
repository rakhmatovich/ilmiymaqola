from django.db import models


# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class News(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images')
    about = models.TextField()
    author = models.CharField(max_length=255)
    file = models.FileField(upload_to='pdf')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
