var mapMain;
var widgetEditor;

// @formatter:off
require([
        "esri/map",

        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "dojo/_base/array",
        "esri/layers/FeatureLayer",
        "esri/tasks/GeometryService",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "esri/dijit/editing/Editor",
        "esri/dijit/editing/TemplatePicker"],
    function (Map,
              ready, parser, on, array,
              FeatureLayer, GeometryService,
              BorderContainer, ContentPane, Editor, TemplatePicker) {
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
                center: [10, 44.980],
                zoom: 8
            });

            var flFirePoints, flFireLines, flFirePolygons;
            /*
             * Step: Construct the editable layers
             */
            var flFirePoints = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/0", {
                outFields: ['*']
            });
            var flFireLines = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/1", {
                outFields: ['*']
            });
            var flFirePolygons = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2", {
                outFields: ['*']
            });


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
                var layersWilsfire = array.map(results.layers, function (result) {
                    return result.layer;
                });


                /*
                 * Step: Add a custom TemplatePicker widget
                 */
                var tpCustom = new TemplatePicker({
                    featureLayers: layersWilsfire,
                    columns: 2
                }, "divLeft");
                tpCustom.startup();

                /*
                 * Step: Prepare the Editor widget settings
                 */
                var editorSettings = {
                    map: mapMain,
                    geometryService : new GeometryService("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer"),
                    layerInfos: layerInfosWildfire,
                    toolbarVisible: true,
                    templatePicker: tpCustom,
                    createOptions: { polygonDrawTools :[
                        Editor.CREATE_TOOL_FREEHAND_POLYGON,
                        Editor.CREATE_TOOL_RECTANGLE,
                        Editor.CREATE_TOOL_TRIANGLE,
                        Editor.CREATE_TOOL_CIRCLE
                    ]},
                    toolbarOptions : {
                        reshapeVisible: true
                    },
                    enableUndoRedo: true,
                    maxUndoRedoOperations: 20
                };


                /*
                 * Step: Build the Editor constructor's first parameter
                 */
                var editorParams = {
                    settings : editorSettings
                };


                /*
                 * Step: Construct the Editor widget
                 */
                widgetEditor = new Editor(editorParams, "divTop");
                widgetEditor.startup();

            }

        });
    });
