from django.conf import settings
from rest_framework import status, mixins, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import viewsets

from serializers import SignUpSerializer, PostSerializer
from core.models import AuthUser, Post


@api_view(['POST'])
@permission_classes((AllowAny,))
def signup(request, format=None):
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(dict(success=True), status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all().filter(status=Post.PUBLISHED).order_by('-created_at')

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        related = (self.get_queryset().filter(category=instance.category)
                    .exclude(pk=instance.pk)[:10])
        objs = self.get_serializer(related, many=True)
        return Response({'object': serializer.data, 'related': objs.data})
