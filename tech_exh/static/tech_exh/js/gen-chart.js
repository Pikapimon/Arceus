var chart1_option = {
    chartid : "myChart1",
    area :"#chart-1",
    data :[0.667, 0.262, 0.661, -0.045, 0.687, 0.462,0.927,0.396,0.804,0.583,0.311,0.423,0.34, 0.097,0.388, 0.077, -0.29, -0.427,-0.105,0.765,-0.038,-0.065,0.099,0.076],
    label:'气温',
    color:['rgba(255, 126, 79, 1)','rgba(255, 226, 170, 1)','rgba(89, 255, 211, 1)','rgba(79, 146, 255, 1)'],
    borderColor:['rgba(89, 255, 211, 1)','rgba(255, 126, 79, 1)']
}
var chart2_option = {
    chartid : "myChart2",
    area :"#chart-2",
    data :[0.667, 0.262, 0.661, -0.045, 0.687, 0.462,0.927,0.396,0.804,0.583,0.311,0.423,0.34, 0.097,0.388, 0.077, -0.29, -0.427,-0.105,0.765,-0.038,-0.065,0.099,0.076],
    label:'降水',
    color:['rgba(79, 146, 255, 1)','rgba(89, 255, 211, 1)','rgba(0, 0, 0, 0)','rgba(0, 0, 0, 0)'],
    borderColor:['rgba(89, 255, 211, 1)','rgba(89, 255, 211, 1)']
}
var chart3_option = {
    chartid : "myChart3",
    area :"#chart-3",
    data :[0.667, 0.262, 0.661, -0.045, 0.687, 0.462,0.927,0.396,0.804,0.583,0.311,0.423,0.34, 0.097,0.388, 0.077, -0.29, -0.427,-0.105,0.765,-0.038,-0.065,0.099,0.076],
    label:'湿度',
    color:['rgba(153, 89, 255, 1)','rgba(79, 167, 255, 1)','rgba(0, 0, 0, 0)','rgba(0, 0, 0, 0)'],
    borderColor:['rgba(153, 89, 255, 1)','rgba(153, 89, 255, 1)']
}
var chart4_option = {
    chartid : "myChart4",
    area :"#chart-4",
    data :[0.667, 0.262, 0.661, -0.045, 0.687, 0.462,0.927,0.396,0.804,0.583,0.311,0.423,0.34, 0.097,0.388, 0.077, -0.29, -0.427,-0.105,0.765,-0.038,-0.065,0.099,0.076],
    label:'气压',
    color:['rgba(250, 254, 255, 1)','rgba(156, 214, 255, 1)','rgba(0, 0, 0, 0)','rgba(0, 0, 0, 0)'],
    borderColor:['rgba(250, 254, 255, 1)','rgba(156, 214, 255, 1)']
}
var chart5_option = {
    chartid : "myChart5",
    area :"#chart-5",
    data :[0.667, 0.262, 0.661, -0.045, 0.687, 0.462,0.927,0.396,0.804,0.583,0.311,0.423,0.34, 0.097,0.388, 0.077, -0.29, -0.427,-0.105,0.765,-0.038,-0.065,0.099,0.076],
    label:'光照',
    color:['rgba(156, 255, 222, 1)','rgba(255, 230, 3, 1)','rgba(0, 0, 0, 0)','rgba(0, 0, 0, 0)'],
    borderColor:['rgba(156, 255, 222, 1)','rgba(156, 255, 222, 1)']
}

var chart1 = genChart(chart1_option);
var chart2 = genChart(chart2_option);
var chart3 = genChart(chart3_option);
var chart4 = genChart(chart4_option);
var chart5 = genChart(chart5_option);

function updateData(chart,data,chart_option) {
    var len = chart.data.datasets[0].data.length;
    for (var i = 0; i < len; i++) {
        chart.data.datasets[0].data.pop();
    }
    for (var i = 0; i < len; i++) {
        chart.data.datasets[0].data.push(data[i]);
    }
    chart.data.datasets[0].backgroundColor = function(context) {
        const chart1 = context.chart;
        const {ctx, chartArea} = chart1;
    if (!chartArea) {return null;}// This case happens on initial chart load
    var background_positive = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
    background_positive.addColorStop(0, chart_option.color[0]);
    background_positive.addColorStop(0.8, chart_option.color[1]);
    var background_negative = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
    background_negative.addColorStop(0.7, chart_option.color[2]);
    background_negative.addColorStop(1, chart_option.color[3]);

    return data.map((value)=>value>0?background_positive:background_negative);
};
chart.data.datasets[0].borderColor = function(context){
    return data.map((value)=>value>0?chart_option.borderColor[1]:chart_option.borderColor[0]);
};
chart.update();
};
function updateAllCharts(all_data){
    updateData(chart1,all_data['temp2'],chart1_option);
    updateData(chart2,all_data['tprep'],chart2_option);
    updateData(chart3,all_data['rh'],chart3_option);
    updateData(chart4,all_data['slp'],chart4_option);
    updateData(chart5,all_data['srads'],chart5_option);
}
let width, height, gradient;
function getGradient(ctx,chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, '#4F92FF');
    gradient.addColorStop(0.37,'#59FFD3');
    gradient.addColorStop(0.37,'#593333');
    gradient.addColorStop(1, '#FF7E4F');

}

return gradient;
}

function genChart(chart_option){
    mydata = chart_option.data;
    $(chart_option.area).append("<canvas id='"+chart_option.chartid+"' ></canvas>")
    .css('background-color','rgba(255,255,255,0)');
    // .css('height','85%');
    let ctx = document.getElementById(chart_option.chartid).getContext('2d');

    var myChart = new Chart(ctx,{
        type: 'bar',
        data: {
            labels: ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05', '2020/06','2020/07','2020/08','2020/09','2020/10','2020/11','2020/12','2020/01', '2020/02', '2020/03', '2020/04', '2020/05', '2020/06','2020/07','2020/08','2020/09','2020/10','2020/11','2020/12'],
            datasets: [{
                label: chart_option.label,
                data:mydata,
                backgroundColor:function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;
                    if (!chartArea) {return null;}// This case happens on initial chart load
                    var background_positive = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
                    background_positive.addColorStop(0, chart_option.color[0]);
                    background_positive.addColorStop(0.8, chart_option.color[1]);
                    var background_negative = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
                    background_negative.addColorStop(0.7, chart_option.color[2]);
                    background_negative.addColorStop(1, chart_option.color[3]);

                    return mydata.map((value)=>value>0?background_positive:background_negative);
                },
                borderColor: function(context){
                    return mydata.map((value)=>value>0?chart_option.borderColor[1]:chart_option.borderColor[0]);
                },
                borderWidth: 1,
                borderRadius: 5,
                barPercentage: 0.6,
            }]
        },

        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins:{
                tooltip:{enabled: false},
                legend: {
                    display: false,
                    labels: {
                        font:{size:20},
                        color:'rgba(255,255,255,1)'
                    }
                },
                title:{
                    display:false,
                    text:'温度',
                    position:'bottom',
                    color:'rgba(255,255,255,1)',
                    font:{size:25}
                }
            },
            scales:{
                x:{
                    grid:{
                        display:false,
                        drawBorder:false,
                    },
                    ticks:{
                        color:'rgba(255,255,255,1)',
                    // font:{size:0}
                },
            },
            y:{
                grid:{
                    drawBorder:false,
                },
                ticks:{
                    color:'rgba(255,255,255,1)',
                    font:{size:0}
                }
            }
        },
        "hover": {
            mode:null
      },
      "animation": {
        "duration": 1,
        "onComplete": function(context) {
            let ctx = document.getElementById(chart_option.chartid).getContext('2d');
                // ctx.font = Chart.helpers.fontString(Chart.defaults.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                const chart = context.chart;
                ctx.font = "10px serif";
                ctx.fillStyle = "#FFFFFF"
                this.data.datasets.forEach(function(dataset, i) {
                    var meta = chart.getDatasetMeta(i);
                  dataset.data.forEach(function(data,i) {
                    if(data>=0){
                        data = data.toString();
                        data = data.slice(0,data.indexOf(".")+3);
                        ctx.fillText(data, meta.data[i].x-10, meta.data[i].y-5);
                    }else{
                        data = data.toString();
                        data = data.slice(0,data.indexOf(".")+3);
                        ctx.fillText(data, meta.data[i].x-10, meta.data[i].y+10);
                    }
                    
                });
              });
            }
        },
    },
});
return myChart;
}


// function genChart2(){
//     $("#chart-2").append("<canvas id='myChart2' ></canvas>").css('background-color','white');
//     let ctx = document.getElementById('myChart2').getContext('2d');
//     var myChart = new Chart(ctx,{
//         type: 'bar',
//         data: {
//             datasets: [{
//                 data: [20, 50, 100, 75, 25, 0],
//                 label: 'Left dataset',
//                 yAxisID: 'left-y-axis',
//                 backgroundColor:"blue",
//                 borderColor:"red"
//             }, {
//                 data: [0.1, 0.5, 1.0, 2.0, 1.5, 0],
//                 label: 'Right dataset',
//                 yAxisID: 'right-y-axis'
//             }],
//             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
//         },
//         options: {
//             maintainAspectRatio: false,
//             responsive: true,
//             plugins:{
//                 title:{
//                     text:"降水",
//                     display:true,
//                     position:'bottom',
//                 }
//             },
//             scales: {
//                 yAxes: [{
//                     id: 'left-y-axis',
//                     type: 'linear',
//                     position: 'left'
//                 }, {
//                     id: 'right-y-axis',
//                     type: 'linear',
//                     position: 'top'
//                 }]
//             }
//         }
//     });
// }