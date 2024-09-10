# File: auth/views.py

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated  # Add this import



class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class LogoutView(APIView):
    def post(self, request):
        try:
            # Get refresh token from request data
            refresh_token = request.data.get('refresh_token')

            if refresh_token:
                # Blacklist the refresh token to log the user out
                token = RefreshToken(refresh_token)
                token.blacklist()

                return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenRefreshView(TokenRefreshView):
    pass  # Inherit the standard refresh token logic from DRF JWT views


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        tokens = response.data  # This is the default response containing access and refresh tokens

        # Create a new response object and set the tokens as HttpOnly cookies
        res = Response()

        # Set the access token as an HTTP-only cookie
        res.set_cookie(
            key='access_token',
            value=tokens['access'],  # The access token
            httponly=True,  # This makes the cookie HTTP-only
            secure=True,  # Set to True for production (False in development if not using HTTPS)
            samesite='None',  # Adjust this depending on your app's requirements
            path='/',  # Set the cookie path to the root
            max_age=api_settings.ACCESS_TOKEN_LIFETIME.total_seconds(),  # Set the expiry to match the token's lifetime
        )

        # Set the refresh token as an HTTP-only cookie
        res.set_cookie(
            key='refresh_token',
            value=tokens['refresh'],  # The refresh token
            httponly=True,
            secure=True,  # Set to True for production (False in development if not using HTTPS)
            samesite='None',  # Adjust this depending on your app's requirements
            path='/',  # Set the cookie path to the root
            max_age=api_settings.REFRESH_TOKEN_LIFETIME.total_seconds(),
        )

        # Optionally, return a success message in the response body
        res.data = {"detail": "Login successful"}
        return res

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    # Request should be authenticated if the JWT is valid
    user = request.user
    return Response({
        "id": user.id,
        "name": user.name,
        "role": user.role,
    })