from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import Http404
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView
from api.models import *


@login_required(login_url="/login")
def home(request):
    return render(request, "web/home.html")

class AllProjectsListView(LoginRequiredMixin, ListView):
    model = Project
    template_name = "web/allprojects.html"
    paginate_by = 10

class MyProjectsListView(LoginRequiredMixin, ListView):
    template_name = "web/myprojects.html"
    paginate_by = 10

    def get_queryset(self):
        if not self.request.user.is_superuser:
            if self.request.user.profile.role == Profile.RoleValues.creator:
                return Project.objects.filter(creator = self.request.user)
            elif self.request.user.profile.role == Profile.RoleValues.developer:
                # TODO add filter by status of application
                return Project.objects.filter(applications__user=self.request.user)
        else:
            raise Http404("No portfolio is available for superuser")


