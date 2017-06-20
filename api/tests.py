from django.test import TestCase
from api.models import Project, Task
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from django.db import models
from datetime import datetime



class ProjectTest(TestCase):
    def create_project(self,name="test name",description = "test description",stage=Project.StageValues.finished,chatRoom= slugify("chat") ) :
        u = User.objects.create()
        return Project.objects.create(name=name,description=description,stage=stage,creator=u,chatRoom=chatRoom)
    def test_project(self):
        pro = self.create_project()
        self.assertTrue(isinstance(pro,Project))
        self.assertEqual(pro.name,"test name")
        self.assertEqual(pro.description, "test description")
        self.assertEqual(pro.stage, Project.StageValues.finished)
    def test_project_str(self):
        pro = self.create_project()
        self.assertTrue(isinstance(pro,Project))
        self.assertEqual(pro.__str__(),"Name: test name Description: test description ChatRoom: "+slugify("chat"))


class TastTest(TestCase):
    def create_task(self,description="description",):
     u = User.objects.create(username="Nazar")
     p = ProjectTest.create_project(self)
     return  Task.objects.create(description=description,deadline = models.DateTimeField(default=datetime.now(), editable=False),project=p)
    def test_task_str(self):
        task = self.create_task()
        self.assertTrue(isinstance(task,Task))
        self.assertEqual(task.__str__(), ("Task: description on project: "+task.project_id+";stage: "+task.stage ))
