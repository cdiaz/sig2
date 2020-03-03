
var Lrestaurantes = L.geoJSON(restaurantes, {
  pointToLayer: (feature, latlng) => {
    return L.marker(latlng, {
      icon: L.icon({ iconUrl:'http://localhost:3000/img/restaurant.png', iconSize: [ 36, 36 ] }),
      title: feature.properties.nombre
    })
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.nombre, { closeButton: false });
  }
})


var Lhoteles = L.geoJSON(hoteles, {
  pointToLayer: (feature, latlng) => {
    return L.marker(latlng, {
      icon: L.icon({ iconUrl:'http://localhost:3000/img/hoteles.png', iconSize: [ 46, 46 ] }),
      title: feature.properties.nombre
    })
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.nombre, { closeButton: false });
  }
})


var barrios = L.geoJSON(barrios, {
  style: () => {
    return {
      color: "green",
      "weight": 3,
      "opacity": 0.5
    };
  },
  onEachFeature: (feature, layer) => {
    layer.bindPopup('<h3>'+feature.properties.f2+'</h3>', {closeButton: false})
  }
})

var map = L.map('mapid', {
  layers: [barrios, Lrestaurantes, Lhoteles]
}).setView([1.5694, -75.3258], 16);

this.map.zoomControl.setPosition('bottomright')

var _tileLayer = L.tileLayer('http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png');

var _tileLayerOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
  foo: 'bar', 
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(map)

var _googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

L.Routing.control({
  waypoints: [
    L.latLng(1.567373254106369, -75.3289818763733),
    L.latLng(1.577009484361147, -75.32109618186952)
  ],
  router: new L.Routing.OSRMv1({
    serviceUrl: 'http://localhost:5000/route/v1',
    language: 'es-ES',
  })
}).addTo(map);

var CapasTematicas = {
  "Barrios": barrios,
  "Restaurantes": Lrestaurantes,
  "Hoteles": Lhoteles
};


var CapasBase = {
  "Tilelayer OSM": _tileLayerOSM,
  "Tilelayer Local": _tileLayer,
  "Satelite": _googleSat
};


/* map.on('click', function(e) {
  alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
}); */

L.control.layers(CapasBase, CapasTematicas, {position:'topleft'}).addTo(map);
