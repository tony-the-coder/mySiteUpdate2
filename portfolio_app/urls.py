# portfolio_app/urls.py
from django.urls import path
from . import views # Your regular Django views
from portfolio_app.api.views import CertificateViewSet # CORRECTED: Import from api.views

app_name = 'portfolio_app'

urlpatterns = [
    # Public Site Views
    path('', views.home_view, name='home'),
    path('about/', views.about_us_view, name='about_us'),
    path('services/', views.services_view, name='services'),
    path('portfolio/', views.portfolio_list_view, name='portfolio_list'), # React-powered list
    path('portfolio/<slug:slug>/', views.portfolio_project_detail_view_django, name='portfolio_project_detail_django'),
    path('portfolio/category/<slug:category_slug>/', views.portfolio_projects_by_category_view, name='portfolio_projects_by_category'),
    path('blog/', views.blog_list_view, name='blog_list'),
    path('blog/<slug:slug>/', views.blog_post_detail_view, name='blog_post_detail'),
    path('blog/category/<slug:slug>/', views.blog_category_list_view, name='blog_category_list'),
    path('contact/', views.contact_us_view, name='contact_us'),

    # Staff/Admin-like Views
    path('staff/dashboard/', views.staff_dashboard_view, name='staff_dashboard'),
    path('staff/portfolio/', views.portfolio_list_staff_view, name='portfolio_list_staff'),
    path('staff/portfolio/create/', views.portfolio_project_create_view, name='portfolio_project_create'),
    path('staff/portfolio/<slug:slug>/', views.portfolio_project_detail_staff_view, name='portfolio_project_detail_staff'),
    path('staff/portfolio/<slug:slug>/update/', views.portfolio_project_update_view, name='portfolio_project_update'),
    path('staff/portfolio/<slug:slug>/delete/', views.portfolio_project_delete_view, name='portfolio_project_delete'),
    path('staff/portfolio/<slug:slug>/images/', views.manage_portfolio_images_view, name='manage_portfolio_images'),
    path('staff/portfolio/images/<int:pk>/delete/', views.delete_portfolio_image_view, name='delete_portfolio_image'),

    path('staff/blog/', views.blog_post_list_staff_view, name='blog_post_list_staff'),
    path('staff/blog/create/', views.blog_post_create_view, name='blog_post_create'),
    path('staff/blog/<slug:slug>/', views.blog_post_detail_staff_view, name='blog_post_detail_staff'),
    path('staff/blog/<slug:slug>/update/', views.blog_post_update_view, name='blog_post_update'),
    path('staff/blog/<slug:slug>/delete/', views.blog_post_delete_view, name='blog_post_delete'),

    path('staff/inquiries/', views.contact_inquiry_list_view, name='contact_inquiry_list'),
    path('staff/inquiries/<int:pk>/', views.contact_inquiry_detail_view, name='contact_inquiry_detail'),
    path('staff/inquiries/<int:pk>/update_status/', views.contact_inquiry_update_status_view, name='contact_inquiry_update_status'),
    path('staff/inquiries/<int:pk>/delete/', views.contact_inquiry_delete_view, name='contact_inquiry_delete'),

    # You were trying to add this directly here, but it should be handled in TonyTheCoderPortfolio/urls.py
    # path('certificates/', CertificateViewSet.as_view({'get': 'list'}), name='certificate-list'),
]