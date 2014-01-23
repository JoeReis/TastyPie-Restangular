from django.conf.urls import patterns, include, url
from tester.api import EntryResource

from django.contrib import admin
admin.autodiscover()

entry_resource = EntryResource()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'tastypiedemo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(entry_resource.urls)),
)
