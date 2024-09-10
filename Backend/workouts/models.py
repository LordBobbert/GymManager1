from django.db import models

class Workout(models.Model):
    trainer = models.ForeignKey('users.Trainer', on_delete=models.CASCADE, related_name='workouts')
    client = models.ForeignKey('users.Client', on_delete=models.CASCADE, related_name='workouts')
    workout_plan = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    # Soft delete field
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Workout for {self.client.name} by {self.trainer.name}"
