import numpy
import xarray as xr
from matplotlib.colors import rgb2hex
import matplotlib.pyplot as plt
import matplotlib as mpl
import geojsoncontour
from matplotlib import colors

tprep = xr.open_dataset(
    "./temp2.nc").temp2a.mean("lev")
tprep = tprep.to_dict()
lon_data = tprep['coords']['lon']['data']
lat_data = tprep['coords']['lat']['data']
lon_data.append(360)

for data_index in range(24):
    data_time1 = tprep['data'][data_index]
    for lon_i in range(len(data_time1)):
        data_time1[lon_i].append(data_time1[lon_i][0])
    color = ['rgba(31,82,216,1)', 'rgba(33,105,235,1)', 'rgba(49,127,248,1)', 'rgba(64,142,239,1)', 'rgba(116,164,238,1)', 'rgba(136,198,252,1)', 'rgba(168,238,251,1)',
             'rgba(216,255,253,1)', 'rgba(255,224,225,1)', 'rgba(254,184,192,1)', 'rgba(243,140,140,1)', 'rgba(216,122,120,1)', 'rgba(223,89,96,1)', 'rgba(222,57,65,1)', 'rgba(179,41,49,1)']
    for i, e in enumerate(color):
        e = e[5:-1]
        e = e.split(',')
        for j, v in enumerate(e):
            if j == 3:
                e[j] = int(v)
            else:
                e[j] = int(v)/255
        color[i] = e
    cmap = mpl.colors.ListedColormap(color)
    # cmap.set_over('red')
    # cmap.set_under('blue')

    bounds = [-100, -2.5, -2, -1.5, -1.2, -0.9, -
              0.6, -0.3, 0, 0.3, 0.6, 0.9, 1.2, 1.5, 2, 100]
    norm = mpl.colors.BoundaryNorm(bounds, cmap.N)
    figure = plt.figure()
    plt.axis('off')
    plt.xticks([])
    plt.yticks([])
    ax = figure.add_subplot(111)
    # cf_lv = [0,0.05,0.3,1,2,4,6,np.exp(2)]

    contourf = ax.contourf(lon_data, lat_data, data_time1,
                           levels=bounds, cmap=cmap, norm=norm)
    contour = ax.contour(lon_data, lat_data, data_time1,
                         levels=bounds, colors='black', norm=norm, linewidths=0.2)
    geojson_contour = geojsoncontour.contour_to_geojson(
        contour=contour,
        ndigits=3,
        unit='centi'
    )
    geojson_contourf = geojsoncontour.contourf_to_geojson(
        contourf=contourf,
        ndigits=3,
        unit='centi'
    )
    plt.savefig('./pic_line/'+str(data_index) +
                '.png', transparent=True, dpi=600)
    plt.close()
    with open('./contour/contour_line/contour'+str(data_index)+'.geojson', 'w') as f:
        f.write(geojson_contour)
    with open('./contour/contour_line/contourf'+str(data_index)+'.geojson', 'w') as f:
        f.write(geojson_contourf)
