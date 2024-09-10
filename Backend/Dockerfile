# File: Dockerfile

# Base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install PostgreSQL development libraries
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install watchdog and sslserver
RUN pip install watchdog django-sslserver

# Copy the app source code
COPY . .

# Expose port 8000 for HTTP and 443 for HTTPS
EXPOSE 8000 443

# Create directory for SSL certificates
RUN mkdir /app/ssl

# Copy SSL certificate and key files
COPY localhost.crt /app/ssl/localhost.crt
COPY localhost.key /app/ssl/localhost.key

# Start Django development server with watchdog for autoreload and SSL support
CMD ["watchmedo", "auto-restart", "--directory=./", "--pattern=*.py", "--", "python", "manage.py", "runsslserver", "0.0.0.0:443", "--certfile", "/app/ssl/localhost.crt", "--keyfile", "/app/ssl/localhost.key"]
