from django.shortcuts import render, HttpResponse, redirect
from math import ceil
import json
from .models import *
from .forms import *


def index(request):
    all_products = []
    category_products = Product.objects.values('category', 'id')
    categories = {item['category'] for item in category_products}
    for category in categories:
        products = Product.objects.filter(category=category)
        products_length = len(products)
        product_batches = [products[i:i + 4] for i in range(0, products_length, 4)]
        slides = products_length // 4 + ceil(products_length / 4 - products_length // 4)
        all_products.append({
            'category': category,
            'batches': product_batches,
            'slides_range': range(1, slides),
        })
    return render(request, 'shop/home.html', {'all_products': all_products})

def about(request):
    return render(request, 'shop/about.html')

def contact(request):
    form = ContactForm()
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('contact_us')
    return render(request, 'shop/contact.html',locals())

def tracker(request):
    if request.method=="POST":
        orderId = request.POST.get('orderId', '')
        email = request.POST.get('email', '')
        # return HttpResponse(orderId, email)
        try:
            order = Order.objects.filter(order_id=orderId, email=email)
            if len(order)>0:
                update = Track.objects.filter(order_id=orderId)
                updates = []
                for item in update:
                    updates.append({'text': item.update_desc, 'time': item.timestamp})
                    response = json.dumps([updates, order[0].items_json], default=str)
                return HttpResponse(response)
            else:
                return HttpResponse('{}')
        except Exception as e:
            return HttpResponse('{}')
    return render(request, 'shop/tracker.html')

def search(request):
    return render(request, 'shop/search.html', locals())

def productView(request,id):
    product_view = Product.objects.filter(id=id)[0]
    return render(request, 'shop/product_view.html',locals())

def checkOut(request):
    form = OrderForm()
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            thank = True
            order = form.save()
            id = order.order_id
            update= Track(order_id= order.order_id, update_desc="The order has been placed")
            update.save()  
    return render(request, 'shop/check_out.html', locals())