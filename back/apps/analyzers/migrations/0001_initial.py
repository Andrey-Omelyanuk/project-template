# Generated by Django 3.2 on 2021-06-06 17:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('spiders', '0005_alter_articlesnapshot_body'),
    ]

    operations = [
        migrations.CreateModel(
            name='Analyzer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='use analyzer from apps/analyzers/analyzers/<name>.py', max_length=128, unique=True)),
                ('desc', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128, unique=True)),
                ('desc', models.TextField(default='')),
            ],
        ),
        migrations.CreateModel(
            name='AnalyzerSession',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('started', models.DateTimeField(auto_now_add=True)),
                ('finished', models.DateTimeField(blank=True, null=True)),
                ('analyzer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='analyzers.analyzer')),
            ],
        ),
        migrations.CreateModel(
            name='TagHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField()),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='spiders.article')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='analyzers.tag')),
            ],
            options={
                'unique_together': {('article', 'tag')},
            },
        ),
    ]