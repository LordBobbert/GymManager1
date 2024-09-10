from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')  # Ensure superuser is assigned the admin role

        user = self.create_user(email, password, **extra_fields)

        # Optionally create a trainer profile for the admin
        if not hasattr(user, 'trainer'):
            Trainer.objects.create(user=user, status='employee_full_time')

        return user


# Base User model
class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('client', 'Client'),
        ('trainer', 'Trainer'),
        ('admin', 'Admin'),  # Added admin role
    ]
    
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=7, choices=ROLE_CHOICES, default='client')
    phone_number = models.CharField(max_length=20, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to.'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.'
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.name} ({self.get_role_display()})"


# Client model, extends from User
class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)  # Link Client to User model

    TRAINING_STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('on_vacation', 'On Vacation'),
    ]
    
    emergency_contact_name = models.CharField(max_length=255)
    emergency_contact_phone = models.CharField(max_length=20)
    emergency_contact_relation = models.CharField(max_length=50)
    
    training_status = models.CharField(max_length=20, choices=TRAINING_STATUS_CHOICES)
    
    one_on_one_rate = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    partner_session_rate = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    
    assigned_trainer = models.ForeignKey('Trainer', on_delete=models.SET_NULL, null=True, blank=True, related_name='clients')
    
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.name} (Client)"  # Correctly reference the name from the User model



# Trainer model, related to the User model, with unique fields for trainers
class Trainer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    STATUS_CHOICES = [
        ('subcontractor_part_time', 'Subcontractor Part-Time'),
        ('subcontractor_full_time', 'Subcontractor Full-Time'),
        ('employee_part_time', 'Employee Part-Time'),
        ('employee_full_time', 'Employee Full-Time'),
        ('inactive', 'Inactive'),
    ]
    
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    monthly_rent_rate = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    rent_per_session = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def save(self, *args, **kwargs):
        # Automatically set rent based on status
        if self.status == 'subcontractor_part_time':
            self.monthly_rent_rate = 250
            self.rent_per_session = 20
        elif self.status == 'subcontractor_full_time':
            self.monthly_rent_rate = 1000
            self.rent_per_session = None
        else:
            self.monthly_rent_rate = None
            self.rent_per_session = None
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Trainer: {self.user.name}"


# Signals to create user profiles based on their role
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'client':
            Client.objects.create(user=instance)  # Correctly reference the User instance
        elif instance.role == 'trainer':
            Trainer.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if instance.role == 'client':
        instance.client.save()
    elif instance.role == 'trainer':
        instance.trainer.save()

