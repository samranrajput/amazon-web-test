# Generated by Django 5.1.3 on 2024-12-22 03:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0004_product_discount_price_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='desc',
            field=models.TextField(),
        ),
    ]