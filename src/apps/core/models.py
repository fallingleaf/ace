from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.
class AuthUserManager(BaseUserManager):
    def create_user(self, username, email, password):
        if not email or not username:
            raise ValueError('Users must have email address and username')

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
    title = models.CharField(max_length=256, help_text='Title of post')
    image_url = models.TextField(help_text='Image url')
    thumb_url = models.TextField(null=True, blank=True)

    view_count = models.PositiveIntegerField(default=0, help_text='Number of likes')
    comment_count = models.PositiveIntegerField(default=0, help_text='Number of comments')

    creator = models.ForeignKey(AuthUser, null=True, blank=True)
    tags = models.TextField(null=True, blank=True)

    category = models.CharField(max_length=128, null=True, blank=True, default='puppy')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __unicode__(self):
        return self.title
