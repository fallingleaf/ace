from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.html import format_html


# Create your models here.
class AuthUserManager(BaseUserManager):
    def create_user(self, email, password, username=''):
        if not email:
            raise ValueError('Users must have email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username
        )

        user.is_active = True
        user.set_password(password)
        user.role = AuthUser.USER_ROLE
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email=email,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.role = AuthUser.ADMIN_ROLE
        user.save(using=self._db)
        return user


class AuthUser(AbstractBaseUser):
    username = models.CharField(max_length=127, unique=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    date_joined = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    avatar = models.TextField(null=True, blank=True)

    USER_ROLE = 1
    ADMIN_ROLE = 2

    ROLES = (
        (USER_ROLE, 'User'),
        (ADMIN_ROLE, 'Admin'),
    )

    role = models.IntegerField(
        choices=ROLES,
        default=USER_ROLE,
    )

    objects = AuthUserManager()

    USERNAME_FIELD = 'email'

    def get_short_name(self):
        return self.username

    def get_username(self):
        return self.email

    def has_perm(self, perm, obj=None):
        # grant all permissions
        return True

    def has_module_perms(self, app_lable):
        return True

    def __unicode__(self):
        return self.email


class Post(models.Model):
    PENDING = 1
    INVALID = 0
    PUBLISHED = 2

    STATUS_CHOICES = (
        (INVALID, 'Invalid'),
        (PENDING, 'Pending'),
        (PUBLISHED, 'Published')
        )
    title = models.CharField(max_length=256, help_text='Title of post')
    image_url = models.TextField(help_text='Image url')
    medium_url = models.TextField(null=True, blank=True)
    thumb_url = models.TextField(null=True, blank=True)

    credit = models.CharField(max_length=256, null=True, blank=True)

    view_count = models.PositiveIntegerField(default=0, help_text='Number of likes')
    comment_count = models.PositiveIntegerField(default=0, help_text='Number of comments')

    creator = models.ForeignKey(AuthUser, null=True, blank=True)
    tags = models.TextField(null=True, blank=True)

    category = models.CharField(max_length=128, null=True, blank=True, default='dog')
    status = models.IntegerField(null=True, choices=STATUS_CHOICES, default=PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __unicode__(self):
        return self.title

    def img_tag(self):
        return format_html('<img src="{}" alt="{}" style="width: 100px;"/>',
                self.thumb_url, self.title)
    img_tag.short_description = 'Image'


class OauthToken(models.Model):
    provider = models.CharField(max_length=256)
    username = models.CharField(max_length=256, null=True, blank=True)
    fullname = models.CharField(max_length=256, null=True, blank=True)
    guid = models.CharField(max_length=256, null=True, blank=True)

    access_level = models.CharField(max_length=32, null=True, blank=True)
    token = models.CharField(max_length=256, null=True, blank=True)
    token_secret = models.CharField(max_length=256, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
