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