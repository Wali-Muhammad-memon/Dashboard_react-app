import React from "react";

// Fusion Graph 

// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Step 4 - Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const WidgetDoughnut = (props) =>{
    const chartConfigs = {
        type: "doughnut2d", // The chart type
        width: "700", // Width of the chart
        height: "125", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
          // Chart Configuration
          chart: {
            bgColor:'#2a2a2a',
            theme: "fusion"                 //Set the theme for your chart
          },
          // Chart Data - from step 2
          data: props.data
        }
      };
    return(
        <div className="widget_wrapper">
            <div className="widget_title">{props.title}</div>
            <div className="widget_content">
            <ReactFC {...chartConfigs} />
            </div>
         
        </div>
    )
}

export default WidgetDoughnut