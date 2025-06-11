# TonyTheCoderPortfolio/settings.py
import os
from pathlib import Path
import dotenv
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env file for local development
env_path = BASE_DIR / ".env"
dotenv.load_dotenv(dotenv_path=env_path)

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "fallback-insecure-key-for-dev")

# The DEBUG variable will be 'False' in production and 'True' locally
DEBUG = (os.environ.get("DJANGO_DEBUG", "FALSE").lower() == "true")

# --- ALLOWED_HOSTS for Heroku, Render, and custom domains ---
ALLOWED_HOSTS = ['ttc-portfolio-49dd8f292b3b.herokuapp.com']

# Allow all Heroku subdomains (like ttc-portfolio-XXXX.herokuapp.com)
ALLOWED_HOSTS.append('*.herokuapp.com')

# Explicitly add the base Heroku app name if HEROKU_APP_NAME is set
HEROKU_APP_NAME = os.environ.get('HEROKU_APP_NAME')
if HEROKU_APP_NAME:
    ALLOWED_HOSTS.append(f'{HEROKU_APP_NAME}.herokuapp.com')

# Add Render deployment host if RENDER_EXTERNAL_HOSTNAME is set
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Add your custom domains
ALLOWED_HOSTS.append('tonythecoder.com')
ALLOWED_HOSTS.append('www.tonythecoder.com')

# Optionally, for local development with DEBUG=True, you might include localhost, etc.
if DEBUG:
    ALLOWED_HOSTS.append('127.0.0.1')
    ALLOWED_HOSTS.append('localhost')


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "whitenoise.runserver_nostatic",
    "django.contrib.staticfiles",
    "django.contrib.humanize",
    # Third-party apps
    "django_ckeditor_5",
    "django_vite",
    "storages", # Add django-storages here
    # Your apps
    "portfolio_app",
    'rest_framework',
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "TonyTheCoderPortfolio.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "TonyTheCoderPortfolio.wsgi.application"


# --- DATABASE CONFIGURATION ---
# Uses SQLite locally and PostgreSQL in production (on Heroku or Render)
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            ssl_require=True # Heroku/Render PostgreSQL URLs typically require SSL
        )
    }
else:
    # Fallback to SQLite for local development
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "America/New_York"
USE_I18N = True
USE_TZ = True

# --- STATIC & MEDIA FILES ---
STATIC_URL = "/static/"
MEDIA_URL = "/media/"

# This is where `collectstatic` will gather all static files for deployment.
STATIC_ROOT = BASE_DIR / "staticfiles"

# Tell WhiteNoise to use a more efficient storage backend in production
if not DEBUG:
    STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# This directory is for your source static files (which Vite also uses)
STATICFILES_DIRS = [
    BASE_DIR / "assets",
    # Add the React build output directory here
    # Assumes your React project is in 'reactland' and builds to a 'dist' folder
    BASE_DIR / "reactland" / "dist", # ADDED: This line is crucial!
]


# Media files (User-uploaded content) - used when DEBUG is True
MEDIA_ROOT = BASE_DIR / "media/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- Authentication Settings ---
LOGIN_URL = "/accounts/login/"
LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/"

# --- CSRF Trusted Origins for Heroku, Render, and custom domains ---
CSRF_TRUSTED_ORIGINS = []

# Allow all Heroku subdomains (including the one with the hash)
CSRF_TRUSTED_ORIGINS.append('https://*.herokuapp.com')

# Add explicit Heroku app domain if HEROKU_APP_NAME is set
if HEROKU_APP_NAME:
    CSRF_TRUSTED_ORIGINS.append(f'https://{HEROKU_APP_NAME}.herokuapp.com')
    # If you use a custom domain on Heroku, its canonical host might be herokudns.com
    CSRF_TRUSTED_ORIGINS.append(f'https://{HEROKU_APP_NAME}.herokudns.com')

# Add Render deployment host if RENDER_EXTERNAL_HOSTNAME is set
if RENDER_EXTERNAL_HOSTNAME:
    CSRF_TRUSTED_ORIGINS.append(f'https://{RENDER_EXTERNAL_HOSTNAME}')

# Add custom domains with HTTPS
CSRF_TRUSTED_ORIGINS.append('https://tonythecoder.com')
CSRF_TRUSTED_ORIGINS.append('https://www.tonythecoder.com')


# --- Django-Vite Settings ---
DJANGO_VITE = {
    "default": {
        "manifest_path": BASE_DIR / "assets" / "vite" / ".vite" / "manifest.json",
        "dev_server_port": 5173,
        "dev_server_host": "localhost",
        "static_url_prefix": "",
    }
}

# --- AH S3 Object Storage (Stackhero MinIO) Configuration for Media Files ---
# Only configure for production (when DEBUG is False)
if not DEBUG:
    # Retrieve credentials from Heroku Config Vars using their EXACT names
    # Note: Use the new application-specific keys you created in MinIO Console
    STACKHERO_MINIO_HOST_ENV = os.environ.get('AH_S3_OBJECT_STORAGE_STACKHERO_CYAN_HOST')
    MINIO_APP_ACCESS_KEY = os.environ.get('MINIO_APP_ACCESS_KEY')
    MINIO_APP_SECRET_KEY = os.environ.get('MINIO_APP_SECRET_KEY')
    S3_BUCKET_NAME = os.environ.get('STACKHERO_MINIO_BUCKET_NAME')

    # Ensure all required variables are present before attempting S3 configuration
    if all([STACKHERO_MINIO_HOST_ENV, MINIO_APP_ACCESS_KEY, MINIO_APP_SECRET_KEY, S3_BUCKET_NAME]):
        # Map MinIO variables to django-storages's AWS S3 parameters
        AWS_S3_ENDPOINT_URL = f'https://{STACKHERO_MINIO_HOST_ENV}'
        AWS_ACCESS_KEY_ID = MINIO_APP_ACCESS_KEY
        AWS_SECRET_ACCESS_KEY = MINIO_APP_SECRET_KEY
        AWS_STORAGE_BUCKET_NAME = S3_BUCKET_NAME
        AWS_S3_REGION_NAME = 'us-east-1'

        # Set DEFAULT_FILE_STORAGE to use django-storages's S3 backend for media files
        DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

        # IMPORTANT: DO NOT set MEDIA_URL to the full S3 path here.
        # django-storages handles the URL generation automatically when DEFAULT_FILE_STORAGE is set.
        # The base MEDIA_URL = "/media/" is sufficient as a conceptual prefix.
        # If you explicitly need direct S3 links without Django's URL routing,
        # you would use the `instance.file_field.url` directly which would yield the S3 URL.

        # Optional: Recommended additional settings for S3-compatible storage
        AWS_S3_FILE_OVERWRITE = False
        AWS_DEFAULT_ACL = 'public-read'
        AWS_S3_SIGNATURE_VERSION = 's3v4'
        AWS_QUERYSTRING_AUTH = False
        AWS_S3_VERIFY = True

    else:
        print("WARNING: AH S3 Object Storage (Stackhero) application environment variables (HOST, APP_ACCESS_KEY, APP_SECRET_KEY, BUCKET_NAME) NOT FOUND. Media files will use local storage if DEBUG is False.")