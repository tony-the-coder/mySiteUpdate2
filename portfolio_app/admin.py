# portfolio_app/admin.py
from django.contrib import admin
from django import forms
from django.utils.html import mark_safe
from django.utils import timezone # Required for make_published action
from django.urls import reverse # For portfolio_project_link

from .models import (
    PortfolioCategory,
    PortfolioProject,
    PortfolioImage,
    BlogCategory,
    BlogPost,
    ContactInquiry,
    Certificate,
)
from django_ckeditor_5.widgets import CKEditor5Widget

# --- Inlines ---
class PortfolioImageInline(admin.TabularInline):
    model = PortfolioImage
    extra = 1
    fields = ('image_preview', 'image', 'caption', 'order')
    readonly_fields = ('image_preview',)
    ordering = ('order',)
    verbose_name = "Coding Project Image"
    verbose_name_plural = "Coding Project Images"

    def image_preview(self, obj):
        return obj.image_preview() # Calls the method from models.py
    image_preview.short_description = 'Preview'

    class Media:
        js = ('js/admin_image_preview.js',)


# --- Custom Forms for Admin ---
class PortfolioProjectAdminForm(forms.ModelForm):
    details = forms.CharField(
        widget=CKEditor5Widget(config_name='default'),
        required=False
    )

    class Meta:
        model = PortfolioProject
        # Using '__all__' will automatically exclude 'is_active' if it's not defined in the model.
        # If you had a specific list of fields, ensure 'is_active' is explicitly removed.
        fields = '__all__'
        widgets = {
            'categories': forms.CheckboxSelectMultiple,
            'technologies_used': forms.Textarea(attrs={'rows': 3, 'placeholder': 'Comma-separated, e.g., Python, Django, React'}),
        }

class BlogPostAdminForm(forms.ModelForm):
    content = forms.CharField(
        widget=CKEditor5Widget(config_name='default'),
        required=False
    )
    excerpt = forms.CharField(widget=forms.Textarea(attrs={'rows': 3}), required=False)

    class Meta:
        model = BlogPost
        fields = '__all__'

# --- ModelAdmins ---

@admin.register(PortfolioCategory)
class PortfolioCategoryAdmin(admin.ModelAdmin):
    # 'is_active' removed from list_display based on models.py
    list_display = ('name', 'slug', 'description')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')
    # 'is_active' removed from list_filter based on models.py
    # If there were other filters, ensure they are still here.
    list_filter = () # If no other filters, use an empty tuple

@admin.register(PortfolioProject)
class PortfolioProjectAdmin(admin.ModelAdmin):
    form = PortfolioProjectAdminForm
    # 'is_active' removed from list_display based on models.py
    list_display = ('title', 'display_categories', 'order', 'github_url', 'live_demo_url', 'created_at')
    # 'is_active' removed from list_filter based on models.py
    list_filter = ('categories', 'status')
    # 'is_active' removed from list_editable based on models.py
    list_editable = ('order',)
    prepopulated_fields = {'slug': ('title',)}
    inlines = [PortfolioImageInline]
    filter_horizontal = ('categories',)

    fieldsets = (
        (None, {
            # 'is_active' removed from fieldsets based on models.py
            'fields': ('title', 'slug', 'categories', 'order', 'status', 'year_completed')
        }),
        ('Project URLs & Tech Stack', {
            'fields': ('github_url', 'live_demo_url', 'technologies_used')
        }),
        ('Visuals & Descriptions', {
            'fields': ('featured_image', 'short_description', 'details')
        }),
    )

    def display_categories(self, obj):
        return ", ".join([cat.name for cat in obj.categories.all()])
    display_categories.short_description = "Categories"


@admin.register(PortfolioImage)
class PortfolioImageAdmin(admin.ModelAdmin):
    list_display = ('image_preview', 'portfolio_project_link', 'caption', 'order', 'uploaded_at')
    list_filter = ('portfolio_project__title',)
    search_fields = ('caption', 'portfolio_project__title')
    list_editable = ('caption', 'order')
    list_per_page = 20
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        return obj.image_preview()
    image_preview.short_description = 'Image Preview'

    def portfolio_project_link(self, obj):
        if obj.portfolio_project:
            link = reverse("admin:portfolio_app_portfolioproject_change", args=[obj.portfolio_project.id])
            return mark_safe(f'<a href="{link}">{obj.portfolio_project.title}</a>')
        return None
    portfolio_project_link.short_description = 'Portfolio Project'
    portfolio_project_link.admin_order_field = 'portfolio_project'


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active', 'description') # 'is_active' is valid for BlogCategory
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')
    list_filter = ('is_active',) # 'is_active' is valid for BlogCategory

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    list_display = ('title', 'category', 'status', 'published_date', 'author_name', 'is_active')
    list_filter = ('status', 'category', 'is_active', 'author')
    search_fields = ('title', 'content', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'
    actions = ['make_published', 'make_draft']
    autocomplete_fields = ['author', 'category']

    def author_name(self, obj):
        if obj.author:
            return obj.author.get_full_name() or obj.author.username
        return None
    author_name.short_description = 'Author'
    author_name.admin_order_field = 'author'

    def save_model(self, request, obj, form, change):
        if not obj.author_id:
            obj.author = request.user
        super().save_model(request, obj, form, change)

    def make_published(self, request, queryset):
        # CORRECTED: Use string literal for 'PUBLISHED'
        queryset.update(status='PUBLISHED', published_date=timezone.now())
    make_published.short_description = "Mark selected posts as Published"

    def make_draft(self, request, queryset):
        # CORRECTED: Use string literal for 'DRAFT'
        queryset.update(status='DRAFT')
    make_draft.short_description = "Mark selected posts as Draft"


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'status', 'submitted_at')
    list_filter = ('status', 'submitted_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name','email','phone_number','subject','message','submitted_at', 'updated_at')
    fields = ('name', 'email', 'phone_number', 'subject', 'message', 'status', 'internal_notes', 'submitted_at', 'updated_at')


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuing_body', 'issue_date', 'order', 'credential_url', 'image_preview')
    list_editable = ('order',)
    search_fields = ('title', 'description', 'issuing_body')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image and hasattr(obj.image, 'url'):
            return mark_safe(f'<img src="{obj.image.url}" width="150" height="auto" style="max-height: 100px; object-fit: contain;" />')
        return "(No image)"
    image_preview.short_description = 'Image Preview'