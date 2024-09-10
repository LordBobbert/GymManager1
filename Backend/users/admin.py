from django.contrib import admin
from .models import User, Client, Trainer

class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'role', 'is_active', 'is_staff']
    search_fields = ['email', 'name']

class ClientAdmin(admin.ModelAdmin):
    list_display = ['emergency_contact_name', 'training_status', 'assigned_trainer', 'is_active']

class TrainerAdmin(admin.ModelAdmin):
    list_display = ['status', 'monthly_rent_rate', 'rent_per_session']

admin.site.register(User, UserAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Trainer, TrainerAdmin)
