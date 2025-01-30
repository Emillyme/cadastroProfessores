from django.contrib.auth.models import AbstractUser
from django.db import models

class Professor(AbstractUser):
    first_name = None
    last_name = None

    nome = models.CharField(max_length=255, blank=True, null=True)  # Nome completo
    ni = models.CharField(max_length=15, blank=True, null=True)  # Número de telefone (opcional)
    cargo = models.CharField(max_length=255)  # Campo cargo do professor

    def __str__(self):
        return self.username
