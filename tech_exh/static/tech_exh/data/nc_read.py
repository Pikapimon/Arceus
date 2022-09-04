import xarray as xr
import json
import matplotlib.pyplot as plt
'''
关于nc文件到地图热力涂层的映射关系及命名
两个拆分：1、不同颜色/不同热力等级 2、时间
命名规则 temp_time1_level1
level(0-14)
time(0-24)
'''


def get_level(temp_num):
    levels = [-2.5, -2, -1.5, -1.2, -0.9, -
              0.6, -0.3, 0, 0.3, 0.6, 0.9, 1.2, 1.5, 2]
    for (i, e) in enumerate(levels):
        if temp_num <= e:
            return i
    return len(levels)


if __name__ == '__main__':
    tprep = xr.open_dataset(
        "./temp2.nc").temp2a.mean("lev")
    tprep = tprep.to_dict()
    lon_data = tprep['coords']['lon']['data']
    lat_data = tprep['coords']['lat']['data']
    print(lon_data)
    for time_i in range(0):
        SingleTimeGeojson = []
        for level in range(15):
            SingleTimeGeojson.append({'type': "FeatureCollection", 'crs': {"type": "name", "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"}}, 'features': []})
        time1_data = (tprep['data'][time_i])
        # for lat in range(len(lat_data)):
        #     for lon in range(len(lon_data)):
        # all_cell_value.append(time1_data[lat][lon])
        # min_cell = min(all_cell_value)
        # max_cell = max(all_cell_value)
        # all_range = max_cell - min_cell

        for lat in range(len(lat_data)):
            for lon in range(len(lon_data)):
                # 1 原始数据
                original_value = time1_data[lat][lon]
                # 2 投影至[0,1]数据
                # projected_value = (time1_data[lat][lon]-min_cell)/all_range
                # 3保留两极后的值
                # modified_value = None
                # if projected_value > 0.5:
                #     modified_value = 1
                # elif projected_value < 0.2:
                #     modified_value = 0
                # else:
                #     modified_value = 0.5
                # 4 正负
                # positive = None
                # if original_value > 0:
                #     positive = 1
                # else:
                #     positive = 0

                # single_feature = {"type": "Feature", "properties": {'prep_orig': original_value, 'prep_proj': projected_value, 'prep_modi': modified_value, "positive": positive}, "geometry": {
                # "type": "Point", "coordinates": [lon_data[lon], lat_data[lat]]}}
                single_feature = {"type": "Feature", "properties": {'prep_orig': original_value}, "geometry": {
                    "type": "Point", "coordinates": [lon_data[lon], lat_data[lat]]}}

                SingleTimeGeojson[get_level(original_value)]['features'].append(
                    single_feature)
                # SingleTimeGeojson['features'].append(single_feature)
        for level in range(15):
            with open("./temp_time"+str(time_i)+'_level'+str(level)+'.geojson', 'w') as f:
                f.write(json.dumps(SingleTimeGeojson[level]))
