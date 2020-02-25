var map = L.map('mapid').setView([1.5694, -75.3258], 16);

console.log(typeof(data));


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
  foo: 'bar', 
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(map);

L.geoJSON(data, {
}).bindPopup(function (layer) {
  return layer.feature.properties.f2;
}).addTo(map);

console.log(data);