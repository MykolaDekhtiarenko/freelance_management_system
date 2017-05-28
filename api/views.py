from rest_framework import viewsets
from api.models import Portfolio
from api.serializers import PortfolioSerializer
from rest_framework.permissions import IsAuthenticated


class PortfolioModelViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

