from django.contrib import admin
from .models import User, Profile

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']
    search_fields = ['username', 'email']
    list_filter = ['is_staff', 'is_superuser', 'is_active']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'full_name', 'verified']
    list_editable = ['verified']
    search_fields = ['user__username', 'full_name']
    list_filter = ['verified']


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)