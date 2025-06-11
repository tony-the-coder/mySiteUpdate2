# portfolio_app/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.urls import reverse_lazy, reverse
from django.conf import settings
from django.views.decorators.http import require_POST
from django.http import JsonResponse, Http404

from django.utils import timezone # ADDED: Import timezone
import json # ADDED: Import json module

from .models import (
    PortfolioCategory,
    PortfolioProject,
    PortfolioImage,
    BlogCategory,
    BlogPost,
    ContactInquiry,
    Certificate,
)
from .forms import ContactForm, PortfolioProjectForm, PortfolioImageForm, BlogPostForm


# --- Helper functions for access control (similar to your existing auth_extras)
def is_staff_member(user):
    return user.is_active and user.is_staff

def is_superuser(user):
    return user.is_active and user.is_superuser

# --- Public Site Views ---

def home_view(request):
    featured_projects = PortfolioProject.objects.filter(is_active=True).order_by('order')[:3]
    recent_blog_posts = BlogPost.objects.filter(status='PUBLISHED', is_active=True, published_date__lte=timezone.now()).order_by('-published_date')[:3]
    context = {
        'featured_projects': featured_projects,
        'recent_blog_posts': recent_blog_posts,
    }
    return render(request, 'portfolio_app/home.html', context)


def about_us_view(request):
    context = {}
    return render(request, 'portfolio_app/about_us.html', context)


def services_view(request):
    return render(request, 'portfolio_app/services.html')


def portfolio_list_view(request):
    projects = PortfolioProject.objects.filter(is_active=True).order_by('order', '-created_at')

    # Format project data for JavaScript consumption
    projects_data = []
    for project in projects:
        projects_data.append({
            'id': project.id,
            'title': project.title,
            'description': project.short_description,
            'link': project.get_absolute_url(),
            'imageUrl': project.get_first_image_url() if project.get_first_image_url() else ''
        })

    context = {
        'projects_json': json.dumps(projects_data)
    }
    return render(request, 'portfolio_app/portfolio_showcase_react.html', context)


def portfolio_project_detail_view_django(request, slug):
    project = get_object_or_404(PortfolioProject, slug=slug, is_active=True)
    related_projects = PortfolioProject.objects.filter(
        Q(categories__in=project.categories.all()) | Q(technologies_used__icontains=project.technologies_used.split(',')[0].strip())
    ).exclude(id=project.id).filter(is_active=True).distinct().order_by('?')[:3]

    context = {
        'project': project,
        'related_projects': related_projects,
    }
    return render(request, 'portfolio_app/portfolio_project_detail_django.html', context)


def portfolio_projects_by_category_view(request, category_slug):
    category = get_object_or_404(PortfolioCategory, slug=category_slug, is_active=True)
    projects = category.portfolio_projects.filter(is_active=True).order_by('order', '-created_at')

    page = request.GET.get('page', 1)
    paginator = Paginator(projects, 9)
    try:
        paginated_projects = paginator.page(page)
    except PageNotAnInteger:
        paginated_projects = paginator.page(1)
    except EmptyPage:
        paginated_projects = paginator.page(paginator.num_pages)

    context = {
        'category': category,
        'projects': paginated_projects,
    }
    return render(request, 'portfolio_app/portfolio_category_projects.html', context)


def blog_list_view(request):
    posts = BlogPost.objects.filter(status='PUBLISHED', is_active=True, published_date__lte=timezone.now()).order_by('-published_date')
    categories = BlogCategory.objects.filter(is_active=True).order_by('name')

    page = request.GET.get('page', 1)
    paginator = Paginator(posts, 5)
    try:
        paginated_posts = paginator.page(page)
    except PageNotAnInteger:
        paginated_posts = paginator.page(1)
    except EmptyPage:
        paginated_posts = paginator.page(paginator.num_pages)

    context = {
        'posts': paginated_posts,
        'categories': categories,
    }
    return render(request, 'portfolio_app/blog_list.html', context)


def blog_post_detail_view(request, slug):
    post = get_object_or_404(BlogPost, slug=slug, status='PUBLISHED', is_active=True, published_date__lte=timezone.now())
    recent_posts = BlogPost.objects.filter(status='PUBLISHED', is_active=True, published_date__lte=timezone.now()).exclude(slug=slug).order_by('-published_date')[:3]
    context = {
        'post': post,
        'recent_posts': recent_posts,
    }
    return render(request, 'portfolio_app/blog_post_detail.html', context)


def blog_category_list_view(request, slug):
    category = get_object_or_404(BlogCategory, slug=slug, is_active=True)
    posts = BlogPost.objects.filter(category=category, status='PUBLISHED', is_active=True, published_date__lte=timezone.now()).order_by('-published_date')

    page = request.GET.get('page', 1)
    paginator = Paginator(posts, 5)
    try:
        paginated_posts = paginator.page(page)
    except PageNotAnInteger:
        paginated_posts = paginator.page(1)
    except EmptyPage:
        paginated_posts = paginator.page(paginator.num_pages)

    context = {
        'category': category,
        'posts': paginated_posts,
    }
    return render(request, 'portfolio_app/blog_category_list.html', context)


def contact_us_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your inquiry has been sent successfully! We will get back to you soon.')
            return redirect('portfolio_app:contact_us')
        else:
            messages.error(request, 'There was an error with your submission. Please correct the highlighted fields.')
    else:
        form = ContactForm()
    return render(request, 'portfolio_app/contact_us.html', {'form': form})


# --- Staff Portal Views ---
@login_required
@user_passes_test(is_staff_member)
def staff_dashboard_view(request):
    total_inquiries = ContactInquiry.objects.count()
    new_inquiries = ContactInquiry.objects.filter(status='NEW').count()
    total_projects = PortfolioProject.objects.count()
    total_blog_posts = BlogPost.objects.count()
    draft_blog_posts = BlogPost.objects.filter(status='DRAFT').count()

    context = {
        'total_inquiries': total_inquiries,
        'new_inquiries': new_inquiries,
        'total_projects': total_projects,
        'total_blog_posts': total_blog_posts,
        'draft_blog_posts': draft_blog_posts,
    }
    return render(request, 'portfolio_app/staff/dashboard.html', context)


@login_required
@user_passes_test(is_staff_member)
def portfolio_list_staff_view(request):
    projects = PortfolioProject.objects.all().order_by('order', '-created_at')
    context = {'projects': projects}
    return render(request, 'portfolio_app/staff/portfolio_list_staff.html', context)


@login_required
@user_passes_test(is_staff_member)
def portfolio_project_detail_staff_view(request, slug):
    project = get_object_or_404(PortfolioProject, slug=slug)
    context = {'project': project}
    return render(request, 'portfolio_app/staff/portfolio_project_detail_staff.html', context)


@login_required
@user_passes_test(is_staff_member)
def portfolio_project_create_view(request):
    if request.method == 'POST':
        form = PortfolioProjectForm(request.POST, request.FILES)
        if form.is_valid():
            project = form.save()
            messages.success(request, f'Project "{project.title}" created successfully!')
            return redirect('portfolio_app:portfolio_project_detail_staff', slug=project.slug)
        else:
            messages.error(request, 'Error creating project. Please check the form.')
    else:
        form = PortfolioProjectForm()
    return render(request, 'portfolio_app/staff/portfolio_project_form.html', {'form': form})


@login_required
@user_passes_test(is_staff_member)
def portfolio_project_update_view(request, slug):
    project = get_object_or_404(PortfolioProject, slug=slug)
    if request.method == 'POST':
        form = PortfolioProjectForm(request.POST, request.FILES, instance=project)
        if form.is_valid():
            project = form.save()
            messages.success(request, f'Project "{project.title}" updated successfully!')
            return redirect('portfolio_app:portfolio_project_detail_staff', slug=project.slug)
        else:
            messages.error(request, 'Error updating project. Please check the form.')
    else:
        form = PortfolioProjectForm(instance=project)
    return render(request, 'portfolio_app/staff/portfolio_project_form.html', {'form': form, 'project': project})


@login_required
@user_passes_test(is_staff_member)
def portfolio_project_delete_view(request, slug):
    project = get_object_or_404(PortfolioProject, slug=slug)
    if request.method == 'POST':
        project.delete()
        messages.success(request, f'Project "{project.title}" deleted successfully.')
        return redirect('portfolio_app:portfolio_list_staff')
    return render(request, 'portfolio_app/staff/portfolio_project_confirm_delete.html', {'project': project})


@login_required
@user_passes_test(is_staff_member)
def manage_portfolio_images_view(request, slug):
    project = get_object_or_404(PortfolioProject, slug=slug)
    if request.method == 'POST':
        form = PortfolioImageForm(request.POST, request.FILES)
        if form.is_valid():
            image = form.save(commit=False)
            image.portfolio_project = project
            image.save()
            messages.success(request, 'Image added successfully!')
            return redirect('portfolio_app:manage_portfolio_images', slug=project.slug)
        else:
            messages.error(request, 'Error adding image. Please check the form.')
    else:
        form = PortfolioImageForm()
    context = {
        'project': project,
        'images': project.images.all().order_by('order'),
        'form': form
    }
    return render(request, 'portfolio_app/staff/manage_portfolio_images.html', context)


@login_required
@user_passes_test(is_staff_member)
@require_POST
def delete_portfolio_image_view(request, pk):
    try:
        image = PortfolioImage.objects.get(pk=pk)
        project_slug = image.portfolio_project.slug
        image.delete()
        messages.success(request, 'Image deleted successfully.')
        return JsonResponse({'status': 'success', 'redirect_url': reverse('portfolio_app:manage_portfolio_images', kwargs={'slug': project_slug})})
    except PortfolioImage.DoesNotExist:
        messages.error(request, 'Image not found.')
        return JsonResponse({'status': 'error', 'message': 'Image not found.'}, status=404)
    except Exception as e:
        messages.error(request, f'Error deleting image: {e}')
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


@login_required
@user_passes_test(is_staff_member)
def blog_post_list_staff_view(request):
    posts = BlogPost.objects.all().order_by('-created_at')
    context = {'posts': posts}
    return render(request, 'portfolio_app/staff/blog_post_list_staff.html', context)

@login_required
@user_passes_test(is_staff_member)
def blog_post_create_view(request):
    if request.method == 'POST':
        form = BlogPostForm(request.POST, request.FILES)
        if form.is_valid():
            blog_post = form.save(commit=False)
            if not blog_post.author: # Assign current user as author if not set
                blog_post.author = request.user
            blog_post.save()
            messages.success(request, f'Blog post "{blog_post.title}" created successfully!')
            return redirect('portfolio_app:blog_post_detail_staff', slug=blog_post.slug)
        else:
            messages.error(request, 'Error creating blog post. Please check the form.')
    else:
        form = BlogPostForm()
    return render(request, 'portfolio_app/staff/blog_post_form.html', {'form': form})

@login_required
@user_passes_test(is_staff_member)
def blog_post_update_view(request, slug):
    blog_post = get_object_or_404(BlogPost, slug=slug)
    if request.method == 'POST':
        form = BlogPostForm(request.POST, request.FILES, instance=blog_post)
        if form.is_valid():
            blog_post = form.save()
            messages.success(request, f'Blog post "{blog_post.title}" updated successfully!')
            return redirect('portfolio_app:blog_post_detail_staff', slug=blog_post.slug)
        else:
            messages.error(request, 'Error updating blog post. Please check the form.')
    else:
        form = BlogPostForm(instance=blog_post)
    return render(request, 'portfolio_app/staff/blog_post_form.html', {'form': form, 'blog_post': blog_post})

@login_required
@user_passes_test(is_staff_member)
def blog_post_detail_staff_view(request, slug):
    post = get_object_or_404(BlogPost, slug=slug)
    context = {'post': post}
    return render(request, 'portfolio_app/staff/blog_post_detail_staff.html', context)


@login_required
@user_passes_test(is_staff_member)
def blog_post_delete_view(request, slug):
    post = get_object_or_404(BlogPost, slug=slug)
    if request.method == 'POST':
        post.delete()
        messages.success(request, f'Blog post "{post.title}" deleted successfully.')
        return redirect('portfolio_app:blog_post_list_staff')
    return render(request, 'portfolio_app/staff/blog_post_confirm_delete.html', {'post': post})


@login_required
@user_passes_test(is_staff_member)
def contact_inquiry_list_view(request):
    inquiries = ContactInquiry.objects.all().order_by('-submitted_at')
    context = {'inquiries': inquiries}
    return render(request, 'portfolio_app/staff/contact_inquiry_list.html', context)

@login_required
@user_passes_test(is_staff_member)
def contact_inquiry_detail_view(request, pk):
    inquiry = get_object_or_404(ContactInquiry, pk=pk)
    # Mark as read if it was new
    if inquiry.status == 'NEW':
        inquiry.status = 'READ'
        inquiry.save()
    context = {'inquiry': inquiry}
    return render(request, 'portfolio_app/staff/contact_inquiry_detail.html', context)

@login_required
@user_passes_test(is_staff_member)
def contact_inquiry_update_status_view(request, pk):
    inquiry = get_object_or_404(ContactInquiry, pk=pk)
    if request.method == 'POST':
        new_status = request.POST.get('status')
        if new_status and new_status in [choice[0] for choice in inquiry.STATUS_CHOICES]:
            inquiry.status = new_status
            inquiry.save()
            messages.success(request, f'Inquiry status updated to "{inquiry.get_status_display()}".')
        else:
            messages.error(request, 'Invalid status provided.')
    return redirect('portfolio_app:contact_inquiry_detail', pk=pk)

@login_required
@user_passes_test(is_staff_member)
def contact_inquiry_delete_view(request, pk):
    inquiry = get_object_or_404(ContactInquiry, pk=pk)
    if request.method == 'POST':
        inquiry.delete()
        messages.success(request, 'Contact inquiry deleted successfully.')
        return redirect('portfolio_app:contact_inquiry_list')
    return render(request, 'portfolio_app/staff/contact_inquiry_confirm_delete.html', {'inquiry': inquiry})