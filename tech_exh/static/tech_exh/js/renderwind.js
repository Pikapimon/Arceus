function renderWind(map){
  const color = {
    wind: [
    [0,[98,113,183,255]],
    [1,[57,97,159,255]],
    [3,[74,148,169,255]],
    [5,[77,141,123,255]],
    [7,[83,165,83,255]],
    [9,[53,159,53,255]],
    [11,[167,157,81,255]],
    [13,[159,127,58,255]],
    [15,[161,108,92,255]],
    [17,[129,58,78,255]],
    [19,[175,80,136,255]],
    [21,[117,74,147,255]],
    [24,[109,97,163,255]],
    [27,[68,105,141,255]],
    [29,[92,144,152,255]],
    [36,[125,68,165,255]],
    [46,[231,215,215,255]],
    [51,[219,212,135,255]],
    [77,[205,202,112,255]],
    [104,[128,128,128,255]]
    ],
  };

 
    fetch('http://78.141.244.84:8000/static/tech_exh/data/wind.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data = data.map((item, idx) => {
        item.header = Object.assign(item.header, {
          parameterCategory: 1,
          parameterNumber: idx === 0 ? 2 : 3,
        });
        return item;
      });

      const windInterpolateColor = color.wind.reduce((result, item, key) => result.concat(item[0], 'rgba(' + item[1].join(',') + ')'), []);

      window.windLayer = new mapboxWind.WindLayer('wind', data, {
        windOptions: {
          // colorScale: (m) => {
          //     // console.log(m);
          //     return '#aaa';
          //   },
            colorScale: [
              "rgb(36,104, 180)",
              "rgb(60,157, 194)",
              "rgb(128,205,193 )",
              "rgb(151,218,168 )",
              "rgb(198,231,181)",
              "rgb(238,247,217)",
              "rgb(255,238,159)",
              "rgb(252,217,125)",
              "rgb(255,182,100)",
              "rgb(252,150,75)",
              "rgb(250,112,52)",
              "rgb(245,64,32)",
              "rgb(237,45,28)",
              "rgb(220,24,32)",
              "rgb(180,0,35)"
            ],
            // velocityScale: 1 / 20,
            frameRate: 60,
            maxAge: 600,
            globalAlpha: 0.95,
            velocityScale: 0.05,
            lineWidth:5,
            paths: 5000,
          },
        });

      // console.log(map, window.windLayer);
      // console.log(window.windLayer);
       // map.addLayer(window.windLayer);  
       // map.removeLayer("wind");
       // map.addLayer(window.windLayer);
      // console.log(map.getStyle().layers);
      // window.windLayer.addTo(map);
    });

  return window.windLayer;
}