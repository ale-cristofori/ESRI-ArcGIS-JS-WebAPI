var mapMain;
var widgetEditor;

// @formatter:off
require([
        "esri/map",

        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "dojo/_base/array",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],
    function (Map,
              ready, parser, on, array,
              BorderContainer, ContentPane) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

            /*
             * Step: Specify the proxy Url
             */


            // Create the map
            mapMain = new Map("divMap", {
                basemap: "topo",
                center: [-116.64, 34.37],
                zoom: 10
            });

            var flFirePoints, flFireLines, flFirePolygons;
            /*
             * Step: Construct the editable layers
             */


            // Listen for the editable layers to finish loading
            mapMain.on("layers-add-result", initEditor);

            // add the editable layers to the map
            mapMain.addLayers([flFirePolygons, flFireLines, flFirePoints]);

            function initEditor(results) {

                // Map the event results into an array of layerInfo objects
                var layerInfosWildfire = array.map(results.layers, function (result) {
                    return {
                        featureLayer: result.layer
                    };
                });

                /*
                 * Step: Map the event results into an array of Layer objects
                 */


                /*
                 * Step: Add a custom TemplatePicker widget
                 */


                /*
                 * Step: Prepare the Editor widget settings
                 */


                /*
                 * Step: Build the Editor constructor's first parameter
                 */


                /*
                 * Step: Construct the Editor widget
                 */


            };

        });
    });
