# Generated by Django 5.1.5 on 2025-01-28 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cadastro_professores', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='professor',
            name='nome',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
