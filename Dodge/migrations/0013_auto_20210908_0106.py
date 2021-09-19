# Generated by Django 3.2.5 on 2021-09-07 17:06

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Dodge', '0012_auto_20210907_2258'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dodger',
            name='added_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 9, 7, 17, 6, 12, 986486, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='dodger',
            name='latest_using_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 9, 7, 17, 6, 12, 986455, tzinfo=utc)),
        ),
    ]
