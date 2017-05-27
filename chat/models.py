from django.utils import timezone
from django.db import models
from api.models import Project
from django.contrib.auth.models import User

# Create your models here.

class Message(models.Model):
    project = models.ForeignKey(Project, related_name='messages')
    user = models.ForeignKey(User)
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)

    def __str__(self):
        return self.user.username, self.message, self.formatted_timestamp

    def __unicode__(self):
        return '[{timestamp}] {user.username}: {message}'.format(**self.as_dict())

    @property
    def formatted_timestamp(self):
        return self.timestamp.strftime('%b %-d %-I:%M %p')

    def as_dict(self):
        return {'user': self.user.username, 'message': self.message, 'timestamp': self.formatted_timestamp}