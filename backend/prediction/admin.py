from django.contrib import admin
from .models import User, Profile,Product,Order

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']
    search_fields = ['username', 'email']
    list_filter = ['is_staff', 'is_superuser', 'is_active']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name', 'verified']
    list_editable = ['verified']
    search_fields = ['user__username', 'full_name']
    list_filter = ['verified']

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'available_for']
    search_fields = ['name', 'category']
    list_filter = ['category', 'available_for']

class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'product', 'quantity', 'order_type', 'order_date', 'rental_duration_days']
    search_fields = ['user__email', 'product__name']
    list_filter = ['order_type', 'order_date']
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)