from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Client, Trainer
from .serializers import ClientSerializer, TrainerSerializer
from custom_auth.permissions import IsAdmin, IsTrainer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.filter(is_active=True)  # Only active clients
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'trainer':
            # Trainers can only view their own clients
            return Client.objects.filter(assigned_trainer=self.request.user.trainer_profile, is_active=True)
        return Client.objects.all()  # Admins can view all clients

    def perform_destroy(self, instance):
        # Soft delete: only hide client from trainers, but keep them for admins
        instance.is_active = False
        instance.save()

    def perform_create(self, serializer):
        # Automatically assign trainer to the client on creation
        if self.request.user.role == 'trainer':
            serializer.save(assigned_trainer=self.request.user.trainer_profile)
        else:
            serializer.save()  # Admins can assign trainers manually

# Viewset for managing trainers
class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer
    permission_classes = [IsAuthenticated, IsAdmin | IsTrainer]
