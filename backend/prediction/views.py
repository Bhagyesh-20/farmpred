from django.shortcuts import render
from django.http import JsonResponse
from .models import User,Product,Order
from .serializer import MyTokenObtainPairSerializer, RegisterSerializer, OrderSerializer,ProductSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.views import APIView
# import tensorflow as tf
# from tensorflow import keras
# from tensorflow.keras.models import load_model 

# from PIL import Image
# import numpy as np
import logging
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulations {request.user}, your API just responded to a GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.data.get('text', 'Hello buddy')
        data = f'Congratulations, your API just responded to a POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


logger = logging.getLogger(__name__)

# class PredictView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, *args, **kwargs):
#         file = request.data.get('file')
#         if not file:
#             return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

#         file = request.data['file']
#         image = Image.open(file)
        
#         # Preprocess the image to fit your model input requirements
#         image = image.resize((224, 224))  # Example for a 224x224 input size
#         image = np.array(image) / 255.0  # Normalize to [0,1] range
#         image = np.expand_dims(image, axis=0)  # Add batch dimension

#         # Load your model (ensure this is loaded only once in production)
#         model = load_model(model_path)
        
#         # Make prediction
#         prediction = model.predict(image)
        
#         # Assuming the prediction is a class label
#         predicted_class = np.argmax(prediction)
#         class_names = ['Anthracnose', 'Apple Scab', 'Black Spot', 
#                        'Blight', 'Blossom End Rot','Botrytis','Brown Rot',
#                        'Canker','Cedar Apple Rust','Clubroot','Crown Gall',
#                        'Downy Mildew','Fire Blight','Fusarium','Gray Mold',
#                        'Leaf Spots','Mosaic Virus','Nematodes','Powdery Mildew',
#                        'Verticilium']
        
#         predicted_class_name = class_names[predicted_class]

#         logger.debug("Received file: %s", file.name)
        
#         return Response({"prediction": predicted_class_name}, status=status.HTTP_200_OK)
    

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

# Order ViewSet
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

# Register the viewsets with a router in your urls.py
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'orders', OrderViewSet, basename='order')