import random
from django import template

register = template.Library()

@register.filter(name='random_percentage')
def random_percentage(value):
    """
    Returns a random integer between 0 and 100.
    The 'value' is not used but is required for a filter.
    """
    return random.randint(0, 100)

@register.filter(name='random_float')
def random_float(value, args):
    """
    Returns a random float between two numbers.
    Expects arguments in 'min:max' format.
    Example: {{ some_value|random_float:"1.5:5.5" }}
    """
    try:
        min_val, max_val = map(float, args.split(':'))
        return round(random.uniform(min_val, max_val), 2)
    except (ValueError, TypeError):
        return 0.0