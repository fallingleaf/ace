from django.contrib import admin
from .models import AuthUser, Post


@admin.register(AuthUser)
class AuthUserAdmin(admin.ModelAdmin):
    pass

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'view_count', 'comment_count', 'creator', 'created_at',)
