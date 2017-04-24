var mapMain;
var legendLayers;

/*
 * Step: Update the Web map Id
 */
var webmapId = "";


// @formatter:off
require([
        "esri/map",
        "esri/arcgis/utils",
        "esri/geometry/Extent",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/dijit/Legend",

        "dojo/ready",
        "dojo/parser",
        "dojo/on",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],
    function (Map, arcgisUtils, Extent, ArcGISDynamicMapServiceLayer, FeatureLayer, Legend,
              ready, parser, on,
              BorderContainer, ContentPane) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();


            // Specify the initial extent
            var extentInitial = new Extent({
                "xmin": -14462706.515378611,
                "ymin": 3626924.807223475,
                "xmax": -12496134.65165812,
                "ymax": 5471197.425687718,
                "spatialReference": {
                    "wkid": 102100
                }
            });


            /*
             * Step: Create a map using a web map ID
            */

            // arcgisUtils.createMap(webmapId,"cpCenter").then(function(response){

				/*
				 * Step: Get the map from the response
				*/
				
				
				/*
                 * Step: update the Legend
				*/


            // });   


            //create a map
            mapMain = new Map("cpCenter", {
                basemap: "satellite",
                extent: extentInitial
            });

            // Add the USA map service to the map
            var lyrUSA = new ArcGISDynamicMapServiceLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer", {
                opacity: 0.5
            });


            // Add the earthquakes layer to the map
            var lyrQuakes = new FeatureLayer("http://ags103gg.cloudapp.net/arcgis/rest/services/Courses/Earthquakes/MapServer/0");
            lyrQuakes.setDefinitionExpression("MAGNITUDE >= 2.0");
            mapMain.addLayers([lyrUSA, lyrQuakes]);


            // Add the legend to the map
            mapMain.on("layers-add-result", function () {
                var dijitLegend = new Legend({
                    map: mapMain,
                    arrangement: Legend.ALIGN_RIGHT
                }, "divLegend");
                dijitLegend.startup();
            });


        });

    });
