# TonyTheCoderPortfolio/settings.py
import os
from pathlib import Path
import dotenv
import dj_database_url  # <--- ADD THIS IMPORT

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env file for local development
env_path = BASE_DIR / ".env"
dotenv.load_dotenv(dotenv_path=env_path)

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "fallback-insecure-key-for-dev")

# The DEBUG variable will be 'False' on Render and 'True' locally
DEBUG = os.environ.get("DJANGO_DEBUG", "True") == "True"

ALLOWED_HOSTS = []

# --- ADD RENDER DEPLOYMENT HOST ---
# This is the hostname Render will assign to your app.
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "whitenoise.runserver_nostatic",  # <--- ADD THIS for WhiteNoise
    "django.contrib.staticfiles",
    "django.contrib.humanize",
    # Third-party apps
    "django_ckeditor_5",
    "django_vite",
    # Your apps
    "portfolio_app",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # <--- ADD THIS right after SecurityMiddleware
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
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "TonyTheCoderPortfolio.wsgi.application"


# --- DATABASE CONFIGURATION ---
# Uses SQLite locally and PostgreSQL in production (on Render)
if DEBUG:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    # This reads the DATABASE_URL environment variable provided by Render
    DATABASES = {
        'default': dj_database_url.config(
            conn_max_age=600,
            ssl_require=True
        )
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
TIME_ZONE = "America/New_York" # <--- CHANGED to a more specific timezone
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
STATICFILES_DIRS = [BASE_DIR / "assets"]

# Media files (User-uploaded content)
MEDIA_ROOT = BASE_DIR / "media/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- Authentication Settings ---
LOGIN_URL = "/accounts/login/"
LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/"

# --- CSRF Trusted Origins for Render ---
# This is required for secure form submissions on the live site
if RENDER_EXTERNAL_HOSTNAME:
    CSRF_TRUSTED_ORIGINS = [
        f'https://{RENDER_EXTERNAL_HOSTNAME}'
    ]

# --- Django-Vite Settings ---
# This remains the same, as the build process handles the output.
DJANGO_VITE_DEV_MODE = DEBUG
DJANGO_VITE_ASSETS_PATH = BASE_DIR / "reactland" / "dist" # <-- CHANGED: Point to Vite's output dir
DJANGO_VITE_APP_DIR = BASE_DIR / "reactland"

if DEBUG:
    DJANGO_VITE_DEV_SERVER_HOST = "localhost"
    DJANGO_VITE_DEV_SERVER_PORT = 5173