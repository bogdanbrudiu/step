var client = new Keen({
  projectId: "558e66e046f9a77cf19f3fc3",
  readKey: "87953cc9f5c74b01e068c3c9a42b602ab5532f1b26d691e4ec07be2329a0563d44da0158dc7aca12143190bc79cf76a7c4b66fe9bf4de5027bb69b142afdf51cc04976f70437a79c6b442d54135dcfb648980477f228984645b8d9a62b3ba5c8d6fc0a15f2a11cb1edd5646914299068"
});






Keen.ready(function(){



 var query = new Keen.Query("count", {
    eventCollection: "step",
    timezone: "UTC"
  });
  client.draw(query, document.getElementById("stepcount"), {
  chartType: "metric",
  title: "Step count",
  colors: ["#49c5b1"]
});













 // ----------------------------------------
  // Mapbox - Active Users
  // ----------------------------------------
  var tframe = "previous_7_days";

  var DEFAULTS = {
    coordinates: {
      lat: 37.77350,
      lng: -122.41104
    },
    zoom: 11
  };

  var initialize,
      map,
      markerStart = DEFAULTS.coordinates;

  var activeMapData,
      heat;

  initialize = function() {

    L.mapbox.accessToken = "pk.eyJ1Ijoia2Vlbi1pbyIsImEiOiIza0xnNXBZIn0.PgzKlxBmYkOq6jBGErpqOg";
    map = L.mapbox.map("map", "keen-io.kae20cg0", {
      attributionControl: true,
      center: [markerStart.lat, markerStart.lng],
      zoom: DEFAULTS.zoom
    });

    heat = L.heatLayer([], { maxZoom: 14 });

    activeMapData = L.layerGroup().addTo(map);

    map.attributionControl.addAttribution('<a href="https://keen.io/">Custom Analytics by Keen IO</a>');

    var geoFilter = [];
    geoFilter.push({
      property_name : "keen.location.coordinates",
      operator : "within",
      property_value: {
        coordinates: [ -122.41104, 37.77350 ],
        max_distance_miles: 10
      }
    });

    var scoped_events = new Keen.Query("select_unique", {
      eventCollection: "user_action",
      targetProperty: "keen.location.coordinates",
      timeframe: tframe,
      filters: geoFilter
    });
    var result = client.run(scoped_events, function(err, res){
      console.log("events", res);
      activeMapData.clearLayers();

      Keen.utils.each(res.result, function(coord, index){
        var em = L.marker(new L.LatLng(coord[1], coord[0]), {
          icon: L.mapbox.marker.icon()
        }).addTo(activeMapData);
      });

      activeMapData.eachLayer(function(l) {
          heat.addTo(map).addLatLng(l.getLatLng());
      });
      activeMapData.clearLayers();
    });


    var newgeoFilter = [];
    function resize(geo){

      geo = [];

      heat.setLatLngs([]);

      var center = map.getCenter();
      var zoom = map.getZoom();

      z = zoom-1;
      if (zoom === 0){
        radius = false;
      }
      else {
        radius = 10000/Math.pow(2,z);
      }
      console.log(center, radius);



      geo.push({
        property_name : "keen.location.coordinates",
        operator : "within",
        property_value: {
          coordinates: [ center.lng, center.lat ],
          max_distance_miles: radius
        }

      });
      return geo;
    }


    map.on('zoomend', function(e) {
      newgeoFilter = resize(newgeoFilter);
      scoped_events.set({ filters: newgeoFilter });
      result.refresh();
    });
    map.on('dragend', function(e) {
      newgeoFilter = resize(newgeoFilter);
      scoped_events.set({ filters: newgeoFilter });
      result.refresh();
    });



    document.getElementById("14days").addEventListener("click", function() {
      newgeoFilter = resize(newgeoFilter);
      scoped_events.set({ filters: newgeoFilter,
                          timeframe: "previous_14_days" });
      result.refresh();
    });

    document.getElementById("28days").addEventListener("click", function() {
      newgeoFilter = resize(newgeoFilter);
      scoped_events.set({ filters: newgeoFilter,
                          timeframe: "previous_28_days" });
      result.refresh();
    });

    document.getElementById("7days").addEventListener("click", function() {
      newgeoFilter = resize(newgeoFilter);
      scoped_events.set({ filters: newgeoFilter,
                          timeframe: "previous_7_days" });
      result.refresh();
    });

  };




initialize();






});
