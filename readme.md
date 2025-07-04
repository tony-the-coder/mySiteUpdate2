# Home of Tony the Coder - Django Web Application

## Project Overview

This project is a custom web application built with Django. It serves as both a public-facing website to showcase projects and a comprehensive internal portal system for staff to manage project-related information and customer interactions.

The goal was to create a professional online presence and provide tools to streamline internal workflows, with planned integration for reading key financial data from QuickBooks Online (though this can be adapted or removed).

**Note:** This repository reflects the state of development as of {{ CURRENT_DATE }}. The QuickBooks Online API integration for reading financial data is planned but not yet implemented; current financial displays use placeholder data from the local database. This project can serve as a robust template for similar business needs.

## Key Features (Implemented)

### Public Website:
* **Homepage:** Introduces the entity/portfolio and showcases testimonials.
* **About Us:** Placeholder page for company/personal information.
* **Portfolio:**
    * Displays completed projects in a responsive grid layout.
    * Uses featured images with consistent aspect ratios via Tailwind CSS.
    * Dedicated detail page for each project, showing description, category, and a gallery of images.
    * Integrated **PhotoSwipe v5 lightbox** for viewing high-resolution gallery images with touch support.
* **Blog:** Fully functional blog with categories, post detail views, and filtering by category. Supports Draft/Published status.
* **Contact Form:** Allows visitors to send inquiries, which are saved to the database (`ContactInquiry` model).

### Staff Portal (`/staff/...`):
* **Role-Based Access:** Secured section accessible only to logged-in users belonging to the `OfficeStaff` group (using Django's auth system and `@user_passes_test`).
* **Dashboard:** Landing page displaying key counts (Active Customers, Active Projects, New Inquiries).
* **Customer Management:** List and Detail views for customer records. Detail page includes associated projects (internal tracking), documents, and an activity log.
* **Project Management (Internal):** List and Detail views for internal project tracking records (linked to customers). Detail page includes associated budget items (cost items), documents, and an activity log.
* **Activity Log:** Allows staff to add timestamped notes (e.g., calls, emails, meetings) linked to customers or projects for internal communication history.
* **Portfolio Management:**
    * Interface for staff to **Add** and **Edit** public-facing portfolio projects (`PortfolioProject`).
    * Uses **CKEditor** for rich text editing of project details.
    * Features **inline formset** for managing gallery images (`PortfolioImage`) directly within the project form.
    * Includes **client-side JavaScript preview** for gallery images selected *before* saving.
    * Supports image captions and ordering.
* **Clean UI:** Uses a distinct sidebar navigation layout for the staff portal, extending the main site's base template.

### Backend & Admin:
* **Django Admin:** Customized for managing all core models (Customers, Projects, Portfolio items, Blog posts, etc.).
    * Includes inline editing for Portfolio Gallery images.
    * Uses CKEditor for `PortfolioProject.details`.
    * Displays image previews directly in the admin for `PortfolioImage` records.
* **Models:** Well-structured database models representing key business entities and their relationships (see `models.py`).
* **Forms:** Uses Django ModelForms and `inlineformset_factory` for data creation/editing in the Staff Portal.
* **Media Handling:** Configured to handle user-uploaded files (images, documents) correctly during development, storing them in organized directories.
* **Secret Management:** Uses `.env` file and `python-dotenv` for secure handling of API keys and `SECRET_KEY`.

## Tech Stack

* **Backend:** Python 3.12, Django 5.2
* **Database:** SQLite (Development), PostgreSQL (Planned for Production)
* **Frontend:** HTML5, Tailwind CSS v3+
* **JavaScript:** Alpine.js (for dropdowns, modals), HTMX (included, minimal use currently), PhotoSwipe v5 (gallery lightbox via CDN), Custom JavaScript (for admin/staff image previews)
* **Text Editor:** CKEditor (via `django-ckeditor`)
* **Image Handling:** Pillow
* **Environment Variables:** `python-dotenv`

## Setup and Installation (Development)

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd [your-project-directory-name]
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    # Windows
    .\.venv\Scripts\activate
    # macOS/Linux
    source .venv/bin/activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Create `.env` file:** Create a `.env` file in the project root (where `manage.py` is). Add necessary secrets (copy structure from `.env.example` if provided, or see `settings.py`):
    ```dotenv
    DJANGO_SECRET_KEY='your_strong_secret_key_here'
    DJANGO_DEBUG=True
    # Add QBO Sandbox keys if testing API connection setup (optional)
    # QBO_CLIENT_ID='YOUR_SANDBOX_CLIENT_ID'
    # QBO_CLIENT_SECRET='YOUR_SANDBOX_CLIENT_SECRET'
    # QBO_SANDBOX_REDIRECT_URI='http://localhost:8000/qbo/callback/'
    # QBO_ENVIRONMENT='sandbox'
    ```
    **IMPORTANT:** Add `.env` to your `.gitignore` file!
5.  **Apply Migrations:**
    ```bash
    python manage.py migrate
    ```
6.  **Create Superuser (for Admin access):**
    ```bash
    python manage.py createsuperuser
    ```
7.  **Run Tailwind CSS Build (if needed):** Ensure your Tailwind `output.css` is generated/updated based on the classes used in templates. If using the provided `package.json` scripts:
    ```bash
    npm install # If you haven't already
    npm run build:css # For a one-time build
    # or
    npm run watch:css # To watch for changes during development (run in a separate terminal)
    ```
8.  **Run Development Server:**
    ```bash
    python manage.py runserver
    ```
9.  **Access:**
    * Public Site: `http://127.0.0.1:8000/`
    * Admin: `http://127.0.0.1:8000/admin/` (Login with superuser)
    * Staff Portal: Requires creating an `OfficeStaff` group in Admin, creating a user (set "Staff status" if they need admin login too), assigning the user to the group, then logging in (via `/accounts/login/`) and accessing `/staff/dashboard/`.

## Current Status & Known Issues

* Core public site structure and Staff Portal CRUD for Portfolio Items are functional using the local database.
* **QuickBooks Online data synchronization is not yet implemented.** Financial figures displayed (e.g., Project Budget/Actuals) are placeholders based on local `Project`, `CostItem`, and `Expense` models. This feature can be adapted or removed based on new project requirements.
* Staff portal may require "Add another" JavaScript functionality for dynamically adding more than the initial gallery image slots if not using Django admin's default capabilities for inline formsets.
* Styling is functional but may require refinement based on final design decisions for its new purpose.

## Future Plans (Adaptable for New Project Goals)

* Implement QBO API integration (OAuth2) if financial data linking is still relevant.
* Build out the secure Customer Portal section (if applicable).
* Implement role-based login redirects (Staff vs. Customer, or other roles).
* Add video walkthrough embedding to Portfolio Detail pages.
* Enhance dynamic "Add another" functionality for inline gallery images in the Staff Portal form if needed.
* Implement a Rich Text Editor for the Blog `content` field (CKEditor is already used for Portfolio, can be extended).
* Refine overall site styling and responsiveness.
* Add Portfolio filtering by Category/Style.
* Deploy to a production environment (e.g., Hostinger VPS) using Gunicorn/Nginx and PostgreSQL.