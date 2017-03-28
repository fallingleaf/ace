from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.
class AuthUserManager(BaseUserManager):
    def create_user(self, email, password):
        """
        Create and save user with the given email, username and password
        :param email:
        :param password:
        :return: user
        """
        if not email:
            raise ValueError('Users must have email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.is_active = True
        user.set_password(password)
        user.role = AuthUser.USER_ROLE
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Create superuser with username, email and password
        :param email:
        :param password:
        :return: user
        """
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

    def __unicode__(self):
        return self.email
