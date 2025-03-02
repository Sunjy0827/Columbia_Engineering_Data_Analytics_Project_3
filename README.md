# Columbia_Engineering_Data_Analytics_Project_3

<h2>Data Visualization Project with COVID Dataset</h2>

<h3>Overview</h3>

<p> 
This project aims to build a dashboard that tracks the overall impact of the COVID-19 pandemic in the U.S. during 2020. The data, sourced from Data.gov, includes details about patients with different health conditions across various states. By narrowing down the data to focus on those who were affected or died from COVID-19, the dashboard reveals how severely the pandemic impacted each state.

</p>

<hr/>

<h3>Goal</h3>

<ul>
<li>Understainding dataset</li>
<li>Cleaning dataset</li>
<li>Preprocessing dataset</li>
<li>Using HTML to build a dashbaord structure</li>
<li>Using CSS to style classes and ids in HTML</li>
<li>Using Javascripts to build interactive charts</li>
</li>
</ul>

</hr>

<h3>Tools and Techniques</h3>

<ul>
<li>Python</li>
<li>Pandas</li>
<li>HTML</li>
<li>CSS</li>
<li>Javascripts</li>
</ul>

<hr/>

<h3>Project Structure</h3>

<h4>Part I: Data Cleaning Process</h4>

<p>Streamline the dataset by removing extraneous information and refining or reconstructing it to enhance visualization efficiency.</p>

```
# Filter the csv based on these parameters:
# Condition: COVID-19
# Age Group: Filter out "All Ages"
# Group: Show data "By Month"
# States: Filter out "New York City", "District of Columbia", "Puerto Rico", and "United States"

filtered_covid_data = filtered_covid_data[
    (filtered_covid_data["Condition"] == "COVID-19") &
    (filtered_covid_data["Group"] == "By Month") &
    ~(filtered_covid_data["State"].isin(["District of Columbia", "New York City", "Puerto Rico", "United States"])) &
    ~(filtered_covid_data["Age Group"].isin(["All Ages"]))
]

```
<hr/>

<h4>Part II: Filter and Chart</h4>
</br>

<p>
Create a variable with the name "filters," and make the list of unique values as filter for columns Year, State, and Age Group. The function populateDropdown with two parameters (data, and filter) creates a dropdown menu based on unique values in a dataset column, useful for filtering or selecting specific data points in an interactive web application. The "Select All" option is a common feature to allow users to reset filters or view all data.

```
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
```

<h4>Part III: Load Data with D3</h4>

<p>
By using d3 javascript library, load the cleaned csv file named "cleaned_covid_data.csv." Make sure the data is loaded by printing the message and use the above custom function "PopulateDropdown" to get the unique values for the filter.
</p>

```
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
```

<h4>Part IV: Option Chanage</h4>

<p>
The first function optionChanged(selectElement) retrieves an HTMLCollection of all currently selected option elements in the dropdown. "Array.from(para1, para2).map(option => option.value)" extracts the value attribute from each selected option

```
function optionChanged(selectElement) {
    var selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
    console.log(selectedOptions); // Logs the selected years
}
```
The second function optionChanged() represents the selected option from a dropdown. This function does not allow you to have multiple selections. This one is specifically written for the "select all" option.

```
function optionChanged(selectedValue) {
    if (selectedValue === "all") {
        console.log("All states selected");
        // Handle the "Select All" logic here
    } else {
        console.log("Selected state:", selectedValue);
        // Handle the individual state selection logic here
    }
}
```
In JavaScript, you cannot have two functions with the same name and different parameters in the same scope without one overwriting the other. If both are defined in the same file or scope, the second definition will replace the first, and only the last one will be available. This is because JavaScript does not support function overloading where multiple functions with the same name but different parameter signatures can coexist.

</p>

<hr/>

<h3>Final Summary</h3>

<p>
Using the JavaScript library D3, an interactive dashboard was created to provide a comprehensive view of the COVID-19 situation across different states. The dashboard includes filters for year, state, and age group, allowing users to customize their analysis. A pie chart displays the distribution of cases by age group based on the selected filters, while a time series chart visualizes COVID-19 trends by year and month. Additionally, bar charts rank the top 5 and bottom 5 states in terms of fatalities by year and age group. This interactive dashboard enhances data analysis efficiency, accelerates data storytelling, and enables a clear and immediate understanding of the overall situation.
<img src="./Images/COVID-19 STATUS DASHBOARD.png"></img>

</p>