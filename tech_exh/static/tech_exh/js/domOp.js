function homeFade(){
	$("#home-btn").click(()=>{
		$('#home-overlay').css('-webkit-animation','fade 2s').css('animation-fill-mode','forwards');
		$("#map").css('-webkit-animation','toCenter 2s').css('animation-fill-mode','forwards');
		$("#map>canvas").css('-webkit-animation','toCenter 2s').css('animation-fill-mode','forwards');
		setTimeout(()=>{
			$("#home-overlay").remove();
			$("#map").css('-webkit-animation','zoomIn 5s').css('animation-fill-mode','forwards');
			$("#map>canvas").css('-webkit-animation','zoomIn 5s').css('animation-fill-mode','forwards');
			setTimeout(()=>{$("#map").empty();},5000);
		},2000);
	})
}
function homeFade_video(){
	$("#home-btn>button").click(()=>{
		$('#home-overlay').css('-webkit-animation','fade 2s').css('animation-fill-mode','forwards');
		// $('#page').css('-webkit-animation','toCenter 2s').css('animation-fill-mode','forwards');
		setTimeout(()=>{
			$("#home-overlay").remove();
			$("#page").css('-webkit-animation','zoomIn 1.5s').css('animation-fill-mode','forwards');
			setTimeout(()=>{$("#page").remove();},1500);
            setTimeout(()=>{
                $("#control_charts").click();
                $("#control_play").click();
                setTimeout(()=>{
                    $("#global").click();
                    setTimeout(()=>{$("#control_wind").click();},3000);
                },1000);
            },1700)
        },2000);
	})
}
var chart_isShown = false;
function show_charts(){
    $("#control_charts").css('pointer-events','none');
    setTimeout(()=>{
        $("#control_charts").css('pointer-events','auto')
    },1500);
    $("#overlay-header").css('-webkit-animation','slide-right 1s').css('animation-fill-mode','forwards');
	// setTimeout(()=>{
 //        $("#overlay-control").css('-webkit-animation','slide-right 2s').css('animation-fill-mode','forwards');
 //    },200)
 setTimeout(()=>{
  var current_id = 1;
  var interval_id = setInterval(()=>{
     if (current_id == 1){
        $("#overlay-"+current_id).css('-webkit-animation','slide-right 1s').css('animation-fill-mode','forwards');
    }else{
        $("#overlay-"+current_id).css('-webkit-animation','slide-top 1s').css('animation-fill-mode','forwards');
    }
    current_id++;
    if (current_id==6){clearInterval(interval_id);}
},100);
},100);

 setTimeout(()=>{
    $("#overlay-header").css('left','30px');
    $("#overlay-header").css('-webkit-animation','none');
    for (var current_id =1 ; current_id <6; current_id++) {
        if(current_id==1){
            $("#overlay-"+current_id).css('left','30px');
        }else{
            $("#overlay-"+current_id).css('bottom','30px');
        }
        $("#overlay-"+current_id).css('-webkit-animation',"none");

    };

},1500);
 chart_isShown = true;
}
function close_charts(){
    if(enlarged_chart_number!=null){
        ensmall_by_number(enlarged_chart_number);
    }
    setTimeout(()=>{
$("#control_charts").css('cursor','not-allowed').css('pointer-events','none');
    setTimeout(()=>{
        $("#control_charts").css('cursor','pointer').css('pointer-events','auto')
    },1500);
    $("#overlay-header").css('-webkit-animation','disappear-to-left 1s').css('animation-fill-mode','forwards');
    setTimeout(()=>{
      var current_id = 1;
      var interval_id = setInterval(()=>{
         if (current_id == 1){
            $("#overlay-"+current_id).css('-webkit-animation','disappear-to-left 1s').css('animation-fill-mode','forwards');
        }else{
            $("#overlay-"+current_id).css('-webkit-animation','disappear-to-btm 1s').css('animation-fill-mode','forwards');
        }
        current_id++;
        if (current_id==6){clearInterval(interval_id);}
    },100);
  },100);
    setTimeout(()=>{
        $("#overlay-header").css('left','calc(-1 * (100vw - 150px) / 4)');
        $("#overlay-header").css('-webkit-animation','none');
        for (var current_id =1 ; current_id <6; current_id++) {
            if(current_id==1){
                $("#overlay-"+current_id).css('left','calc(-1 * (100vw - 150px) / 4)');
            }else{
                $("#overlay-"+current_id).css('bottom','-25vh');
            }
            $("#overlay-"+current_id).css('-webkit-animation',"none");
        };
    },1500);
    chart_isShown = false;
    },600);
}
function show_region_selecter(){
	var show_button = $("#overlay-header>button");
	var shown_area = $("#overlay-region");

	show_button.click(()=>{
		$("#overlay-region").css('visibility','visible');
	});

	$(document).click(function(e){
		if(!shown_area.is(e.target) && shown_area.has(e.target).length === 0 && !show_button.is(e.target)){
			$("#overlay-region").css("visibility","hidden");
		}
	})

}
function select_region(){
    view_options = {
        'global':{
            center: [30, 0],
            pitch: 0, // pitch in degrees
            bearing: 0, // bearing in degrees
            zoom: 2,
            speed: 0.3,
            curve:1
        },
        'china':{
          center:[90,28],
            pitch: 50, // pitch in degrees
            bearing:0, // bearing in degrees
            zoom: 3.5,
            speed: 0.3,
            curve:1,
            essential: true
        },
        'huadong':{
            center:[120,30],
            pitch: 50, // pitch in degrees
            bearing: 0, // bearing in degrees
            zoom: 6.5,
            speed: 0.3,
            curve:1,
            essential:true
        },
        'huanan':{
            center:[109,21],
            pitch: 50, // pitch in degrees
            bearing: 35, // bearing in degrees
            zoom: 6.5,
            speed: 0.3,
            curve:1,
            essential: true
        },
        'huazhong':{
            center:[111,27],
            pitch: 50, // pitch in degrees
            bearing:25, // bearing in degrees
            zoom: 6.5,
            speed: 0.3,
            curve:1,
            essential: true
        },
        'huabei':{
            center:[110,34],
            pitch: 50, // pitch in degrees
            bearing: 0, // bearing in degrees
            zoom: 6.5,
            speed: 0.3,
            curve:1,
            essential: true
        },
        'xibei':{
            center:[98,35],
            pitch: 50, // pitch in degrees
            bearing: 20, // bearing in degrees
            zoom: 6.5,
            speed: 0.3,
            curve:1,
            essential: true
        },
        'xinan':{
            center:[103,24],
            pitch: 50, // pitch in degrees
            bearing: 15, // bearing in degrees
            zoom: 6.5,
            speed: 0.3,
            curve:1,
            essential: true
        },
        'dongbei':{
            center:[122,43],
            pitch: 50, // pitch in degrees
            bearing: 15, // bearing in degrees
            zoom: 6.5,
            speed: 0.3,
            curve:1,
            essential: true
        },

    };
    region_buttons = $("#overlay-region button");
    region_buttons.each(function(){
        $(this).click(()=>{
            $("#overlay-region").css("visibility","hidden");
            region_id = $(this).attr('id');
            map.flyTo(view_options[region_id]);
            region_data = chart_data[region_id];
            updateAllCharts(region_data);
            var to_chinese ={'global':'全球','china':'中国','huadong':'华东','huanan':'华南','huazhong':'华中','huabei':'华北','xibei':'西北','xinan':'西南','dongbei':'东北'};
            $("#status_text").html('当前展示'+to_chinese[region_id]+'数据');
        })
    })
}
function map_init(){
//  mapboxgl.accessToken = 'pk.eyJ1IjoicGlrYW1vbjExMSIsImEiOiJja3NhZXdxdGkwcTJmMnVxcDYxeHdpNHAzIn0.y9FYPXxUqaLhNRjghWjKkA';
// const map = new mapboxgl.Map({
//     container: 'map',
//     zoom: 0,
//     center: [120, 0],
//     pitch: 0,
//     bearing: 0,
//     style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'
// });
// map.on('load', () => {
//     map.addSource('mapbox-dem', {
//         'type': 'raster-dem',
//         'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
//         'tileSize': 512,
//         'maxzoom': 14
//     });
// // add the DEM source as a terrain layer with exaggerated height
// map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 7 });

// // add a sky layer that will show when the map is highly pitched
// map.addLayer({
//     'id': 'sky',
//     'type': 'sky',
//     'paint': {
//         'sky-type': 'atmosphere',
//         'sky-atmosphere-sun': [0.0, 0.0],
//         'sky-atmosphere-sun-intensity': 15
//     }
// });
// });
mapboxgl.accessToken = 'pk.eyJ1IjoicGlrYW1vbjExMSIsImEiOiJja3NhZXdxdGkwcTJmMnVxcDYxeHdpNHAzIn0.y9FYPXxUqaLhNRjghWjKkA';
const map = new mapboxgl.Map({
    container: 'map',
    style: {//为map构造一个空的style
        "version": 8,
        "sources": {},
        "layers": [],
    },
    center: [120, 0],
    zoom: 0
});

//天地图的token
const tiandituToken = 'd12deb9576426df9aff82075b754790a';
const vecwUrl = 'https://t3.tianditu.gov.cn/img_w/wmts?' +
'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&' +
'TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=' + tiandituToken;
// https://t3.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=
//矢量注记
const cvawUrl = 'https://t3.tianditu.gov.cn/cva_w/wmts?' +
'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&' +
'TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=' + tiandituToken;
map.on('load',()=>{
    addRasterTileLayer(map,vecwUrl,'imgw','imgw');
    
    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });
// add the DEM source as a terrain layer with exaggerated height
map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 7 });
addRasterTileLayer(map,cvawUrl,'cvaw','cvaw');

})
return map;
}
function render_heatmap(data_url){
  //   if (map.getLayer("earthquakes-heat")) {
  //     map.removeLayer("earthquakes-heat");
  // }
  data_name = data_url.slice(data_url.indexOf('ncdata'),data_url.indexOf('.geojson'))
  map.addSource('source_'+data_name, {
    "type": "geojson",
    "data": data_url
});

  map.addLayer({
    "id": "heatmap_"+data_name,
    "type": "heatmap",
    "source": 'source_'+data_name,
    "maxzoom": 7,
    "layout":{
        'visibility': 'none'
    },
    "paint": {
        "heatmap-weight": ["interpolate",["linear"],["get", "prep_modi"],0, 0,0.5,0,1, 1],
        "heatmap-intensity": ["interpolate",["linear"],["zoom"],0, 1,9, 3],
        "heatmap-color": ["interpolate",["linear"],["heatmap-density"],0, "rgba(31,110,212,0)",1, "rgba(247,30,53,1)"],
        "heatmap-radius": ["interpolate",["linear"],["zoom"],0, 3,9, 200],
        "heatmap-opacity": 0.3,
    }
},'cvaw');

  map.addLayer({
    "id": "circle_"+data_name,
    "type": "circle",
    "source": 'source_'+data_name,
    "minzoom": 6,
    "layout":{
        'visibility': 'none'
    },
    "paint": {
        "circle-radius": ["interpolate",["linear"],["zoom"],6,3,13,10],
        "circle-color": ["interpolate",["linear"],["get","positive"],0, "rgba(254,95,85,1)",1,"rgba(38,148,171,1)"],
            // "circle-color":'#fff',
            "circle-stroke-color": "white",
            "circle-stroke-width": 2,
            "circle-opacity": 1
        }
    },'cvaw');
  // map.setPaintProperty('heatmap_s'+data_index,'heatmap-opacity',1);
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

  map.on('mouseenter', "circle_"+data_name, (e) => {
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = 'pointer';

// Copy coordinates array.
const coordinates = e.features[0].geometry.coordinates.slice();
var lon_str = coordinates[0]>0? coordinates[0].toString().slice(0,coordinates[0].toString().indexOf('.')+3)+"E":(coordinates[0]*(-1)).toString().slice(0,coordinates[0].toString().indexOf('.')+3)+"W"
// lon_str = lon_str.slice(0,lon_str.indexOf('.')+3)
var lat_str = coordinates[1]>0? coordinates[1].toString().slice(0,coordinates[1].toString().indexOf('.')+3)+"N":(coordinates[1]*(-1)).toString().slice(0,coordinates[1].toString().indexOf('.')+3)+"S"
// lat_str = lat_str.slice(0,lat_str.indexOf('.')+3)
var prep_str = e.features[0].properties.prep_orig.toString();
prep_str = prep_str.slice(0,prep_str.indexOf('.')+5)
const description = "<table><tr><td><strong>经度:</strong></td><td>"+lon_str+"</td></tr><tr><td><strong>纬度:</strong></td><td>"+lat_str+"</td></tr><tr><td><strong>降水量:\t</strong></td><td>"+prep_str+" mm/day</td></tr><table>";
// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

// Populate the popup and set its coordinates
// based on the feature found.
popup.setLngLat(coordinates).setHTML(description).addTo(map);
});

  map.on('mouseleave', "circle_"+data_name, () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});
};
var shown_heatmap_name = null;
var to_close = null;
function show_heatmap(data_url){
    data_name = data_url.slice(data_url.indexOf('ncdata'),data_url.indexOf('.geojson'))
    map.setLayoutProperty('heatmap_'+data_name,'visibility','visible');
    map.setLayoutProperty('circle_'+data_name,'visibility','visible');
    console.log('打开'+'layer_'+data_name);
    to_close = shown_heatmap_name;

    map.on('render',()=>{
        if (to_close!= null){
            map.setLayoutProperty('heatmap_'+to_close,'visibility','none');
            map.setLayoutProperty('circle_'+to_close,'visibility','none');
            console.log('关闭'+'heatmap_'+to_close);
            to_close = null;
        }
        shown_heatmap_name = data_name;
    });
    
}
var enlarged_chart_number = null;
var heatmap_isShown = false;
var interval_id = null;
function play_next(){
    now_value = parseInt($("input[type='range']").val());
    $("input[type='range']").val((now_value+1)%24);
    var current_time = $("#time").val();
    show_heatmap('http://localhost/globe/v2/data/heatmap/ncdata'+current_time+'.geojson');
}
function inputs_event(){
    //风场按钮（隐藏）
    $("#switch1").click(function(e){
        var cked = $("#switch1").prop("checked");
        if(cked)
        {
            window.windlayer = renderWind();
            map.addLayer(window.windlayer);
        }
        else
        {
            // console.log(cked);
            window.windlayer.remove();
            map.removeLayer('wind');
        }
    });
    //chart按钮（隐藏）
    $("#switch2").click(()=>{
        if(chart_isShown){
            close_charts();
        }else{
            show_charts();
        }
        // chart_isShown?close_charts:show_charts;
    });
    //时间变化range
    $("#time").change(()=>{
        var current_time = $("#time").val();
        show_heatmap('http://localhost/globe/v2/data/heatmap/ncdata'+current_time+'.geojson');
    });
    //charts控件
    $("#control_charts").click(()=>{
        $("#switch2").click();
        if($("#switch2").prop('checked')){
            $("#control_charts .control-button").css('background-color','rgba(255,255,255,0.3)');
        }else{
            $("#control_charts .control-button").css('background-color','rgba(0,0,0,0.3)');
        }
    });
    //风场控件
    $("#control_wind").click(()=>{
        $("#switch1").click();
        if($("#switch1").prop('checked')){
            $("#control_wind .control-button").css('background-color','rgba(255,255,255,0.3)');
        }else{
            $("#control_wind .control-button").css('background-color','rgba(0,0,0,0.3)');
        }
    });
    $("#control_play").click(()=>{
        heatmap_isShown = heatmap_isShown?false:true;
        // show_heatmap('tech_exh/data/ncdata'+0+'.geojson')
        if(heatmap_isShown){
            $("#control_play .control-button").css('background-color','rgba(255,255,255,0.3)');
            interval_id = setInterval(function(){
                play_next();
            },2000);
        }else{
            $("#control_play .control-button").css('background-color','rgba(0,0,0,0.3)');

            clearInterval(interval_id);
        }

    });
    //放大按钮
    for (var i = 1; i <=5; i++) {
        button_selector = "#overlay-"+i+" .enlarge-button";
        $(button_selector).click(function(){
            overlay_index = parseInt($(this).attr('id').slice($(this).attr('id').indexOf('-')+1,$(this).attr('id').length));
            console.log(enlarged_chart_number);
            if(enlarged_chart_number==null){
                enlarge_by_number(overlay_index);
            }else if(enlarged_chart_number===overlay_index){
                ensmall_by_number(enlarged_chart_number);
            }else{
                ensmall_by_number(enlarged_chart_number);
                setTimeout(enlarge_by_number(overlay_index),600);
            }
        });
    };
    // $("#overlay-1 .enlarge-button").click(()=>{
    //         if(enlarged_chart_number==null){
    //             enlarge_by_number(1);
    //         }else{
    //             ensmall_by_number(enlarged_chart_number);
    //             setTimeout(enlarged_chart_number(1),1000);
    //         }
    //     });
    
}
function enlarge_by_number(ct_num){
    if(ct_num===1){
        $("#overlay-1").css('-webkit-animation','enlarge-1 0.6s').css('animation-fill-mode','forwards').css('z-index','999');
        enlarged_chart_number = 1;
        setTimeout(()=>{
            $("#overlay-1").css('width','calc(30px + (100vw - 150px) / 2)');
            $("#overlay-1").css('-webkit-animation','none');
        },600);
    }else if(ct_num===2){
        $("#overlay-2").css('-webkit-animation','enlarge-2 0.6s').css('animation-fill-mode','forwards').css('z-index','999');
        enlarged_chart_number = 2;
        setTimeout(()=>{
            $("#overlay-2").css('width','calc(30px + (100vw - 150px) / 2)').css('height','55vh');
            $("#overlay-2").css('-webkit-animation','none');
        },600);
    }else if(ct_num===3){
        $("#overlay-3").css('-webkit-animation','enlarge-2 0.6s').css('animation-fill-mode','forwards').css('z-index','999');
        enlarged_chart_number = 3;
        setTimeout(()=>{
            $("#overlay-3").css('width','calc(30px + (100vw - 150px) / 2)').css('height','55vh');
            $("#overlay-3").css('-webkit-animation','none');
        },600);
    }else if(ct_num===4){
        $("#overlay-4").css('-webkit-animation','enlarge-2 0.6s').css('animation-fill-mode','forwards').css('z-index','999');
        enlarged_chart_number = 4;
        setTimeout(()=>{
            $("#overlay-4").css('width','calc(30px + (100vw - 150px) / 2)').css('height','55vh');
            $("#overlay-4").css('-webkit-animation','none');
        },600);

    }else if(ct_num===5){
        $("#overlay-5").css('-webkit-animation','enlarge-2 0.6s').css('animation-fill-mode','forwards').css('z-index','999');
        enlarged_chart_number = 5;
        setTimeout(()=>{
            $("#overlay-5").css('width','calc(30px + (100vw - 150px) / 2)').css('height','55vh');
            $("#overlay-5").css('-webkit-animation','none');
        },600);
    }
}
function ensmall_by_number(ct_num){
    if(ct_num===1){
        $("#overlay-1").css('-webkit-animation','ensmall-1 0.6s').css('animation-fill-mode','forwards');
        setTimeout(()=>{
            $("#overlay-1").css('width','calc((100vw - 150px) / 4)').css('-webkit-animation','none').css('z-index','100');
        },600);
        enlarged_chart_number = null;
    }else if(ct_num===2){
        $("#overlay-2").css('-webkit-animation','ensmall-2 0.6s').css('animation-fill-mode','forwards');
        setTimeout(()=>{
            $("#overlay-2").css('width','calc((100vw - 150px) / 4)').css('height','25vh').css('-webkit-animation','none').css('z-index','100');
        },600);
        enlarged_chart_number = null;
    }else if(ct_num===3){
        $("#overlay-3").css('-webkit-animation','ensmall-2 0.6s').css('animation-fill-mode','forwards');
        setTimeout(()=>{
            $("#overlay-3").css('width','calc((100vw - 150px) / 4)').css('height','25vh').css('-webkit-animation','none').css('z-index','100');
        },600);
        enlarged_chart_number = null;
    }else if(ct_num===4){
        $("#overlay-4").css('-webkit-animation','ensmall-2 0.6s').css('animation-fill-mode','forwards');
        setTimeout(()=>{
            $("#overlay-4").css('width','calc((100vw - 150px) / 4)').css('height','25vh').css('-webkit-animation','none').css('z-index','100');
        },600);
        enlarged_chart_number = null;
    }else if(ct_num===5){
        $("#overlay-5").css('-webkit-animation','ensmall-2 0.6s').css('animation-fill-mode','forwards');
        setTimeout(()=>{
            $("#overlay-5").css('width','calc((100vw - 150px) / 4)').css('height','25vh').css('-webkit-animation','none').css('z-index','100');
        },600);
        enlarged_chart_number = null;
    }
}
function bindEvents(map){
 homeFade_video();
 show_region_selecter();
 select_region();
 inputs_event();
}