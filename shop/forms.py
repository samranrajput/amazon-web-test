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