var mapMain;

// @formatter:off
require([
        "esri/map",
        "esri/dijit/Search",

        "dojo/_base/Color",
        "dojo/_base/array",

        "dojo/dom",
        "dojo/on",
        "dojo/parser",
        "dojo/ready",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],
    function (Map, Search,
              Color, array,
              dom, on, parser, ready,
              BorderContainer, ContentPane) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

           

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

            // Create the map
            mapMain = new Map("cpCenter", {
                basemap: "topo",
                center: [-117.19, 34.05],
                zoom: 13
            });

        /*
             * Step: Add the Search widget
             */
        var dijitSearch = new Search({
                map: mapMain,
            //autoComplete: true,      deprecated since 3.13
                arcgisGeocoder: {
                    suffix: " Redlands, CA"
                }
            }, "divSearch");
            dijitSearch.startup();

           

        });

    });