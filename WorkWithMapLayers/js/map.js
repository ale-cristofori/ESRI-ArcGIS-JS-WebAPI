var mapMain;

// @formatter:off
require([
        "esri/map",

        "dojo/ready",
        "dojo/parser",
        "dojo/on",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],
    function (Map,
              ready, parser, on,
              BorderContainer, ContentPane) {
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


            // Create the map
            mapMain = new Map("cpCenter", {
                basemap: "topo",
                center: [-122.45, 37.75],
                zoom: 12
            });

            /*
             * Step: Add the USA map service to the map
             */


            /*
             * Step: Add the earthquakes layer to the map
             */

            /*
            * Step: Revise code to use the addLayers() method
            */

            /*
             * Step: Add the BaseMapToggle widget to the map
             */


            /*
             * Step: Add a legend once all layers have been added to the map
             */
            //mapMain.on(); // stub


        });
    });
