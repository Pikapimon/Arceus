from django.utils import timezone
from django.shortcuts import render
from django.http import HttpResponse
from .models import *
import datetime
import string
from .myutils.pkEmail import *
from Arceus.settings import BASE_DIR
import os
import random
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.


def leave_main(request):
    # para:idnum,name,phnum,invcode,mail
    try:
        temp = Dodger.objects.filter(id_number=request.GET['idnum'][:18])
        if len(temp) == 1:  # existed
            dodger = temp[0]
            dodger.latest_using_date = timezone.now()
            dodger.save()
            info = {}
            info['name'] = dodger.name
            info['stu_id'] = dodger.stu_id
            info['college'] = dodger.college_name
            info['class_name'] = dodger.class_name
            info['id_number'] = dodger.id_number
            info['phone_number'] = dodger.phone_number
            info['instructor_name'] = dodger.instructor_name
            info['secretary_name'] = dodger.secretary_name
            info['gender'] = dodger.gender
            info['major'] = dodger.major
            info['now_date'] = dodger.latest_using_date.strftime('%Y-%m-%d')
            return render(request, 'Dodge/leave.html', info)
        elif len(temp) == 0:  # not exist

            # corrert
            recent_code = InvitationCode.objects.all()[0].recent_code.strip()
            varname = request.GET['name'].strip()
            varphnum = request.GET['phnum'].strip()
            varidnum = request.GET['idnum'].strip()
            varinvcode = request.GET['invcode'].strip()
            varmail = request.GET['mail'].strip()
            if request.GET.get('invcode') == recent_code:
                dodger = Dodger(id_number=varidnum,
                                name=varname, phone_number=varphnum, invited_code=recent_code, mail_addr=varmail)
                dodger.save()  # new dodger
                # mail info
                html = open(
                    os.path.join(BASE_DIR, 'Dodge/myutils/mail_content.html'), 'rb').read()
                content = str(html, 'utf-8')
                content = content.replace('%s1', varname)
                content = content.replace('%s2', varname)
                content = content.replace('%s3', varidnum)
                content = content.replace('%s4', varphnum)
                email(pkClient(varname, varmail), content)

                ran_str = ''.join(random.sample(
                    string.ascii_letters + string.digits, 8))
                InvitationCode.objects.all()[0].delete()
                newcode = InvitationCode(recent_code=ran_str)
                newcode.save()  # code updated
                email(pkClient('沈明智', 'pikapimon@icloud.com'),
                      varname+'注册\n新邀请码：'+ran_str)

                info = {}
                info['name'] = dodger.name
                info['stu_id'] = doger.stu_id
                info['college'] = doger.college_name
                info['class_name'] = dodger.class_name
                info['id_number'] = dodger.id_number
                info['phone_number'] = dodger.phone_number
                info['instructor_name'] = dodger.instructor_name
                info['secretary_name'] = dodger.secretary_name
                info['gender'] = dodger.gender
                info['major'] = dodger.major
                info['now_date'] = dodger.latest_using_date.strftime(
                    '%Y-%m-%d')
                return render(request, 'Dodge/leave.html', info)
            else:
                return HttpResponse('邀请码错误')
    except Exception as e:
        print(e)
        return HttpResponse(' Wrong Parameters Killing！')

def enter_main(request):
    try:
        temp = Dodger.objects.filter(id_number=request.GET['idnum'][:18])
        if len(temp) == 1:  # existed
            dodger = temp[0]
            dodger.latest_using_date = timezone.now()
            dodger.save()
            info = {}
            info['name'] = dodger.name
            info['stu_id'] = dodger.stu_id
            info['college'] = dodger.college_name
            info['class_name'] = dodger.class_name
            info['id_number'] = dodger.id_number
            info['phone_number'] = dodger.phone_number
            info['instructor_name'] = dodger.instructor_name
            info['secretary_name'] = dodger.secretary_name
            info['gender'] = dodger.gender
            info['major'] = dodger.major
            info['now_date'] = dodger.latest_using_date.strftime('%Y-%m-%d')
            return render(request, 'Dodge/enter.html', info)
    except Exception as e:
        print(e)
        return HttpResponse(' Wrong Parameters Killing！')
    

def register(request):
    return render(request, 'Dodge/register.html')


@csrf_exempt
def register_commit(request):
    received_json_data = json.loads(request.body)
    temp = Dodger.objects.filter(id_number=received_json_data['id_num'])
    if len(temp) == 1:
        temp = temp[0]
        temp.id_number = received_json_data['id_num'] if received_json_data['id_num'] != '' else temp.id_number
        temp.name = received_json_data['name'] if received_json_data['name'] != '' else temp.name
        temp.phone_number = received_json_data['phone_num'] if received_json_data[
            'phone_num'] != '' else temp.phone_number
        temp.stu_id = received_json_data['stu_num'] if received_json_data['stu_num'] != '' else temp.stu_id
        temp.college_name = received_json_data['college'] if received_json_data['college'] != '' else temp.college_name
        temp.gender = received_json_data['gender'] if received_json_data['gender'] != '' else temp.gender
        temp.major = received_json_data['major'] if received_json_data['major'] != '' else temp.major
        temp.class_name = received_json_data['class'] if received_json_data['class'] != '' else temp.class_name
        temp.instructor_name = received_json_data['instructor_name'] if received_json_data[
            'instructor_name'] != '' else temp.instructor_name
        temp.secretary_name = received_json_data['secretary_name'] if received_json_data[
            'secretary_name'] != '' else temp.secretary_name
        temp.mail_addr = received_json_data['email'] if received_json_data['email'] != '' else temp.mail_addr
        temp.update()
        return HttpResponse('修改成功')
    else:
        return HttpResponse('该证件号无用户')
