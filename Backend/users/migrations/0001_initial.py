# Generated by Django 4.2.16 on 2024-09-10 03:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('role', models.CharField(choices=[('client', 'Client'), ('trainer', 'Trainer'), ('admin', 'Admin')], default='client', max_length=7)),
                ('phone_number', models.CharField(blank=True, max_length=20)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to.', related_name='customuser_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='customuser_permissions_set', to='auth.permission')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Trainer',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('status', models.CharField(choices=[('subcontractor_part_time', 'Subcontractor Part-Time'), ('subcontractor_full_time', 'Subcontractor Full-Time'), ('employee_part_time', 'Employee Part-Time'), ('employee_full_time', 'Employee Full-Time'), ('inactive', 'Inactive')], max_length=50)),
                ('monthly_rent_rate', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('rent_per_session', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('emergency_contact_name', models.CharField(max_length=255)),
                ('emergency_contact_phone', models.CharField(max_length=20)),
                ('emergency_contact_relation', models.CharField(max_length=50)),
                ('training_status', models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive'), ('on_vacation', 'On Vacation')], max_length=20)),
                ('one_on_one_rate', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('partner_session_rate', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('is_active', models.BooleanField(default=True)),
                ('assigned_trainer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='clients', to='users.trainer')),
            ],
        ),
    ]
