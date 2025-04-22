from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),  # Inclui as URLs do seu aplicativo core
    path('', include('core.urls')),  # Redireciona ou trata a URL raiz
]
