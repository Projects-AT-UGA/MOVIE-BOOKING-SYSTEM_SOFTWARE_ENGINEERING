from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import CustomUser
from .serializer import CustomUserSerializer
from .serializer import MovieSerializer,PromotionSerializer
from rest_framework import viewsets
from .models import *

class UserCreate(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        validated_data['password'] = make_password(validated_data['password'])  # Hash the password
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED, headers=headers)

# from django.contrib.auth import authenticate, login
# from django.http import JsonResponse

# class UserLogin(GenericAPIView):
#     permission_classes = [AllowAny]

#     def post(self, request, *args, **kwargs):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({"message": "Login successful"})
#         else:
#             return JsonResponse({"error": "Invalid credentials"}, status=401)
        

from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.http import JsonResponse

class UserLogin(GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            # You can add additional logic here such as setting session variables
            return JsonResponse({"message": "Login successful"})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)



class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class PromotionViewSet(viewsets.ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
