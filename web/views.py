from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView
from api.models import Project


@login_required(login_url="/login")
def home(request):
    return render(request, "web/home.html")

class AllProjectsListView(ListView):
    model = Project
    template_name = "web/allprojects.html"