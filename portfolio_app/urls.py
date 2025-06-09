# portfolio_app/urls.py
from django.urls import path, include
from rest_framework import routers #
from . import views #

app_name = 'portfolio_app' #

router = routers.DefaultRouter() #
router.register(r'certificates', views.CertificateViewSet) # Corrected: Register the ViewSet from views.py

urlpatterns = [
    # --- Public Site URLs ---
    path('', views.home, name='home'), #
    path('about/', views.about_us, name='about_us'), #
    path('contact/', views.contact_us, name='contact_us'), #
    path('portfolio/', views.portfolio_showcase_react, name='portfolio_showcase_react'), #

    # --- Blog URLs ---
    path('blog/', views.blog_list, name='blog_list'), #
    path('blog/post/<slug:slug>/', views.blog_post_detail, name='blog_post_detail'), #
    path('blog/category/<slug:slug>/', views.blog_category_list, name='blog_category_list'), #

    # --- API URLs ---
    path('api/contact-submit/', views.api_contact_submit, name='api_contact_submit'), #
    path('api/', include(router.urls)), # Corrected: Include DRF router URLs for /api/certificates/

    # --- Staff Portal URLs ---
    path('staff/', views.staff_dashboard, name='staff_dashboard'), #
    path('staff/profile/edit/', views.staff_user_profile_edit, name='staff_user_profile_edit'), #

    # --- Staff Portfolio Project Management URLs ---
    path('staff/portfolio/', views.staff_portfolio_list, name='staff_portfolio_list'), #
    path('staff/portfolio/add/', views.staff_portfolio_add, name='staff_portfolio_add'), #
    path('staff/portfolio/<int:pk>/edit/', views.staff_portfolio_edit, name='staff_portfolio_edit'), #
    path('staff/portfolio/<int:pk>/delete/', views.staff_portfolio_delete, name='staff_portfolio_delete'), #
    path('staff/portfolio/<int:pk>/images/', views.staff_manage_portfolio_images, name='staff_manage_portfolio_images'), #
]