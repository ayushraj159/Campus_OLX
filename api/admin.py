from django.contrib import admin
from .models import Product, ProductImage
 
class PostImageAdmin(admin.StackedInline):
    model = ProductImage
 
@admin.register(Product)
class PostAdmin(admin.ModelAdmin):
    inlines = [PostImageAdmin]
 
    class Meta:
       model = Product
 
@admin.register(ProductImage)
class PostImageAdmin(admin.ModelAdmin):
    pass

