from rest_framework import serializers
from .models import Client, Trainer

# Serializer for Client
class ClientSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()  # Include the name field from the related User model

    class Meta:
        model = Client
        fields = ['user', 'name', 'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relation',
                  'training_status', 'one_on_one_rate', 'partner_session_rate', 'assigned_trainer', 'is_active']

    def get_name(self, obj):
        return obj.user.name  # Access the name field from the related User model
    
# Serializer for Trainer
class TrainerSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()  # Access the email from the related User model
    name = serializers.SerializerMethodField()   # Access the name from the related User model

    class Meta:
        model = Trainer
        fields = ['user', 'name', 'email', 'status', 'monthly_rent_rate', 'rent_per_session']

    def get_email(self, obj):
        return obj.user.email  # Access the email from the User model

    def get_name(self, obj):
        return obj.user.name  # Access the name from the User model