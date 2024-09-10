from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, TrainerViewSet

# Initialize the DefaultRouter
router = DefaultRouter()

# Register the ClientViewSet and TrainerViewSet with the router
router.register(r'clients', ClientViewSet, basename='client')
router.register(r'trainers', TrainerViewSet, basename='trainer')

# Include the router URLs in urlpatterns
urlpatterns = [
    path('', include(router.urls)),  # This will include all the registered routes
]
