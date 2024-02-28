from django.urls import path, include
from . import views
from movie_booking.views import UserCreate
from movie_booking.views import UserLogin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserCreate, UserLogin, MovieViewSet,PromotionViewSet

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'promotions', PromotionViewSet)

urlpatterns = [
    path('api/', include([
        path('users/',  UserCreate.as_view(), name='user-create'),
         path('login/',  UserLogin.as_view(), name='user-login'),
          path('', include(router.urls)),
    ])),
]
