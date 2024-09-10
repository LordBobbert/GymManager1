from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Workout
from .serializers import WorkoutSerializer
from custom_auth.permissions import IsAdmin, IsTrainer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.filter(is_active=True)  # Only active workouts
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'trainer':
            # Trainers can only view their own workouts
            return Workout.objects.filter(trainer=self.request.user.trainer_profile, is_active=True)
        return Workout.objects.all()  # Admins can view all workouts

    def perform_destroy(self, instance):
        # Soft delete: only hide workout from trainers, but keep it for admins
        instance.is_active = False
        instance.save()

    def perform_create(self, serializer):
        # Automatically assign trainer to the workout
        if self.request.user.role == 'trainer':
            serializer.save(trainer=self.request.user.trainer_profile)
        else:
            serializer.save()  # Admins can create/edit workouts for any trainer
