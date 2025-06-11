# portfolio_app/forms.py
from django import forms
from django_ckeditor_5.widgets import CKEditor5Widget
from .models import ContactInquiry, PortfolioProject, PortfolioImage, BlogPost


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactInquiry
        fields = ['name', 'email', 'phone_number', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Your Name'}),
            'email': forms.EmailInput(attrs={'class': 'form-input', 'placeholder': 'Your Email'}),
            'phone_number': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Phone (Optional)'}),
            'subject': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Subject'}),
            'message': forms.Textarea(attrs={'class': 'form-textarea', 'rows': 5, 'placeholder': 'Your Message'}),
        }
        labels = {
            'phone_number': 'Phone Number',
        }


class PortfolioProjectForm(forms.ModelForm):
    details = forms.CharField(widget=CKEditor5Widget(config_name='default'))

    class Meta:
        model = PortfolioProject
        fields = [
            'title', 'slug', 'categories', 'featured_image', 'short_description',
            'details', 'technologies_used', 'github_url', 'live_demo_url',
            'order', 'status', 'year_completed',  # REMOVED: 'is_active'
        ]
        widgets = {
            'categories': forms.CheckboxSelectMultiple(attrs={'class': 'form-checkbox-multiple'}),
            'short_description': forms.Textarea(attrs={'rows': 3, 'class': 'form-textarea'}),
            'technologies_used': forms.TextInput(
                attrs={'class': 'form-input', 'placeholder': 'Comma-separated, e.g., Python, Django, React'}),
            'github_url': forms.URLInput(
                attrs={'class': 'form-input', 'placeholder': 'https://github.com/your-project'}),
            'live_demo_url': forms.URLInput(attrs={'class': 'form-input', 'placeholder': 'https://live-demo.com'}),
            'year_completed': forms.NumberInput(attrs={'class': 'form-input', 'placeholder': 'YYYY'}),
        }
        help_texts = {
            'slug': 'Leave blank to auto-generate from title. Must be unique.',
        }


class PortfolioImageForm(forms.ModelForm):
    class Meta:
        model = PortfolioImage
        fields = ['image', 'caption', 'order']
        widgets = {
            'caption': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Image caption'}),
            'order': forms.NumberInput(attrs={'class': 'form-input'}),
        }


class BlogPostForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditor5Widget(config_name='default'))

    class Meta:
        model = BlogPost
        fields = [
            'title', 'slug', 'category', 'featured_image', 'excerpt',
            'content', 'status', 'author', 'published_date', 'is_active'
        ]
        widgets = {
            'excerpt': forms.Textarea(attrs={'rows': 3, 'class': 'form-textarea'}),
            'published_date': forms.DateTimeInput(attrs={'type': 'datetime-local', 'class': 'form-input'}),
        }
        help_texts = {
            'slug': 'Leave blank to auto-generate from title. Must be unique.',
            'published_date': 'Set date/time to make post live. If blank, auto-sets on publish.',
        }