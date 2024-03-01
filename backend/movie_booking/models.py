from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15)
    address = models.TextField()
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    promotions = models.BooleanField(default=False)


class MovieCategory(models.Model):
    CATEGORY = (('G','General audience'),('M','Mature audience'),('R','Restricted audience'),('X','No one under 18'))
    category = models.CharField(primary_key=True, max_length=50,choices = CATEGORY,default='U')

    def __str__(self):
        return f"{self.category} - {self.get_category_display()}"
class Promotion(models.Model):
    code = models.CharField(primary_key=True,max_length=50)
    amount = models.IntegerField(default=10)
    #valid_thru = models.CharField(max_length=50)

class Movie(models.Model):
  

    ratings = models.DecimalField(max_digits=3, decimal_places=1, default=0.0) 
    genre = models.CharField(max_length=50,default='Action')
    title = models.CharField(primary_key=True, max_length=100)
    cast = models.CharField(max_length=100,default='Unkown')
    synopsis = models.CharField(max_length=500,default='None')
    rating = models.CharField(max_length=5, blank=True)
    playing_now = models.BooleanField(default=False)
    trailer_picture = models.URLField(max_length=1000,default='https://static.vecteezy.com/system/resources/thumbnails/001/623/833/original/movie-trailer-coming-soon-background-video.jpg')
    release_date = models.DateField(blank=True, default=timezone.now)
    genre = models.CharField(max_length=10, blank=True)
    trailer_video = models.URLField(max_length=250, blank=True)
    certificate = models.ForeignKey('MovieCategory', on_delete=models.CASCADE, default='G')
    director = models.CharField(max_length=100, blank=True, default='')
    producer = models.CharField(max_length=100, blank=True, default='')
    duration = models.CharField(max_length=6, blank=True, null=True, default='03H00M')

    visibility=models.CharField(max_length=100,blank=True,default="Now Playing")

    def __str__(self):
        return self.title
