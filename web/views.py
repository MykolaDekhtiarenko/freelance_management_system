from django.http import Http404
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView
from django.views.generic import DetailView
from api.models import *
from django.contrib.auth.mixins import LoginRequiredMixin


@login_required(login_url="/login")
def home(request):
    return render(request, "web/home.html")

class AllProjectsListView(ListView):
    model = Project
    template_name = "web/allprojects.html"

class MyApplicationsListView(LoginRequiredMixin, ListView):
    template_name = "web/myapplications.html"
    paginate_by = 10
    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)

class PortfolioDetailView(LoginRequiredMixin, DetailView):
    template_name = "web/portfolio.html"
    def get_queryset(self):
        if not self.request.user.is_superuser:
            u_role = self.request.user.profile.role
            if u_role == Profile.RoleValues.developer:
                return Portfolio.objects.filter(user=self.request.user)
            else:
                raise Http404("No portfolio is available for users who are %s" % u_role)
        else:
            raise Http404("No portfolio is available for superusers")