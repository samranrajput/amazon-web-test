from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='shop_index'),
    path('about', views.about,name="about_us"),
    path('contact', views.contact,name="contact_us"),
    path('tracker', views.tracker,name="tracking_status"),
    path('search', views.search,name="search"),
    path('product/view/<int:id>', views.productView,name="product_view"),
    path('check/out', views.checkOut,name="check_out"),
]
