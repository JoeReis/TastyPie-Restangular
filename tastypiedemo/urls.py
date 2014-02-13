from django.conf.urls import *
from tastypie.api import Api
from tester.api import EntryResource, UserResource
from django.views.generic import TemplateView
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(EntryResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'tastypiedemo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(v1_api.urls)),

    url(
        regex = r'^$',
        view = TemplateView.as_view(template_name = 'test.html'),
        name = 'homepage'
    ),

    # STATIC AND MEDIA CONTENT
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    url(r'^media/(.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
)
