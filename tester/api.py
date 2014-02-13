# myapp/api.py
from tastypie.resources import ModelResource
from tester.models import Entry
from django.contrib.auth.models import User
from tastypie import fields

class UserResource(ModelResource):
	class Meta:
		queryset = User.objects.all()
		resource_name = 'user'
		excludes = ['email', 'password', 'is_active', 'is_staff', 'is_superuser']
        allowed_methods = ['get']
        always_return_data = True #needed for angular

class EntryResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')

    class Meta:
        queryset = Entry.objects.all()
        resource_name = 'entry'
        always_return_data = True #needed for angular