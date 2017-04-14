from rest_framework import serializers
from core.models import AuthUser, Post
from django.utils.text import slugify


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ('username', 'avatar',)


class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=127)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)

    def validate_email(self, value):
        try:
            AuthUser.objects.get(email=value)
        except AuthUser.DoesNotExist:
            return value
        raise serializers.ValidationError("Email already exists")

    def validate_username(self, value):
        try:
            AuthUser.objects.get(username=value)
        except AuthUser.DoesNotExist:
            return value
        raise serializers.ValidationError("Username already exists")

    def save(self):
        username = self.validated_data['username']
        email = self.validated_data['email']
        passwd = self.validated_data['password']
        user = AuthUser.objects.create_user(email, passwd, username=username)
        return user


class SlugField(serializers.Field):
    def to_representation(self, obj):
        return slugify(obj, allow_unicode=True)


class NiceNumberField(serializers.Field):
    def to_representation(self, obj):
        if obj < 1000:
            return str(obj)
        return str(round(obj/1000.0, 1)).rstrip('.0') + 'k'


class PostSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    slug = SlugField(source='title', read_only=True)
    nice_view = NiceNumberField(source='view_count', read_only=True)
    nice_comment = NiceNumberField(source='comment_count', read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'title', 'image_url', 'medium_url', 'thumb_url', 'view_count',
                    'comment_count', 'created_at', 'creator', 'slug',
                    'nice_view', 'nice_comment')
