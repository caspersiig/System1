 // initialize Leaflet

 var map = L.map('map').setView([56.1631694, 10.2196941], 11);

 // add the OpenStreetMap tiles
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
 }).addTo(map);

 kortdata = JSON.parse(document.getElementById("kortdata").value);

 // show the scale bar on the lower left corner
 L.control.scale({imperial: true, metric: true}).addTo(map);

 // show a marker on the map
for (let i = 0; i < kortdata.length; i++) {
  L.marker([kortdata[i].Placering.latitude, kortdata[i].Placering.longitude]).bindPopup(kortdata[i].Adresse).addTo(map);
}
