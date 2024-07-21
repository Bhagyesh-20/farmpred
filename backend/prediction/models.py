from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('fruit', 'Fruit'),
        ('vegetable', 'Vegetable'),
        ('grain', 'Grain'),
        ('equipment', 'Equipment'),  # Add Equipment category
    ]
    AVAILABILITY_CHOICES = [
        ('buy', 'Buy'),
        ('rent', 'Rent'),
    ]

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='equipment')  # Default to equipment
    price = models.DecimalField(max_digits=10, decimal_places=2)
    available_for = models.CharField(max_length=10, choices=AVAILABILITY_CHOICES, default='rent')  # Default to rent

    def __str__(self):
        return self.name


class Order(models.Model):
    ORDER_TYPE_CHOICES = [
        ('buy', 'Buy'),
        ('rent', 'Rent'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    order_date = models.DateTimeField(auto_now_add=True)
    order_type = models.CharField(max_length=4, choices=ORDER_TYPE_CHOICES)
    rental_duration_days = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.product.name} ({self.quantity}) - {self.user.email} - {self.get_order_type_display()}"

    def clean(self):
        # Ensure that the order type matches the product's availability
        if self.order_type == 'buy' and self.product.availability not in ['buy', 'both']:
            raise ValueError(f"The product {self.product.name} is not available for buying.")
        if self.order_type == 'rent' and self.product.availability not in ['rent', 'both']:
            raise ValueError(f"The product {self.product.name} is not available for renting.")

    def save(self, *args, **kwargs):
        self.clean()  # Ensure clean method is called before saving
        if self.order_type == 'buy':
            self.rental_duration_days = None
        super().save(*args, **kwargs)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

