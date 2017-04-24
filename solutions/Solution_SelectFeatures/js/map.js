// @formatter:off
require([
        "esri/map",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/toolbars/draw",
        "esri/graphic",
        "esri/tasks/query",


        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleMarkerSymbol",

        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "dojo/dom",

        "dojo/store/Memory",
        "dojo/date/locale",

        "dojo/_base/Color",
        "dojo/_base/declare",
        "dojo/_base/array",

        "dgrid/OnDemandGrid",
        "dgrid/Selection",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dijit/form/Button"],
    function (Map, ArcGISDynamicMapServiceLayer, FeatureLayer, Draw, Graphic,
              SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Query,
              ready, parser, on, dom,
              Memory, locale,
              Color, declare, array,
              Grid, Selection,
              BorderContainer, ContentPane, Button) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

            // Initialize the dgrid
            var gridQuakes = new (declare([Grid, Selection]))({
                bufferRows: Infinity,
                columns: {
                    EQID: "ID",
                    UTC_DATETIME: {
                        "label": "Date/Time",
                        "formatter": function (dtQuake) {
                            return locale.format(new Date(dtQuake));
                        }
                    },
                    MAGNITUDE: "Mag",
                    LOCATION: "Location"
                }
            }, "divGrid");

            // URL variables
            var sUrlUSAService = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer";
            var sUrlQuakesLayer = "http://ags103gg.cloudapp.net/arcgis/rest/services/Courses/Earthquakes/MapServer/0";

            // Create the map
            var mapMain = new Map("divMap", {
                basemap: "satellite",
                center: [-119.65, 36.87],
                zoom: 4
            });


            // Construct the USA layer
            var lyrUSA = new ArcGISDynamicMapServiceLayer(sUrlUSAService, {
                opacity: 0.5
            });
            lyrUSA.setVisibleLayers([0, 1, 3]);

            /*
             * Step: Specify the output fields
             */
            var outFieldsQuakes = ["EQID", "UTC_DATETIME", "MAGNITUDE", "LOCATION"];

            // Construct the Quakes layer
            var lyrQuakes = new FeatureLayer(sUrlQuakesLayer, {
                /*
                 * Step: Set the quakes layer output fields
                 */
                outFields: outFieldsQuakes

            });
            lyrQuakes.setDefinitionExpression("MAGNITUDE >= 2.0");
            mapMain.addLayers([lyrUSA, lyrQuakes]);

            /*
             * Step: Wire the draw tool initialization function
             */
            mapMain.on("load", initDrawTool);

            function initDrawTool() {
                /*
                 * Step: Implement the Draw toolbar
                 */
                var tbDraw = new Draw(mapMain);
                tbDraw.on("draw-end", displayPolygon);
                tbDraw.activate(Draw.POLYGON);

            }

            function displayPolygon(evt) {

                // Get the geometry from the event object
                var geometryInput = evt.geometry;

                // Define symbol for finished polygon
                var tbDrawSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255, 255, 0]), 2), new Color([255, 255, 0, 0.2]));

                // Clear the map's graphics layer
                mapMain.graphics.clear();

                /*
                 * Step: Construct and add the polygon graphic
                 */
                var graphicPolygon = new Graphic(geometryInput, tbDrawSymbol);
                mapMain.graphics.add(graphicPolygon);

                // Call the next function
                selectQuakes(geometryInput);
            }

            function selectQuakes(geometryInput) {

                // Define symbol for selected features
                var symbolSelected = new SimpleMarkerSymbol({
                    "type": "esriSMS",
                    "style": "esriSMSCircle",
                    "color": [255, 115, 0, 128],
                    "size": 6,
                    "outline": {
                        "color": [255, 0, 0, 214],
                        "width": 1
                    }
                });

                /*
                 * Step: Set the selection symbol
                 */

               lyrQuakes.setSelectionSymbol(symbolSelected);
                /*
                 * Step: Initialize the query
                 */
                var queryQuakes = new Query();
                queryQuakes.geometry = geometryInput;

                /*
                 * Step: Wire the layer's selection complete event
                 */
                lyrQuakes.on("selection-complete", populateGrid);

                /*
                 * Step: Perform the selection
                 */
                lyrQuakes.selectFeatures(queryQuakes, FeatureLayer.SELECTION_NEW);

            }

            function populateGrid(results) {

                var gridData;

                dataQuakes = array.map(results.features, function (feature) {
                    return {
                        /*
                         * Step: Reference the attribute field values
                         */
                        "EQID": feature.attributes[outFieldsQuakes[0]],
                        "UTC_DATETIME": feature.attributes[outFieldsQuakes[1]],
                        "MAGNITUDE": feature.attributes[outFieldsQuakes[2]],
                        "LOCATION": feature.attributes[outFieldsQuakes[3]]

                    }
                });

                // Pass the data to the grid
                var memStore = new Memory({
                    data: dataQuakes
                });
                gridQuakes.set("store", memStore);
            }

        });
    });
