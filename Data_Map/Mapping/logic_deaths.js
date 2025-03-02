// Function to build the map using selected data from the csv
let myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom:5
});

// Adding the tile layer

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);


d3.json("us-states.json").then(function(data) {

    console.log(data);


    // Create a new choropleth layer
    let geoJson1 = L.choropleth(data, {

        // Define which property in the features to use
        valueProperty: "FirstYearDeaths",

        // Set the color scale
        scale: ["#A3F600", "#B4F12A" ,"#C4E952", "#D4E87A", "#E4E8A1", "#F3D7C7", "#F7B1B6", "#F794A6", "#F77795", "#FF5F65"],
        // scale: ["#FFE0E0", "#E9BDBD", "#E8ACAC", "#DF9494", "#E07676", "#E06060", "#D53D3D", "#C62121", "#AF0E0E", "#870000"],
        // The number of breaks in the step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: function(feature) {
            return {
                // Border color
                color: "#F5F5DC",
                weight: 1,
                fillOpacity: 0.8
            };
        },
        // Each feature applies the same effect to all the features
        onEachFeature: function(feature, layer) {
            // Set the mouse events to change the map styling
            layer.on({
                // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so taht it stands out
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 1.0
                    });
                },
                // When the cursor no longer hovers over a map feature the feature's opacity reverts back to 50%
                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.8
                    });
                }
            });
            // Binding a popup to each later
            layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "COVID-19 Deaths in 2020: " + feature.properties.FirstYearDeaths + "</h2> <hr> <h3>" + "Density: " + feature.properties.density + "</h3>");
        },
    }).addTo(myMap);

    // Add another choropleth layer
    let geoJson2 = L.choropleth(data, {

        // Define which property in the features to use
        valueProperty: "SecondYearDeaths",

        // Set the color scale
        scale: ["#A3F600", "#B4F12A" ,"#C4E952", "#D4E87A", "#E4E8A1", "#F3D7C7", "#F7B1B6", "#F794A6", "#F77795", "#FF5F65"],
        // scale: ["#FFE0E0", "#E9BDBD", "#E8ACAC", "#DF9494", "#E07676", "#E06060", "#D53D3D", "#C62121", "#AF0E0E", "#870000"],

        // The number of breaks in the step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: function(feature) {
            return {
                // Border color
                color: "#F5F5DC",
                weight: 1,
                fillOpacity: 0.8
            };
        },
        // Each feature applies the same effect to all the features
        onEachFeature: function(feature, layer) {
            // Set the mouse events to change the map styling
            layer.on({
                // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so taht it stands out
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 1.0
                    });
                },
                // When the cursor no longer hovers over a map feature the feature's opacity reverts back to 50%
                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.8
                    });
                }
            });
            // Binding a popup to each later
            layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "COVID-19 Deaths in 2021: " + feature.properties.SecondYearDeaths + "</h2> <hr> <h3>" + "Density: " + feature.properties.density + "</h3>");
        },
    }).addTo(myMap);

    let geoJson3 = L.choropleth(data, {

        // Define which property in the features to use
        valueProperty: "ThirdYearDeaths",

        // Set the color scale
        scale: ["#A3F600", "#B4F12A" ,"#C4E952", "#D4E87A", "#E4E8A1", "#F3D7C7", "#F7B1B6", "#F794A6", "#F77795", "#FF5F65"],
        // scale: ["#FFE0E0", "#E9BDBD", "#E8ACAC", "#DF9494", "#E07676", "#E06060", "#D53D3D", "#C62121", "#AF0E0E", "#870000"],

        // The number of breaks in the step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: function(feature) {
            return {
                // Border color
                color: "#F5F5DC",
                weight: 1,
                fillOpacity: 0.8
            };
        },
        // Each feature applies the same effect to all the features
        onEachFeature: function(feature, layer) {
            // Set the mouse events to change the map styling
            layer.on({
                // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so taht it stands out
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 1.0
                    });
                },
                // When the cursor no longer hovers over a map feature the feature's opacity reverts back to 50%
                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.8
                    });
                }
            });
            // Binding a popup to each later
            layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "COVID-19 Deaths in 2022: " + feature.properties.ThirdYearDeaths + "</h2> <hr> <h3>" + "Density: " + feature.properties.density + "</h3>");
        },
    }).addTo(myMap);

    let geoJson4 = L.choropleth(data, {

        // Define which property in the features to use
        valueProperty: "FourthYearDeaths",

        // Set the color scale
        scale: ["#A3F600", "#B4F12A" ,"#C4E952", "#D4E87A", "#E4E8A1", "#F3D7C7", "#F7B1B6", "#F794A6", "#F77795", "#FF5F65"],
        // scale: ["#FFE0E0", "#E9BDBD", "#E8ACAC", "#DF9494", "#E07676", "#E06060", "#D53D3D", "#C62121", "#AF0E0E", "#870000"],

        // The number of breaks in the step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: function(feature) {
            return {
                // Border color
                color: "#F5F5DC",
                weight: 1,
                fillOpacity: 0.8
            };
        },
        // Each feature applies the same effect to all the features
        onEachFeature: function(feature, layer) {
            // Set the mouse events to change the map styling
            layer.on({
                // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so taht it stands out
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 1.0
                    });
                },
                // When the cursor no longer hovers over a map feature the feature's opacity reverts back to 50%
                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.8
                    });
                }
            });
            // Binding a popup to each later
            layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + "COVID-19 Deaths in 2023: " + feature.properties.FourthYearDeaths + "</h2> <hr> <h3>" + "Density: " + feature.properties.density + "</h3>");
        },
    }).addTo(myMap);


    // Add layers to the map 
    // Loop through the different properties to create separate layers on the map
    let layers = {
        "COVID-19 Deaths in 2020": geoJson1,
        "COVID-19 Deaths in 2021": geoJson2,
        "COVID-19 Deaths in 2022": geoJson3,
        "COVID-19 Deaths in 2023": geoJson4,
    };
    // Add the layers to the map
    L.control.layers(null, layers).addTo(myMap);

    
// Set up the legend.
let legend = L.control({ position: "bottomright" });

legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = [69, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000]; // Example limits, adjust if needed
    // let colors = ["#FFE0E0", "#E9BDBD", "#E8ACAC", "#DF9494", "#E07676", "#E06060", "#D53D3D", "#C62121", "#AF0E0E", "#870000"];
    let colors = ["#A3F600", "#B4F12A" ,"#C4E952", "#D4E87A", "#E4E8A1", "#F3D7C7", "#F7B1B6", "#F794A6", "#F77795", "#FF5F65"];
    let labels = [
        '69-5000',
        '5001-10000',
        '10001-15000',
        '15001-20000',
        '20001-25000',
        '25001-30000',
        '30001-35000',
        '35001-40000',
        '40001-45000',
        '45001-48787'
    ];

    // Add the title
    let legendInfo = "<h3>COVID-19 Deaths</h3>" + "<h4>Years 2020-2023</h4>";

    div.innerHTML = legendInfo;

    // Create a list of color boxes and labels
    for (let i = 0; i < limits.length; i++) {
        div.innerHTML +=
            '<div class="legend-item">' +
            '<i style="background:' + colors[i] + '"></i> ' +
            labels[i] + '<br>';
    }

    return div;
};

// Adding the legend to the map
legend.addTo(myMap);

});
