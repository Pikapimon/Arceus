
function changeStyle(mapstyle){
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/'+mapstyle+'-v9',
    attribution:'Imagery &copy <a href="https://www.mapbox.com/">Mapbox</a>', 
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
};
function getColor(d) {
    return d > 16 ? '#800026' :
           d > 14  ? '#BD0026' :
           d > 12  ? '#E31A1C' :
           d > 10  ? '#FC4E2A' :
           d > 8   ? '#FD8D3C' :
           d > 6   ? '#FEB24C' :
           d > 4   ? '#FED976' :
                      '#FFEDA0';
};
function style(feature) {
    return {
        fillColor: getColor(feature.properties.childrenNum),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
};
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
};
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
};
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
};
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


