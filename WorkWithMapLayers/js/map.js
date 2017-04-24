var mapMain;

// @formatter:off
require([
        "esri/map",

        "dojo/ready",
        "dojo/parser",
        "esri/geometry/Extent",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/dijit/BasemapToggle",
        "esri/dijit/Legend",
        "dojo/on",
        "esri/layers/FeatureLayer",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],
    function (Map,
              ready, parser, Extent , ArcGISDynamicMapServiceLayer,
              BasemapToggle , Legend, on, FeatureLayer ,BorderContainer, ContentPane) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

            /*
             * Step: Specify the initial extent
             * Note: Exact coordinates may vary slightly from snippet/solution
             * Reference: https://developers.arcgis.com/javascript/jssamples/fl_any_projection.html
             */
            var extentInitial = new Extent({
                "xmin":-15130159.421556406,
                "ymin":3346281.4826827217,
                "xmax":-13794651.66335816,
                "ymax":5699318.9614129625,
                "spatialReference":{
                    "wkid":102100,
                    "latestWkid":3857
                }
            });

            // Create the map
            mapMain = new Map("cpCenter", {
                basemap: "satellite",
                extent : extentInitial
            });

            /*
             * Step: Add the USA map service to the map
             */
            var lyrUSA = new ArcGISDynamicMapServiceLayer(
                "https://sampleserver5.arcgisonline.com/arcgis/rest/services/USA/MapServer", {
                    opacity: 0.5
                });
            //mapMain.addLayer(lyrUSA);

            /*
             * Step: Add the earthquakes layer to the map
             */

            var lyrQuakes = new FeatureLayer("http://ags103gg.cloudapp.net/arcgis/rest/services/Courses/Earthquakes/MapServer/0");
            lyrQuakes.setDefinitionExpression("MAGNITUDE >= 2.0");
            //mapMain.addLayer(lyrQuakes);

            /*
            * Step: Revise code to use the addLayers() method
            */
            mapMain.addLayers([lyrUSA, lyrQuakes]);

            /*
             * Step: Add the BaseMapToggle widget to the map
             */
            var toggle = new BasemapToggle({
                //theme: "basemapToggle",
                map: mapMain,
                visible: true,
                basemap: "topo"
            }, "BasemapToggle");
            toggle.startup();

            /*
             * Step: Add a legend once all layers have been added to the map
             */
            mapMain.on("layers-add-result", function(){
                var dijitLegend = new Legend({
                    map: mapMain,
                    arrangement: esri.dijit.Legend.ALIGN_RIGHT
                }, "divLegend");
                dijitLegend.startup()
            });


        });
    });
