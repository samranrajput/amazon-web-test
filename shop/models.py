from django.db import models

class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    sub_category = models.CharField(max_length=50)
    price = models.IntegerField(default=0)
    discount_price = models.IntegerField(default=0)
    desc = models.TextField()
    pub_date = models.DateField()
    image = models.ImageField(upload_to="images/")

    def __str__(self):
        return self.product_name

class Contact(models.Model):
    msg_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    phone_no = models.CharField(max_length=50)
    desc = models.TextField()

    def __str__(self):
        return self.name
    
class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    items_json = models.CharField(max_length=50000, blank=True)
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    phone_number = models.CharField(max_length=30)
    address = models.TextField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=80)
    zip_code = models.IntegerField()

    def __str__(self):
        return f'{self.order_id}'
    
class Track(models.Model):
    track_id= models.AutoField(primary_key=True)
    order_id= models.IntegerField(default="")
    update_desc= models.CharField(max_length=5000)
    timestamp= models.DateField(auto_now_add= True)

    def __str__(self):
        return self.update_desc[0:7] + "..."