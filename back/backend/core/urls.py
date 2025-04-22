from django.urls import path, include
from rest_framework import routers
from .views import ProdutoViewSet

# Criando o roteador para a API
router = routers.DefaultRouter()

# Registrando o ProdutoViewSet para o endpoint 'produtos'
router.register(r'produtos', ProdutoViewSet)

# Definindo o urlpatterns corretamente como uma lista
urlpatterns = [
    path('', include(router.urls)),  # Incluindo as URLs do router
]
