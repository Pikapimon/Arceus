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
# Create your views here.


def leave_main(request):
    # para:idnum,name,phnum,invcode,mail
    try:
        temp = Dodger.objects.filter(id_number=request.GET['idnum'])
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
                return render(request, 'Dodge/leave.html', info)
            else:
                return HttpResponse('邀请码错误')
    except Exception as e:
        print(e)
        return HttpResponse(' Wrong Parameters Killing！')
