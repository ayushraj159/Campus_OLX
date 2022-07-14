
from rest_framework import serializers
from rest_framework.serializers import ReadOnlyField
from rest_framework import exceptions
from .models import Product, ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('image',)

class ProductSerializer(serializers.ModelSerializer):

    product_images = ProductImageSerializer(many = True)
    owner_name = serializers.ReadOnlyField(source = 'posted_by.user_name')
    owner_contact = serializers.ReadOnlyField(source = 'posted_by.mobile_number')
    owner_department = serializers.ReadOnlyField(source = 'posted_by.department')
    owner_hostel = serializers.ReadOnlyField(source = 'posted_by.hostel')

    class Meta():
        model = Product
        fields = ['id', 'title', 'category', 'price', 'negotiable', 'description', 'product_images', 'posted_by', 'posted_on', 'owner_name', 'owner_contact', 'owner_department', 'owner_hostel']
        
 

class PostViewSetSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        images = self.context['product_images']
        product = Product.objects.create(**validated_data)
        for image in images:
            ProductImage.objects.create(product=product, image=image)
        return product
    
    def update(self, instance, validated_data):
        images = self.context['product_images']
        instance.title = validated_data.get('title', instance.title)
        instance.price = validated_data.get('price', instance.price)
        instance.category = validated_data.get('category', instance.category)
        instance.description = validated_data.get('description', instance.description)
        instance.negotiable = validated_data.get('negotiable', instance.negotiable)
        print(instance.description)
        
        for image in images:
            ProductImage.objects.create(product=instance, image=image)
        instance.save()
        return instance


    class Meta:
        model = Product
        fields = '__all__'