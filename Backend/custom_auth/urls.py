from rest_framework_simplejwt.views import TokenRefreshView
from .views import LogoutView, CustomTokenObtainPairView
from django.urls import path
from .views import get_user_details

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),  # Login URL
    path('logout/', LogoutView.as_view(), name='logout'),         # Logout URL
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
    path('user/', get_user_details, name='get_user_details'),

]
