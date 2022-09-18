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
};
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
};
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
};
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
            center: [70, 0],
            pitch: 0, // 50
            bearing: 0, // bearing in degrees
            zoom: 1,
            speed: 0.3,
            curve:1
        },
        'china':{
          center:[90,28],
            pitch: 0, // 50
            bearing:0, // bearing in degrees
            zoom: 3.5,
            speed: 0.5,
            curve:3,
            essential: true
        },
        'huadong':{
            center:[120,30],
            pitch: 0, // 50
            bearing: 0, // bearing in degrees
            zoom: 6,
            speed: 0.5,
            curve:3,
            essential:true
        },
        'huanan':{
            center:[109,21],
            pitch: 0, // 50
            bearing: 0, // bearing in degrees
            zoom: 6.5,
            speed: 0.5,
            curve:3,
            essential: true
        },
        'huazhong':{
            center:[111,27],
            pitch: 0, // 50
            bearing:0, // bearing in degrees
            zoom: 6.5,
            speed: 0.5,
            curve:3,
            essential: true
        },
        'huabei':{
            center:[114,38],
            pitch: 0, // 50
            bearing: 0, // bearing in degrees
            zoom: 5.5,
            speed: 0.5,
            curve:3,
            essential: true
        },
        'xibei':{
            center:[98,35],
            pitch: 0, // 50
            bearing: 0, // bearing in degrees
            zoom: 6.5,
            speed: 0.5,
            curve:3,
            essential: true
        },
        'xinan':{
            center:[103,24],
            pitch: 0, // 50
            bearing: 0, // bearing in degrees
            zoom: 6.5,
            speed: 0.5,
            curve:3,
            essential: true
        },
        'dongbei':{
            center:[123,43],
            pitch: 0, // 50
            bearing: 0, // bearing in degrees
            zoom: 5,
            speed: 0.5,
            curve:3,
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
            $("#overlay-header>button").html(to_chinese[region_id])
        })
    })
}
function map_init(){
    mapboxgl.accessToken = 'pk.eyJ1IjoicGlrYW1vbjExMSIsImEiOiJja3NhZXdxdGkwcTJmMnVxcDYxeHdpNHAzIn0.y9FYPXxUqaLhNRjghWjKkA';
    const map = new mapboxgl.Map({
        container: 'map',
        style:'mapbox://styles/mapbox/satellite-streets-v11',
        center: [120, 0],
        zoom: 3,
        projection: 'globe'
    });
    map.on('load',()=>{
        // map.addSource('mapbox-dem', {
        //     'type': 'raster-dem',
        //     'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        //     'tileSize': 512,
        //     'maxzoom': 2,
        // });
        //map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 7 });
        map.setFog({});
        window.windlayer = renderWind(map);
        map.addLayer(window.windlayer);
    });
    return map;
}
function set_mode1(){
    map.setLayoutProperty('continents','visibility','none');
    for(var i = 0;i<24;i++){
        map.setPaintProperty('contourf_'+i,'fill-opacity',0.2);
    }
}
function set_mode2(){
    map.setLayoutProperty('continents','visibility','visible');
    for(var i = 0;i<24;i++){
        map.setPaintProperty('contourf_'+i,'fill-opacity',1);
    }
}
function render_continents(){
    map.addSource('source_continents', {
        "type": "geojson",
        "data": '/static/tech_exh/data/continents/continents.geojson'
    });
    map.addLayer({
        'id':'continents',
        'type':'line',
        'source':'source_continents',
        'paint':{
            'line-color':'#000',
            'line-width':2
        },
        "layout":{
            // 'line-join': 'round',
            // 'line-cap': 'round',
            'visibility': 'none'
        },
    });
}
function render_contour_byImage(data_url){
    data_index = data_url.slice(data_url.indexOf('pic/')+4,data_url.indexOf('.png'))
    map.addSource('source_im_'+data_index, {
        'type': 'image',
        'url': data_url,
        'coordinates': [
        [0, 70],
        [360, 70],
        [360, -70],
        [0, -70]
        ]
    });
    map.addLayer({
        id: 'contourIm_'+data_index,
        'type': 'raster',
        'source': 'source_im_'+data_index,
        'paint': {
            'raster-fade-duration': 0,
            'raster-opacity':0.5
        },
        "layout":{
            'visibility': 'none'
        }
    });
}
function render_countour(data_url){
    data_index = data_url.slice(data_url.indexOf('contour_line/contour')+20,data_url.indexOf('.geojson'));
    console.log(data_index);
    map.addSource('contour_source_'+data_index, {
        "type": "geojson",
        "data": data_url
    });
    map.addSource('contourf_source_'+data_index,{
        'type':'geojson',
        'data':data_url.slice(0,data_url.indexOf('contour_line/contour')+13)+'contourf'+data_index+'.geojson'
    })
    map.addLayer({
        'id':'contourf_'+data_index,
        'type':'fill',
        'source':'contourf_source_'+data_index,
        "maxzoom": 5.5,
        'paint':{
            'fill-color':['get','stroke'],
            'fill-opacity':0.2
        },"layout":{
            'visibility': 'none'
        },

    });
    map.addLayer({
        'id':'contour_'+data_index,
        'type':'line',
        "maxzoom": 5.5,
        'source':'contour_source_'+data_index,
        'paint':{
            'line-color':'white',
            'line-width':2,
            // 'line-dasharray':['get','level-index']
        },
        "layout":{
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'none'
        },
    });
    // const popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     closeOnClick: false
    // });
    // map.on('click', "contour_"+data_index, (e) => {
    // map.getCanvas().style.cursor = 'pointer';
    // // Copy coordinates array.
    // const coordinates = e.features[0].geometry.coordinates[0].slice();
    // var lon_str = coordinates[0]>0? coordinates[0].toString().slice(0,coordinates[0].toString().indexOf('.')+3)+"E":(coordinates[0]*(-1)).toString().slice(0,coordinates[0].toString().indexOf('.')+3)+"W"
    // lon_str = lon_str.slice(0,lon_str.indexOf('.')+3)
    // var lat_str = coordinates[1]>0? coordinates[1].toString().slice(0,coordinates[1].toString().indexOf('.')+3)+"N":(coordinates[1]*(-1)).toString().slice(0,coordinates[1].toString().indexOf('.')+3)+"S"
    // lat_str = lat_str.slice(0,lat_str.indexOf('.')+3)
    // const description = "<table><tr><td><strong>经度:</strong></td><td>"+lon_str+"</td></tr><tr><td><strong>纬度:</strong></td><td>"+lat_str+"</td></tr><tr><td><strong>气温（距平）:\t</strong></td><td> °C</td></tr><table>";
    // // Ensure that if the map is zoomed out such that multiple
    // // copies of the feature are visible, the popup appears
    // // over the copy being pointed to.
    // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    // }

    // // Populate the popup and set its coordinates
    // // based on the feature found.
    // popup.setLngLat(coordinates).setHTML(description).addTo(map);
    // });

    // map.on('mouseleave', "circle_"+data_index, () => {
    //     map.getCanvas().style.cursor = '';
    //     popup.remove();
    // });
}
function render_heatmap(data_url){
  heatmap_colors = ['rgba(31,82,216,1)','rgba(33,105,235,1)','rgba(49,127,248,1)','rgba(64,142,239,1)','rgba(116,164,238,1)','rgba(136,198,252,1)','rgba(168,238,251,1)','rgba(216,255,253,1)','rgba(255,224,225,1)','rgba(254,184,192,1)','rgba(243,140,140,1)','rgba(216,122,120,1)','rgba(223,89,96,1)','rgba(222,57,65,1)','rgba(179,41,49,1)'];
  heatmap_color = heatmap_colors[data_url.slice(data_url.indexOf('level')+5,data_url.indexOf('.geojson'))];
  data_name = data_url.slice(data_url.indexOf('temp'),data_url.indexOf('.geojson'))
  map.addSource('source_'+data_name, {
    "type": "geojson",
    "data": data_url
});
  let num = parseInt(data_name.slice(data_name.indexOf('level')+5,data_name.indexOf('.geojson')));
  if(num>5 && num <14){heatmap_color = 'rgba(0,0,0,0)';}
  map.addLayer({
    "id": "heatmap_"+data_name,
    "type": "heatmap",
    "source": 'source_'+data_name,
    "maxzoom": 9,
    "layout":{
        'visibility': 'none'
    },
    "paint": {
        "heatmap-weight": ["interpolate",["linear"],["get", "prep_orig"],-10, 0.5,10, 0.5],
        "heatmap-intensity": ["interpolate",["linear"],["zoom"],0, 1,9, 3],
        "heatmap-color": ["interpolate",["linear"],["heatmap-density"],0, 'rgba(0,0,0,0)',1, heatmap_color],
        "heatmap-radius": ["interpolate",["linear"],["zoom"],0, 5,9, 300],
        "heatmap-opacity": 0.2,
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
        "circle-radius": ["interpolate",["linear"],["zoom"],6,6,13,12],
        // "circle-color": ["interpolate",["linear"],["get","positive"],0, "rgba(254,95,85,1)",1,"rgba(38,148,171,1)"],
        "circle-color":'rgba(38,148,171,1)',
        "circle-stroke-color": "white",
        "circle-stroke-width": 2,
        "circle-opacity": 1
    }
},'cvaw');
  // map.setPaintProperty('heatmap_s'+data_index,'heatmap-opacity',1);

};
var shown_heatmap_name = null;
var to_close = null;
function close_(time_num){
    map.setLayoutProperty('contourf_'+time_num,'visibility','none');
    map.setLayoutProperty('contour_'+time_num,'visibility','none');
}
function show_(time_num){
    map.setLayoutProperty('contourf_'+time_num,'visibility','visible');
    map.setLayoutProperty('contour_'+time_num,'visibility','visible');
    console.log('打开'+time_num);
        shown_heatmap_name = time_num;
    };
    var enlarged_chart_number = null;
    var heatmap_isShown = false;
    var interval_id = null;
    function play_next(){
        now_value = parseInt($("input[type='range']").val());
        $("input[type='range']").val((now_value+1)%24);
        var current_time = $("#time").val();
        close_(now_value);
        show_(current_time);
        // map.on('render',()=>{
        // })
        all_charts.forEach(function(chart){
            chart.update();
        });

    };
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
            console.log(cked);
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
    // $("#time").on('input propertychange',function(){
    //     // time_buttons = $("#overlay-time-select button");
    //     // time_buttons[i].css('color','black')
    //     console.log('kk')
    // });
    //charts控件
    $("#control_charts").click(()=>{
        $("#switch2").click();
        if($("#switch2").prop('checked')){
            $("#control_charts .control-button")
            .css('background-color','rgba(255,255,255,1)')
            .css('color','black');
            $("#control_charts img").attr('src','/static/tech_exh/img/charts_black.svg');
            $("#control_charts .title").html('关闭图表')

        }else{
            $("#control_charts .control-button")
            .css('background-color','rgba(0,0,0,0.3)')
            .css('color','white');
            $("#control_charts img").attr('src','/static/tech_exh/img/charts_white.svg');
            $("#control_charts .title").html('显示图表')
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
    // $("#control_play").click(()=>{
    //     $("#switch4").click();
    //     if($("#switch4").prop('checked')){F
    //         $("#control_play .control-button")
    //         .css('background-color','rgba(255,255,255,1)')
    //         .css('color','black');
    //         $("#control_play img").attr('src','/static/tech_exh/img/zanting.svg');
    //         $("#control_play .title").html('暂停滚动')

    //         interval_id = setInterval(function(){
    //             // console.log('#time'+($("#time").val()))
    //             play_next();
    //             for(var j = 0;j<24;j++){
    //                 $('#time'+j).css('color','gray')
    //             }
    //             $('#time'+($("#time").val())).css('color','black');
    //         },2000);
    //     }else{
    //         $("#control_play .control-button")
    //         .css('background-color','rgba(0,0,0,0.3)')
    //         .css('color','white');
    //         $("#control_play img").attr('src','/static/tech_exh/img/icon-play.svg');
    //         $("#control_play .title").html('滚动播放');

    //         clearInterval(interval_id);
    //     }

    // });
    $("#control_mode2").click(()=>{
        $("#switch3").click();
        if($("#switch3").prop('checked')){
            set_mode2();
            $("#control_mode2 img").attr('src','/static/tech_exh/img/contour.svg');
            $("#control_mode2 .title").html('边界图')
        }else{
            set_mode1();
            $("#control_mode2 img").attr('src','/static/tech_exh/img/earth.svg');
            $("#control_mode2 .title").html('地形图')
        }
    })
    //放大按钮
    for (var i = 1; i <=5; i++) {
        button_selector = "#overlay-"+i+" .enlarge-button";
        $(button_selector).click(function(){
            overlay_index = parseInt($(this).attr('id').slice($(this).attr('id').indexOf('-')+1,$(this).attr('id').length));
            if(enlarged_chart_number==null){
                enlarge_by_number(overlay_index);
            }else if(enlarged_chart_number===overlay_index){
                ensmall_by_number(enlarged_chart_number);
            }else{
                ensmall_by_number(enlarged_chart_number);
                setTimeout(function(){enlarge_by_number(overlay_index)},600);
            }
        });
    };

}
function enlarge_by_number(ct_num){
    all_charts[ct_num-1].options.plugins.tooltip.enabled = false;
    all_charts[ct_num-1].update();
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
    all_charts[ct_num-1].options.plugins.tooltip.enabled = true;
    all_charts[ct_num-1].update();
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
function select_time_event(){
    time_buttons = $("#overlay-time-select button");
    for(var i = 0;i<24;i++){
     $(time_buttons[i]).click(function(){
        if($("#switch4").prop('checked')){
            $("#control_play").click();
        }
        now_value = parseInt($("#time").val());
        time_id = $(this).attr('id');
        index = parseInt(time_id.slice(4,time_id.length))
        $("#time").val(index);
        for(var j = 0;j<24;j++){
            $(time_buttons[j]).css('color','gray')
        }
        $(time_buttons[index]).css('color','black')
        var current_time = $("#time").val();
        close_(now_value);
        show_(current_time);
        // map.on('render',()=>{

        // })
        all_charts.forEach(function(chart){
            chart.update();
        });
    });
 };
 var show_button2 = $("#control_time");
 var shown_area2 = $("#overlay-time-select");
 show_button2.click(()=>{
    $("#overlay-time-select").css('visibility','visible');
});

 $(document).click(function(e){
    if(shown_area2.has(e.target).length === 0 && !show_button2.is(e.target) && !show_button2.has(e.target).length===0){
        $("#overlay-time-select").css("visibility","hidden");
    }
})
}
function bindEvents(map){
 homeFade_video();
 show_region_selecter();
 select_region();
 inputs_event();
 select_time_event();
}
