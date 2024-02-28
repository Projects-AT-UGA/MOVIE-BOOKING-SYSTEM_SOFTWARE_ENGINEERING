from rest_framework import serializers
from .models import *
from rest_framework.authtoken.models import Token

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone_number', 'address', 'first_name', 'last_name', 'password','promotions']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
    
    def get_token(self, user):
        token, _ = Token.objects.get_or_create(user=user)
        return token.key

class TokenSerializer(serializers.Serializer):
    token = serializers.CharField()




class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = '__all__'