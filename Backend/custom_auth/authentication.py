# custom_auth/authentication.py

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Try to get the access token from the cookies instead of headers
        access_token = request.COOKIES.get('access_token')
        
        if access_token is None:
            # If there's no access token in the cookies, return None
            return None

        try:
            # Validate the token (this is the usual JWT authentication mechanism)
            validated_token = self.get_validated_token(access_token)

            # Return the user and the validated token if everything is okay
            return self.get_user(validated_token), validated_token
        except AuthenticationFailed as e:
            # Raise an error if the token is invalid or expired
            raise AuthenticationFailed("Invalid access token")
