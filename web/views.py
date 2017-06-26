from django.http import Http404
from django.shortcuts import render, render_to_response
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView
from django.views.generic import DetailView
from api.models import *
from django.contrib.auth.mixins import LoginRequiredMixin

@login_required(login_url="/login")
def home(request):
    return render(request, "web/projects.html")

def signup(request):
    return render(request, "registration/registration.html")

@login_required(login_url="/login")
def applicaions(request, pk):
    project = Project.objects.get(pk=pk)
    if request.user == project.creator:
        if project.stage!=Project.StageValues.finished:
            return render_to_response("web/applications.html", {"applications": Application.objects.filter(project=project), "project": project})
        else:
            raise Http404("Now this page is unawailabe because project was closed ")
    else:
        raise Http404

@login_required(login_url="/login")
def portfolio(request, pk):
    allSkills = Skill.objects.all()
    projectsDone = Project.objects.filter(applications__status=Application.StatusValues.accepted, applications__user_id=pk,
                                          stage=Project.StageValues.finished).count()
    projectsAccepted = Project.objects.filter(applications__status=Application.StatusValues.accepted, applications__user_id=pk,
                                          stage__in=[Project.StageValues.preparation, Project.StageValues.development]).count()
    applicationsAll = Application.objects.filter(user_id=pk).count()
    try:
        return render(request, "web/portfolio.html", {'portfolio': Portfolio.objects.get(user_id=pk), 'all_skills': allSkills,
                                                      'projects_done': projectsDone, 'projects_accepted': projectsAccepted,
                                                      'applications_all': applicationsAll})
    except Portfolio.DoesNotExist:
        return render(request, "web/portfolio.html", {'portfolio': None, 'all_skills': allSkills,
                                                      'projects_done': projectsDone, 'projects_accepted': projectsAccepted,
                                                      'applications_all': applicationsAll, 'p_user': User.objects.get(id=pk)})

class AllProjectsListView(LoginRequiredMixin, ListView):
    model = Project
    template_name = "web/projects.html"
    paginate_by = 10
    def get_queryset(self):
        return Project.objects.filter(stage=Project.StageValues.preparation)

class MyProjectsListView(LoginRequiredMixin, ListView):
    template_name = "web/projects.html"
    paginate_by = 10
    def get_queryset(self):
        if not self.request.user.is_superuser:
            if self.request.user.profile.role == Profile.RoleValues.creator:
                return Project.objects.filter(creator=self.request.user)
            elif self.request.user.profile.role == Profile.RoleValues.developer:
                return Project.objects.filter(applications__status__exact=Application.StatusValues.accepted).filter(applications__user=self.request.user).distinct()
        else:
            raise Http404("No projects are available for superuser")

class MyApplicationsListView(LoginRequiredMixin, ListView):
    template_name = "web/myapplications.html"
    paginate_by = 10
    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)

class MyTasksListView(LoginRequiredMixin, ListView):
    template_name = "web/mytasks.html"
    paginate_by = 10
    def get_queryset(self):
        if not self.request.user.is_superuser:
            return Task.objects.filter(developers=self.request.user)
        else:
            raise Http404("No tasks are available for superuser")

class ProjectDetailView(LoginRequiredMixin, DetailView):
    template_name = "web/project.html"

    queryset = Project.objects.all()
    def get_object(self):
        obj = super(ProjectDetailView, self).get_object()
        if obj.stage == Project.StageValues.preparation:
            # print("Preparation case;")
            return obj
        elif obj.creator == self.request.user:
            # print("Current user is owner;")
            return obj
        elif obj.stage == Project.StageValues.development:
            # print("Development case;")
            if self.request.user in User.objects.filter(application__project=obj).filter(application__status__exact=Application.StatusValues.accepted):
                # print("Current user is one of the developers;")
                return obj
            else:
                # print("Current user is not one of the developers;")
                raise Http404("")

    def get_context_data(self, **kwargs):
        context = super(ProjectDetailView, self).get_context_data(**kwargs)
        context['team'] = User.objects.filter(application__project=Project.objects.filter(id=self.kwargs['pk'])).filter(application__status=Application.StatusValues.accepted).distinct()
        context['accepted_applications_num'] = Application.objects.filter(project=Project.objects.filter(id=self.kwargs['pk']), status=Application.StatusValues.accepted).distinct().count()
        context['applicants'] = User.objects.filter(application__project=Project.objects.get(id=self.kwargs['pk']))
        return context
