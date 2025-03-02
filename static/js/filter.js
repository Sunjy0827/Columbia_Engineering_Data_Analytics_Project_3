// List of filters and their corresponding columns in the CSV
var filters = [
    { id: "selDataset1", column: "Year" },
    // { id: "selDataset2", column: "Month" },
    { id: "selDataset2", column: "State" },
    { id: "selDataset3", column: "Age Group"}
];

// Function to populate dropdowns
function populateDropdown(data, filter) {
    var selectElement = document.getElementById(filter.id);
    
    // Create and add "Select All" option
    var selectAllOption = document.createElement("option");
    selectAllOption.value = "all";
    selectAllOption.text = "Select All";
    selectElement.add(selectAllOption);
    
    // Extract unique values from the specified column
    var uniqueValues = Array.from(new Set(data.map(item => item[filter.column])));

    // Populate the dropdown with the unique values
    uniqueValues.forEach(function(value) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        selectElement.add(option);
    });
}

// Load and process the CSV file for all filters
d3.csv("Resources/cleaned_covid_data.csv").then(function(data) {
    
    // Ensure data is loaded
    console.log("Data loaded:", data);

    // Loop through all filters and populate each dropdown
    filters.forEach(function(filter) {
        populateDropdown(data, filter);
    });
    
}).catch(function(error) {
    console.error("Error loading or parsing the CSV file:", error);
});

// function to add options 

function optionChanged(selectElement) {
    var selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
    console.log(selectedOptions); // Logs the selected years
}

function optionChanged(selectedValue) {
    if (selectedValue === "all") {
        console.log("All states selected");
        // Handle the "Select All" logic here
    } else {
        console.log("Selected state:", selectedValue);
        // Handle the individual state selection logic here
    }
}

