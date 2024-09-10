# File: auth/permissions.py

from rest_framework import permissions

# Full access for admins
class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

# Trainers can only access their own clients and workouts
class IsTrainer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'trainer'

    def has_object_permission(self, request, view, obj):
        # Trainers can only view, edit, delete clients they are assigned to
        if isinstance(obj, Client):
            return obj.assigned_trainer == request.user.trainer_profile
        # Trainers can only manage workouts they created
        elif isinstance(obj, Workout):
            return obj.trainer == request.user.trainer_profile
        return False

class IsClient(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.profile.role == 'client'
