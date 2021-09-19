# Generated by Django 3.2.5 on 2021-07-29 03:31

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Dodge', '0009_auto_20210729_1130'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dodger',
            name='added_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 29, 3, 30, 51, 44161, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='dodger',
            name='latest_using_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 29, 3, 30, 51, 44133, tzinfo=utc)),
        ),
    ]
