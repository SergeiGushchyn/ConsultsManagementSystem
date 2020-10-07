from rest_framework import routers
from .api import ScotInfoViewSet, DirectorViewSet

router = routers.DefaultRouter()
router.register('api/director/scotinfo', ScotInfoViewSet, 'director')
router.register('api/director', DirectorViewSet, 'director')

urlpatterns = router.urls