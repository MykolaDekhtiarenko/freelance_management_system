import datetime

from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import now
from djchoices import DjangoChoices, ChoiceItem

class Project(models.Model):
    class StageValues(DjangoChoices):
        preparation = ChoiceItem("P")
        development = ChoiceItem("D")
        finished = ChoiceItem("F")

    name = models.TextField()
    description = models.TextField()
    stage = models.CharField(max_length=1, choices=StageValues.choices, default=StageValues.preparation)
    startDate = models.DateField(null=True)
    endDate = models.DateField(null=True)
    chatRoom = models.SlugField(unique=True)
    creator = models.ForeignKey(User, null=False)

    def __str__(self):
        return 'Name: %s Description: %s ChatRoom: %s' % (self.name, self.description, self.chatRoom)

#Заявка
class Application(models.Model):
    class StatusValues(DjangoChoices):
        waiting = ChoiceItem("W")
        accepted = ChoiceItem("A")
        refused = ChoiceItem("R")

    status = models.CharField(max_length=1, choices=StatusValues.choices, default=StatusValues.waiting, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="applications")

    class Meta():
        unique_together = (("project", "user"),)

class Skill(models.Model):
    label = models.CharField(max_length=20)

class Portfolio(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    about = models.TextField()
    education = models.CharField(max_length=300, null=True)
    experience = models.CharField(max_length=300, null=True)
    phone = models.CharField(max_length=15)
    skills = models.ManyToManyField(Skill)

class Profile(models.Model):
    class RoleValues(DjangoChoices):
        creator = ChoiceItem("C")
        developer = ChoiceItem("D")

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=1, choices=RoleValues.choices)

class Task(models.Model):
    class StageValues(DjangoChoices):
        waiting = ChoiceItem("W")
        in_process = ChoiceItem("P")
        failed = ChoiceItem("F")
        done = ChoiceItem("D")

    description = models.TextField()
    deadline = models.DateTimeField()
    stage = models.CharField(max_length=1, choices=StageValues.choices, default=StageValues.waiting)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    developers = models.ManyToManyField(User)

    def __str__(self):
        return "Task: %s on project: %s; stage: %s" % (self.description ,self.project_id, self.stage)

class Comment(models.Model):
    text = models.TextField()
    timestamp = models.DateTimeField(default=now, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)





