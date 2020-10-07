from rest_framework import routers
from .api import ConsultsViewSet

router = routers.DefaultRouter()
router.register('api/consults', ConsultsViewSet, 'consults')

urlpatterns = router.urls