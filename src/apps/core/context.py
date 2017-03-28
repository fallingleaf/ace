from django.conf import settings

def staticfile_context(request):
    url = settings.STATIC_URL

    if settings.DEBUG:
        url = settings.CLIENT_URL

    return {'CLIENT_URL': url}
