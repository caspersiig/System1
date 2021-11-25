 // initialize Leaflet

 var map = L.map('map').setView([56.1631694, 10.2196941], 13);

 // add the OpenStreetMap tiles
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
 }).addTo(map);

 // show the scale bar on the lower left corner
 L.control.scale({imperial: true, metric: true}).addTo(map);

 // show a marker on the map
 L.marker([56.1631694, 10.2196941]).bindPopup('Ammis Butterchicken').addTo(map);
