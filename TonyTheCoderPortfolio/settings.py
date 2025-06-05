# TonyTheCoderPortfolio/settings.py
import os
from pathlib import Path
import dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env file
env_path = BASE_DIR / ".env"
dotenv.load_dotenv(dotenv_path=env_path)

SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY", "fallback-insecure-key-for-dev-portfolio"
)
DEBUG = os.environ.get("DJANGO_DEBUG", "True") == "True"

ALLOWED_HOSTS = []  # Add your domain names here for production

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.humanize",
    # Third-party apps
    "django_ckeditor_5",
    "django_vite",  # Vite integration
    # Your apps
    "portfolio_app",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
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

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"

# Directories where Django will look for static files additionally to app's 'static/' dirs
STATICFILES_DIRS = [
    BASE_DIR / "assets",  # Vite will build into a 'vite' subfolder here
]

# This is where `collectstatic` will gather all static files for deployment.
# Vite's built assets from `assets/vite/` will be copied here.
STATIC_ROOT = (
    BASE_DIR / "staticfiles_collected"
)  # Changed from "static/" to avoid conflict if you have a root static folder

# Media files (User-uploaded content)
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- Authentication Settings ---
LOGIN_URL = "/accounts/login/"
LOGIN_REDIRECT_URL = "/"  # Or 'portfolio_app:home'
LOGOUT_REDIRECT_URL = "/"  # Or 'portfolio_app:home'

# --- Django-Vite Settings ---
DJANGO_VITE_DEV_MODE = (
    DEBUG  # Enables Vite HMR and dev server proxying if DEBUG is True
)

# Path where Vite generates assets (relative to BASE_DIR or absolute)
# This should match your vite.config.ts build.outDir
DJANGO_VITE_ASSETS_PATH = BASE_DIR / "assets" / "vite"

# Optional: If your manifest isn't named "manifest.json" or is in a different location
# relative to DJANGO_VITE_ASSETS_PATH. Default is "manifest.json" within DJANGO_VITE_ASSETS_PATH.
# DJANGO_VITE_MANIFEST_PATH = DJANGO_VITE_ASSETS_PATH / "manifest.json" # This is the default behavior

# --- NEW/MODIFIED FOR DEVELOPMENT PATHING ---
if DEBUG:
    DJANGO_VITE_DEV_SERVER_HOST = "localhost"  # Default
    DJANGO_VITE_DEV_SERVER_PORT = 5173  # Default
    # This tells django-vite to NOT prepend any path segment like /static/
    # when generating URLs for the Vite dev server.
    # It makes the generated URL like http://localhost:5173/asset.js
    # instead of http://localhost:5173/static/asset.js
    DJANGO_VITE_STATIC_URL_PREFIX = ""
# --- END NEW/MODIFIED ---

# --- CKEditor 5 Settings ---
# (Your CKEditor settings would go here if you had them from previous discussions)
# Example (ensure you have these configurations if you use them in forms.py):
# CKEDITOR_5_CONFIGS = {
# 'default': {
# 'toolbar': ['heading', '|', 'bold', 'italic', 'link',
# 'bulletedList', 'numberedList', 'blockQuote', 'imageUpload'],
# },
# 'small': {
# 'toolbar': ['bold', 'italic', 'link', 'bulletedList'],
#         'height': 150,
# },
# }
# Add 'django_ckeditor_5.fields.CKEditor5Field' where you want to use it in models.
