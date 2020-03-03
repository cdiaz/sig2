//var geoJsonLayer = L.geoJson().addTo(map);

fetch('/restaurantes').then(response => {
  return response.json();
}).then(r => {
  
  L.geoJSON(r, {
    pointToLayer: (feature, latlng) => {
      return L.marker(latlng, {
        icon: L.icon({ iconUrl:'http://localhost:3000/img/restaurant.png', iconSize: [ 56, 56 ] }),
        title: feature.properties.nombre
      })
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.nombre, { closeButton: false });
    }
  }).addTo(map);
});

var barrios = L.geoJSON(data, {
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
  layers: [barrios]
}).setView([1.5694, -75.3258], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
  foo: 'bar', 
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(map);

this.map.zoomControl.setPosition('bottomright')


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

var overlayMaps = {
  "Barrios": barrios
};

map.on('click', function(e) {
  alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
});

L.control.layers(null, overlayMaps, {position:'topleft'}).addTo(map);
