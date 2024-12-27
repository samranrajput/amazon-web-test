from django import forms
from .models import *

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = '__all__'
        widgets = {
            'msg_id':forms.NumberInput(attrs = {'class':'form-control'}),
            'name':forms.TextInput(attrs = {'class':'form-control'}),
            'email':forms.EmailInput(attrs = {'class':'form-control'}),
            'phone_no':forms.TextInput(attrs = {'class':'form-control'}),
            'desc':forms.Textarea(attrs = {'class':'form-control'})
        }

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = '__all__'
        widgets = {
            'items_json':forms.TextInput(attrs = {'class':'form-control', 'id':'itemsJson','name':'itemsJson'}),
            'name':forms.TextInput(attrs = {'class':'form-control'}),
            'email':forms.EmailInput(attrs = {'class':'form-control'}),
            'phone_number':forms.TextInput(attrs = {'class':'form-control'}),
            'address':forms.Textarea(attrs = {'class':'form-control'}),
            'city':forms.TextInput(attrs = {'class':'form-control'}),
            'state':forms.TextInput(attrs = {'class':'form-control'}),
            'zip_code':forms.NumberInput(attrs = {'class':'form-control'})
        }