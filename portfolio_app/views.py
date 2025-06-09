# portfolio_app/views.py

# --- Standard Library Imports ---
import json
import logging
import os
from rest_framework import generics
from rest_framework import serializers
from .models import Certificate
# --- Django Imports ---
from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.files.base import ContentFile
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Count, Max, Q
from django.forms import modelformset_factory
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone
from django.utils.html import strip_tags
from django.utils.text import Truncator
from django.shortcuts import render
from rest_framework import generics, serializers, viewsets
from .models import Certificate, Project

# --- Third Party Imports ---
try:
    from PIL import Image as PillowImage
except ImportError:
    PillowImage = None
    logging.warning("Pillow library not installed. Image validation will be limited.")

# --- App Imports ---
from .forms import (
    ContactForm,
    PortfolioImageManagementForm,
    StaffPortfolioProjectForm,
    StaffUserChangeForm,
)
from .models import (
    BlogCategory,
    BlogPost,
    ContactInquiry,
    PortfolioImage,
    PortfolioProject,
)

logger = logging.getLogger(__name__)


# --- Helper Functions ---
def is_staff_user(user):
    """
    Checks if a user is authenticated, active, and a staff member.
    A simplified check suitable for a personal portfolio admin area.
    """
    return user.is_authenticated and user.is_active and user.is_staff


# --- Public Site Views ---

def home(request):
    """
    Renders the homepage.
    Fetches the 3 most recent published blog posts and portfolio projects.
    """
    published_status = getattr(BlogPost, "PUBLISHED", "PUBLISHED")
    try:
        latest_blog_posts = (
            BlogPost.objects.filter(
                status=published_status,
                published_date__lte=timezone.now(),
                is_active=True,
            )
            .select_related("category", "author")
            .order_by("-published_date")[:3]
        )
    except Exception as e:
        logger.error(f"Error fetching latest blog posts for home page: {e}")
        latest_blog_posts = []

    try:
        latest_portfolio_projects = PortfolioProject.objects.filter(
            is_active=True
        ).order_by("order", "-created_at")[:3]
    except Exception as e:
        logger.error(f"Error fetching latest portfolio projects for home page: {e}")
        latest_portfolio_projects = []

    context = {
        "latest_blog_posts": latest_blog_posts,
        "latest_portfolio_projects": latest_portfolio_projects,
        "page_title": "Tony the Coder - Full-Stack Developer & AI Enthusiast",
        "meta_description": "Welcome to the portfolio of Tony the Coder. Discover projects in Python, Django, React, AI, and more.",
    }
    return render(request, "portfolio_app/home.html", context)


def about_us(request):
    """
    Renders the 'About Me' page.
    """
    context = {
        'page_title': "About Tony the Coder",
        'hero_title': "About Me",
        'hero_subtitle': "Developer, creator, and lifelong learner.",
    }
    return render(request, 'portfolio_app/about_us.html', context)


def contact_us(request):
    """
    Renders the page that will host the React contact form.
    """
    context = {
        "page_title": "Contact Tony the Coder",
        "meta_description": "Get in touch with Tony the Coder to discuss projects, collaborations, or just to say hi!",
        "breadcrumbs": [
            {"name": "Home", "url": reverse("portfolio_app:home")},
            {"name": "Contact", "is_active": True},
        ],
    }
    return render(request, "portfolio_app/contact_us.html", context)


def api_contact_submit(request):
    """
    API endpoint for the React contact form. Handles POST requests.
    """
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse(
                {"status": "success", "message": "Thank you for your message! I will be in touch soon."}
            )
        else:
            return JsonResponse({"status": "error", "errors": form.errors}, status=400)
    return JsonResponse(
        {"status": "error", "message": "Invalid request method."}, status=405
    )


# --- Blog Views ---

def blog_list(request):
    """
    Displays a list of all published blog posts and the category sidebar.
    """
    published_status = getattr(BlogPost, "PUBLISHED", "PUBLISHED")
    posts = (
        BlogPost.objects.filter(
            status=published_status, published_date__lte=timezone.now(), is_active=True
        )
        .select_related("category", "author")
        .order_by("-published_date")
    )
    categories = (
        BlogCategory.objects.filter(is_active=True)
        .annotate(
            num_posts=Count(
                "posts",
                filter=Q(
                    posts__status=published_status,
                    posts__published_date__lte=timezone.now(),
                    posts__is_active=True,
                ),
            )
        )
        .filter(num_posts__gt=0)
        .order_by("name")
    )
    context = {
        "blog_posts": posts,
        "categories_for_sidebar": categories,
        "page_title": "Tony's Tech Blog - Coding & AI Insights",
        "breadcrumbs": [
            {"name": "Home", "url": reverse("portfolio_app:home")},
            {"name": "Blog", "is_active": True},
        ],
    }
    return render(request, "portfolio_app/blog_list.html", context)


def blog_post_detail(request, slug):
    """
    Displays a single blog post and its details.
    """
    published_status = getattr(BlogPost, "PUBLISHED", "PUBLISHED")
    post = get_object_or_404(
        BlogPost.objects.select_related("category", "author"),
        slug=slug,
        status=published_status,
        published_date__lte=timezone.now(),
        is_active=True,
    )
    context = {
        "post": post,
        "page_title": post.title,
        "meta_description": (
                post.excerpt or Truncator(strip_tags(post.content)).words(25, truncate="...")
        ),
        "breadcrumbs": [
            {"name": "Home", "url": reverse("portfolio_app:home")},
            {"name": "Blog", "url": reverse("portfolio_app:blog_list")},
            {"name": Truncator(post.title).chars(40), "is_active": True},
        ],
    }
    return render(request, "portfolio_app/blog_post_detail.html", context)


def blog_category_list(request, slug):
    """
    Displays a list of blog posts filtered by a specific category.
    """
    category = get_object_or_404(BlogCategory, slug=slug, is_active=True)
    published_status = getattr(BlogPost, "PUBLISHED", "PUBLISHED")
    posts = (
        BlogPost.objects.filter(
            category=category,
            status=published_status,
            published_date__lte=timezone.now(),
            is_active=True,
        )
        .select_related("author", "category")
        .order_by("-published_date")
    )
    context = {
        "category": category,
        "blog_posts": posts,
        "page_title": f"{category.name} Posts - Tony's Tech Blog",
        "breadcrumbs": [
            {"name": "Home", "url": reverse("portfolio_app:home")},
            {"name": "Blog", "url": reverse("portfolio_app:blog_list")},
            {"name": category.name, "is_active": True},
        ],
    }
    return render(request, "portfolio_app/blog_category_list.html", context)


# --- React Portfolio View ---

def portfolio_showcase_react(request):
    """
    Renders the portfolio page and passes project data as a Python list
    to the template, letting the |json_script filter handle the conversion.
    """
    projects = PortfolioProject.objects.filter(is_active=True).order_by("order", "-created_at")

    # Prepare the data as a simple Python list of dictionaries
    projects_data = []
    for project in projects:
        projects_data.append({
            'id': project.id,
            'title': project.title,
            'description': project.short_description,
            'link': project.live_demo_url or project.github_url or '#',
            'imageUrl': project.featured_image.url if project.featured_image else None,
        })

    context = {
        "page_title": "My Coding Portfolio - Tony the Coder",
        "breadcrumbs": [
            {"name": "Home", "url": reverse("portfolio_app:home")},
            {"name": "Portfolio", "is_active": True},
        ],
        # THE FIX: Pass the Python list directly, NOT a JSON string.
        "projects_json": projects_data
    }
    return render(request, "portfolio_app/portfolio_showcase_react.html", context)


# --- Staff Portal Views ---

@login_required
@user_passes_test(is_staff_user)
def staff_dashboard(request):
    """
    Displays the main admin dashboard with key stats relevant to the portfolio.
    """
    context = {
        "page_title": "Tony the Coder - Admin Dashboard",
        "active_portfolio_projects_count": PortfolioProject.objects.filter(is_active=True).count(),
        "draft_blog_posts_count": BlogPost.objects.filter(status="DRAFT", is_active=True).count(),
        "new_inquiry_count": ContactInquiry.objects.filter(status="NEW").count(),
        "breadcrumbs": [{"name": "Admin Dashboard", "is_active": True}],
        "is_staff_portal": True,
    }
    return render(request, "portfolio_app/staff/dashboard.html", context)


@login_required
@user_passes_test(is_staff_user)
def staff_user_profile_edit(request):
    """
    Allows a staff user to edit their own profile details.
    """
    if request.method == "POST":
        form = StaffUserChangeForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, "Your profile has been updated successfully!")
            return redirect(reverse("portfolio_app:staff_dashboard"))
    else:
        form = StaffUserChangeForm(instance=request.user)
    context = {
        "page_title": "Edit My Profile",
        "form": form,
        "is_staff_portal": True,
    }
    return render(request, "portfolio_app/staff/staff_user_profile_edit.html", context)


# --- Staff Portfolio Project Management ---

@login_required
@user_passes_test(is_staff_user)
def staff_portfolio_list(request):
    """
    Displays a list of all portfolio projects for management by staff.
    """
    portfolio_items = PortfolioProject.objects.all().order_by("order", "-created_at")
    context = {
        "page_title": "Manage Coding Projects",
        "portfolio_items": portfolio_items,
        "is_staff_portal": True,
    }
    return render(request, "portfolio_app/staff/portfolio_list_staff.html", context)


@login_required
@user_passes_test(is_staff_user)
def staff_portfolio_add(request):
    """
    Handles the creation of a new portfolio project.
    """
    if request.method == "POST":
        form = StaffPortfolioProjectForm(request.POST, request.FILES)
        if form.is_valid():
            project_instance = form.save()
            messages.success(request, f'Project "{project_instance.title}" created. You can now add images.')
            return redirect(reverse("portfolio_app:staff_manage_portfolio_images", kwargs={"pk": project_instance.pk}))
    else:
        form = StaffPortfolioProjectForm()
        if "order" in form.fields:
            max_order = PortfolioProject.objects.aggregate(Max("order"))["order__max"]
            form.fields["order"].initial = (max_order or 0) + 1
    context = {
        "form": form,
        "form_title": "Add New Coding Project",
        "is_staff_portal": True,
    }
    return render(request, "portfolio_app/staff/portfolio_project_form.html", context)


@login_required
@user_passes_test(is_staff_user)
def staff_portfolio_edit(request, pk):
    """
    Handles editing an existing portfolio project.
    """
    project_instance = get_object_or_404(PortfolioProject, pk=pk)
    if request.method == "POST":
        form = StaffPortfolioProjectForm(request.POST, request.FILES, instance=project_instance)
        if form.is_valid():
            form.save()
            messages.success(request, f'Project "{project_instance.title}" updated.')
            return redirect(reverse("portfolio_app:staff_portfolio_list"))
    else:
        form = StaffPortfolioProjectForm(instance=project_instance)
    context = {
        "form": form,
        "project": project_instance,
        "form_title": f"Edit Coding Project: {project_instance.title}",
        "is_staff_portal": True,
    }
    return render(request, "portfolio_app/staff/portfolio_project_form.html", context)


@login_required
@user_passes_test(is_staff_user)
def staff_portfolio_delete(request, pk):
    """
    Handles the deletion of a portfolio project.
    """
    project = get_object_or_404(PortfolioProject, pk=pk)
    if request.method == "POST":
        project_title = project.title
        project.delete()
        messages.success(request, f'Project "{project_title}" was deleted.')
        return redirect(reverse("portfolio_app:staff_portfolio_list"))
    context = {
        "project": project,
        "is_staff_portal": True,
    }
    return render(request, "portfolio_app/staff/portfolio_project_confirm_delete.html", context)


@login_required
@user_passes_test(is_staff_user)
def staff_manage_portfolio_images(request, pk):
    """
    Manages gallery images for a project (update, delete, upload new).
    """
    project = get_object_or_404(PortfolioProject, pk=pk)
    PortfolioImageFormSet = modelformset_factory(
        PortfolioImage, form=PortfolioImageManagementForm, extra=0, can_delete=True
    )
    queryset = PortfolioImage.objects.filter(portfolio_project=project).order_by("order", "id")

    if request.method == "POST":
        formset = PortfolioImageFormSet(request.POST, request.FILES, queryset=queryset)
        if formset.is_valid():
            # Handle new image uploads first
            new_images = request.FILES.getlist('new_images')
            for uploaded_file in new_images:
                # Basic validation can be done here if needed
                PortfolioImage.objects.create(portfolio_project=project, image=uploaded_file)

            # Save changes to existing forms (updates, deletions)
            formset.save()

            messages.success(request, "Image details updated successfully!")
            # Redirect back to the same page to see changes
            return redirect(reverse("portfolio_app:staff_manage_portfolio_images", kwargs={"pk": project.pk}))
        else:
            messages.error(request, "Please correct the errors in the image forms.")
    else:
        formset = PortfolioImageFormSet(queryset=queryset)

    context = {
        "project": project,
        "formset": formset,
        "page_title": f"Manage Images for {project.title}",
        "is_staff_portal": True,
    }
    return render(request, "portfolio_app/staff/manage_portfolio_images.html", context)


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ['id', 'title', 'description', 'credential_url'] # Add other fields you need

# API view to list certificates
class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certificate.objects.all().order_by('order') # Order them by the 'order' field
    serializer_class = CertificateSerializer