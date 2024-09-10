from django.contrib import admin
from .models import Workout

# Custom admin model for Workout to handle active/inactive filtering
@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('client', 'trainer', 'created_at', 'is_active')
    list_filter = ('trainer', 'client', 'is_active')  # Allows filtering by active/inactive
    search_fields = ('client__name', 'trainer__name')

    # Make workouts read-only if they are soft-deleted
    def get_readonly_fields(self, request, obj=None):
        if obj and not obj.is_active:
            return [f.name for f in self.model._meta.fields]  # All fields read-only
        return self.readonly_fields

    # Customize save method to allow reactivating archived workouts
    def save_model(self, request, obj, form, change):
        if 'is_active' in form.changed_data and obj.is_active:
            # Reactivating a workout
            obj.is_active = True
        super().save_model(request, obj, form, change)
