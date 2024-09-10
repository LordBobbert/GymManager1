from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import ClientViewSet, TrainerViewSet  # Import your viewsets from the users app

# Initialize the DefaultRouter
router = DefaultRouter()

# Register viewsets for clients and trainers
router.register(r'clients', ClientViewSet, basename='client')
router.register(r'trainers', TrainerViewSet, basename='trainer')

# Define urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),  # Django admin
    path('api/', include(router.urls)),  # Include all routes managed by the router (clients, trainers)
    path('api/auth/', include('custom_auth.urls')),  # Authentication routes, adjust as necessary
    # Include additional app URLs as needed, for example:
    # path('api/workouts/', include('workouts.urls')),  # Example for another app
    # path('api/payments/', include('payments.urls')),
]
