from ast import keyword
from functools import partial
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.db.models import Q
from django.contrib.auth import authenticate,logout,login
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser, JSONParser

from .serializers import ProductSerializer, PostViewSetSerializer
from .models import Product
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

def login_user(request, *args, **kwargs):
    if request.method == 'POST':
        user = request.POST.get('user', None)
        print("user")
        if user:
            if User.objects.filter(username = user).exists():
                user = User.objects.filter(username = user)
                print("exists")
                login(user, request)
            else:
                print("doesnot exits")
        return HttpResponse({"logged in": "user"}, content_type="application/json")


class ProductViews(APIView):
    # permission_classes = (AllowAny, )
    # authentication_classes = (JWTAuthentication,)

    #post
    def post(self, request, *args, **kwargs):
        print(request.FILES.getlist('product_images'))
        product_images = request.FILES.getlist('product_images', None)
        print(product_images)
        data = request.data.copy()
        # data.pop('product_images')
        # print(request.data)
        print(request.user)
        data["posted_by"] = request.user.id
        
        serializer = PostViewSetSerializer(data=data, context = {'product_images': product_images})
        # print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    # get
    def get(self, request, id = None):
        # print(request.user.email)
        # id = request.query_params.get('id', None)
        # print(id)
        if id:
            item = Product.objects.get(id=id)
            serializer = ProductSerializer(item)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        email = request.query_params.get('email', None)
        keyword = request.query_params.get('keyword', None)
        category = request.query_params.get('category', None)
        price_from = request.query_params.get('price_from', None)
        price_to = request.query_params.get('price_to', None)

        items = Product.objects.all()

        if email:
            if(email == request.user.email):
                
                items = items.filter(posted_by = request.user)
                print(items)


        if keyword:
            lookups = Q(title__icontains=keyword) | Q(description__icontains=keyword) | Q(posted_by__user_name__icontains = keyword)
            items = items.filter(lookups).distinct()

        if category:
            category = category.split(',')
            items = items.filter(category__in = category)
        
        if price_from:
            try:
                price_from = int(price_from)
                items = items.filter(price__gte = price_from)
            except:
                pass

        if price_to:
            try:
                price_from = int(price_to)
                items = items.filter(price__lte = price_to)
            except:
                pass
        

        serializer = ProductSerializer(items, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    # update
    def patch(self, request, id=None):
        item = Product.objects.get(id=id)
        print(request.FILES.getlist('product_images'))
        product_images = request.FILES.getlist('product_images', None)
        print(product_images)
        data = request.data.copy()
        print(request.user)
        
        serializer = PostViewSetSerializer(item, data=data, context = {'product_images': product_images}, partial = True)
        # serializer = ProductSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})
    
    # delete
    def delete(self, request, id=None):
        item = get_object_or_404(Product, id=id)
        item.delete()
        return Response({"status": "success", "data": "Item Deleted"})


