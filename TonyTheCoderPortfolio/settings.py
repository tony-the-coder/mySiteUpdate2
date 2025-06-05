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
print(f"DJANGO DEBUG IS: {DEBUG}")

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
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"  # This remains important

# Directories where Django will look for static files additionally to app's 'static/' dirs
STATICFILES_DIRS = [
    BASE_DIR / "assets",
    BASE_DIR / "static",   # Vite will build into a 'vite' subfolder here for production collection
]

# This is where `collectstatic` will gather all static files for deployment.
STATIC_ROOT = BASE_DIR / "staticfiles_collected"

# Media files (User-uploaded content)
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- Authentication Settings ---
LOGIN_URL = "/accounts/login/"
LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/"

# --- Django-Vite Settings ---
DJANGO_VITE_DEV_MODE = (
    DEBUG  # Enables Vite HMR and dev server proxying if DEBUG is True
)

# Path where Vite generates assets to (relative to BASE_DIR or absolute) for `collectstatic_vite`
DJANGO_VITE_ASSETS_PATH = BASE_DIR / "assets" / "vite"

# Root directory of your Vite project (where package.json and vite.config.js are)
DJANGO_VITE_APP_DIR = BASE_DIR / "reactland"
print(f"DJANGO_VITE_APP_DIR IS SET TO: '{DJANGO_VITE_APP_DIR}'")

# Vite Dev Server connection settings
DJANGO_VITE_DEV_SERVER_HOST = "localhost"
DJANGO_VITE_DEV_SERVER_PORT = 5173

if DEBUG:
    # Workaround: Make Django-Vite prepend /static/ to match Vite dev server base if Vite is also configured to serve from /static/
    DJANGO_VITE_STATIC_URL_PREFIX = "/static/"
    print(
        f"DJANGO_VITE_STATIC_URL_PREFIX IS SET TO: '{DJANGO_VITE_STATIC_URL_PREFIX}' (Vite dev workaround)"
    )
else:
    # For production, assets are served from a subfolder of STATIC_URL (e.g., /static/vite/)
    # This prefix should match the `base` in your Vite config's production build.
    DJANGO_VITE_STATIC_URL_PREFIX = (
        "vite/"  # Assuming Vite's `build.base` is `/static/vite/`
    )
    print(
        f"DJANGO_VITE_STATIC_URL_PREFIX IS SET TO: '{DJANGO_VITE_STATIC_URL_PREFIX}' (Production)"
    )


# --- CKEditor 5 Settings ---
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
