// Function to build charts based on selected filters
function buildCharts() {
    d3.csv("Resources/cleaned_covid_data.csv").then((data) => {

        // Get selected filter values
        let selectedYear = d3.select("#selDataset1").property("value") || "all";
        let selectedState = d3.select("#selDataset2").property("value") || "all";
        let selectedAge = d3.select("#selDataset3").property("value") || "all";

        // Filter the data for the pie chart and time series based on the selected filters
        let filteredData = data.filter(d => 
            (selectedYear === "all" || d.Year === selectedYear) &&
            (selectedState === "all" || d.State === selectedState) &&
            (selectedAge === "all" || d["Age Group"] === selectedAge)
        );

        // Filter the data for the bar charts, ignoring the State filter
        let barChartData = data.filter(d => 
            (selectedYear === "all" || d.Year === selectedYear) &&
            (selectedAge === "all" || d["Age Group"] === selectedAge)
        );

        // Pie Chart Start
        // Aggregate data for the pie chart (e.g., sum the number of COVID-19 deaths by Age Group)
        let aggregatedAgeData = Array.from(
            d3.rollup(filteredData, v => d3.sum(v, d => +d["COVID-19 Deaths"]), d => d["Age Group"]),
            ([key, value]) => ({ Age_Group: key, Deaths: value })
        );

        // Build Pie Chart for age group
        var donutAgeData = [
            {
                values: aggregatedAgeData.map(d => d.Deaths),
                labels: aggregatedAgeData.map(d => d.Age_Group),
                hole: .6,
                type: "pie",
                legend: {
                    x: 0.4,
                    y: 0.4,
                    font: {
                        size:4
                    }
                },
                textfont: {
                    size: 8 // Adjust the font size here to make the labels smaller
                }
            }
        ];

        var donutLayout = {
            title: "COVID-19 Deaths by Age Group",
            margin: { t: 30, l: 100 }
        };

        // Render the pie Chart in the 'donut' div
        Plotly.newPlot("donut", donutAgeData, donutLayout);
        // Pie Chart End

        // Timeseries Chart Start
        // Aggregate data for the time series chart (by year and month)
        let timeSeriesData = Array.from(
            d3.rollup(filteredData, v => d3.sum(v, d => +d["COVID-19 Deaths"]), d => d.Year, d => d.Month),
            ([year, months]) => ({
                Year: year,
                Months: Array.from(months, ([month, deaths]) => ({ Month: +month, Deaths: deaths })) // Convert month to number
            })
        );

        // Prepare data for time series chart
        let years = timeSeriesData.map(d => d.Year);
        let lines = years.map(year => {
            let monthData = timeSeriesData.find(d => d.Year === year).Months;

            // Ensure all months 1-12 are present
            let completeMonthData = [];
            for (let i = 1; i <= 12; i++) {
                let month = monthData.find(d => d.Month === i);
                if (month) {
                    completeMonthData.push(month);
                } else {
                    completeMonthData.push({ Month: i, Deaths: 0 }); // Fill missing months with 0 deaths
                }
            }

            return {
                x: completeMonthData.map(d => d.Month),
                y: completeMonthData.map(d => d.Deaths),
                type: "line",
                mode: "lines+markers",
                name: year,
            };
        });

        // Build Time Series Chart
        var timeseriesLayout = {
            title: "COVID-19 Deaths over Time",
            xaxis: {
                title: "Month",
                tickmode: "array",
                tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                ticktext: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            yaxis: { title: "Deaths" },
            margin: { t: 50, l: 50, r: 50, b: 50 }, // Adjust margins as needed
            legend: {
                x: 0.9,         // Position the legend inside the graph, near the right edge
                y: 0.9,         // Position the legend near the top of the graph
                xanchor: "right", // Anchor the legend's x position to the right
                yanchor: "top",   // Anchor the legend's y position to the top
                font: {
                    size: 10    // Adjust the font size for the legend text
                },
                bgcolor: "rgba(255, 255, 255, 0.5)" // Optional: Add a background color to make the legend readable
            }
        };

        // Render the Time Series Chart in the 'line' div
        Plotly.newPlot("line", lines, timeseriesLayout);
        // Timeseries Chart End

        // Bar Chart Start
        // Aggregate data for the bar chart (e.g., sum the number of COVID-19 deaths by state)
        let aggregatedData = Array.from(
            d3.rollup(barChartData, v => d3.sum(v, d => +d["COVID-19 Deaths"]), d => d.State),
            ([key, value]) => ({ State: key, Deaths: value })
        );

        // Sort the data to get top 5 and bottom 5 states
        aggregatedData.sort((a, b) => b.Deaths - a.Deaths);

        // Get top 5 states for bar1
        let top5Data = aggregatedData.slice(0, 5);

        // Get bottom 5 states for bar2
        let bottom5Data = aggregatedData.slice(-5);

        // Prepare data for bar1
        let statesTop5 = top5Data.map(d => d.State);
        let deathsTop5 = top5Data.map(d => d.Deaths);
        statesTop5.reverse();
        deathsTop5.reverse();
        
        let maxDeathsTop5 = d3.max(deathsTop5);
        let minDeathsTop5 = d3.min(deathsTop5);
        let colorScaleTop5 = d3.scaleLinear()
            .domain([minDeathsTop5, maxDeathsTop5])
            .range(["#ffcccc", "#cc0000"]); // Light red to dark red

        // Apply the color scale to each bar
        let barColorsTop5 = deathsTop5.map(d => colorScaleTop5(d));


        // Prepare data for bar2
        let statesBottom5 = bottom5Data.map(d => d.State);
        let deathsBottom5 = bottom5Data.map(d => d.Deaths);

        // Generate a color scale for the bottom 5 (green gradation)
        let maxDeathsBottom5 = d3.max(deathsBottom5);
        let minDeathsBottom5 = d3.min(deathsBottom5);
        let colorScaleBottom5 = d3.scaleLinear()
            .domain([minDeathsBottom5, maxDeathsBottom5])
            .range(["#ccffcc", "#006600"]); // Light green to dark green


        // Apply the color scale to each bar
        let barColorsBottom5 = deathsBottom5.map(d => colorScaleBottom5(d)).reverse();

        // Build Bar Chart for top 5 states (sorted in descending order)
        var barDataTop5 = [
            {
                y: statesTop5,
                x: deathsTop5,
                type: "bar",
                orientation: "h",
                marker: {
                    color: barColorsTop5 // Apply color gradation
                }
            }
        ];

        var barLayoutTop5 = {
            title: "Top 5 States by COVID-19 Deaths",
            margin: { t: 30, l: 100 }
        };

        // Render the Bar Chart in the 'bar1' div
        Plotly.newPlot("bar1", barDataTop5, barLayoutTop5);

        // Build Bar Chart for bottom 5 states
        var barDataBottom5 = [
            {
                y: statesBottom5,
                x: deathsBottom5,
                type: "bar",
                orientation: "h",
                marker: {
                    color: barColorsBottom5 // Apply color gradation
                }
            }
        ];

        var barLayoutBottom5 = {
            title: "Bottom 5 States by COVID-19 Deaths",
            margin: { t: 30, l: 100 }
        };

        // Render the Bar Chart in the 'bar2' div
        Plotly.newPlot("bar2", barDataBottom5, barLayoutBottom5);
        // Bar Chart End
    });
}

// Function to set default filter values
function setDefaultFilters() {
    d3.select("#selDataset1").property("value", "all");
    d3.select("#selDataset2").property("value", "all");
    d3.select("#selDataset3").property("value", "all");
}

// Function for event listener
function optionChanged() {
    buildCharts();
}

// Function to initialize the dashboard
function init() {
    setDefaultFilters();
    buildCharts();
}

// Initialize the dashboard
init();
