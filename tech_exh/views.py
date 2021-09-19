from django.shortcuts import render
from .transfer_data_to_database import *
from django.http import HttpResponse
from .models import *
import json
from Arceus.settings import BASE_DIR
import os

# Create your views here.


def upload_all_data(request):
    result = format_data()
    print("result length", len(result))
    for res_data in result:
        if res_data['data_type'] == 'slp':
            new_record = SLP(
                district=res_data['data_district'], all_data=json.dumps(res_data['data']))
        elif res_data['data_type'] == 'temp2':
            new_record = Temp2(
                district=res_data['data_district'], all_data=json.dumps(res_data['data']))
        elif res_data['data_type'] == 'tprep':
            new_record = Tprep(
                district=res_data['data_district'], all_data=json.dumps(res_data['data']))
        elif res_data['data_type'] == 'srads':
            new_record = Srads(
                district=res_data['data_district'], all_data=json.dumps(res_data['data']))
        else:
            new_record = RH(
                district=res_data['data_district'], all_data=json.dumps(res_data['data']))
        with open(os.path.join(BASE_DIR, 'tech_exh/feedback.txt'), 'a') as f:
            f.write(str(new_record)+'\n')
        # new_record.save()
    return HttpResponse('DONE')


def get_data(request):
    target_district = request.GET['district']
    data_district = ['global', 'china', 'huadong', 'huanan',
                     'huazhong', 'huabei', 'xibei', 'xinan', 'dongbei']
    ret = {}
    if target_district == "all_region":
        for i in range(len(data_district)):
            target_district = data_district[i]
            slp_data = json.loads(SLP.objects.filter(
                district=target_district)[0].all_data)
            temp2_data = json.loads(Temp2.objects.filter(
                district=target_district)[0].all_data)
            tprep_data = json.loads(Tprep.objects.filter(
                district=target_district)[0].all_data)
            srads_data = json.loads(Srads.objects.filter(
                district=target_district)[0].all_data)
            rh_data = json.loads(RH.objects.filter(
                district=target_district)[0].all_data)
            temp = {'slp': slp_data, 'temp2': temp2_data,
                    'tprep': tprep_data, 'srads': srads_data, 'rh': rh_data}
            ret[target_district] = temp
        return HttpResponse(json.dumps(ret, ensure_ascii=False), content_type="application/json,charset = utf8")


def map_home(request):
    return render(request, 'tech_exh/index2.html')
