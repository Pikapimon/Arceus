import os
from Arceus.settings import BASE_DIR


def format_data():
    data_type = ['slp', 'temp2', 'tprep', 'srads', 'rh']
    data_district = ['global', 'china', 'huadong', 'huanan',
                     'huazhong', 'huabei', 'xibei', 'xinan', 'dongbei']
    result = []
    data = None
    with open(os.path.join(BASE_DIR, 'tech_exh/index.txt'), 'r') as df:
        data = df.readlines()

    counter = 0
    for i in range(6, len(data)):
        line = data[i].strip()
        if counter == 0:
            if line.startswith('Variable'):
                this_type = None
                this_district = None
                new_list = []
                for type_e in data_type:
                    if type_e in line:
                        this_type = type_e
                for district_e in data_district:
                    if district_e in line:
                        this_district = district_e
                counter = 24
                new_list = []
                continue
        else:  # read status
            new_list.append(float(line[line.index('\t')+1: len(line)]))
            counter -= 1
            if counter == 0:
                result.append(
                    {'data_type': this_type, 'data_district': this_district, 'data': new_list})
    return result


if __name__ == '__main__':
    format_data()
