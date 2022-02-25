from django.db import models

class Post(models.Model):

    post_time = models.DateTimeField()
    hours_worked = models.IntegerField()
    post_content = models.TextField()
