// Creating the map object
let map = L.map("map", {
    center: [44.5828, -103.46],
    zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetmap</a> contributors'
}).addTo(map);

// Use this link to get the GeoJSON data.
let link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-mapping-Web/nyc.geojson";

// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
    // Styling each feature (in this case, a neighborhood)
    style: function(feature) {
    return {
        color: "white",
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        fillColor: chooseColor(feature.properties.borough),
        fillOpacity: 0.5,
        weight: 1.5
        };
    },
    // This is called on each feature.
    onEachFeature: function(feature, layer) {
      // Set the mouse events to change the map styling.
        layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
            fillOpacity: 0.9
            });
        },
        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
            fillOpacity: 0.5
            });
        },
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
            map.fitBounds(event.target.getBounds());
        }
        });
      // Giving each feature a popup with information that's relevant to it
        layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

    }
    }).addTo(map);
});
