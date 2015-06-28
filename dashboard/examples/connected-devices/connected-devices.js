var client = new Keen({
  projectId: "558e66e046f9a77cf19f3fc3",
  readKey: "87953cc9f5c74b01e068c3c9a42b602ab5532f1b26d691e4ec07be2329a0563d44da0158dc7aca12143190bc79cf76a7c4b66fe9bf4de5027bb69b142afdf51cc04976f70437a79c6b442d54135dcfb648980477f228984645b8d9a62b3ba5c8d6fc0a15f2a11cb1edd5646914299068",
  masterKey: "625A684BC91B40F21F062D49419C286F"
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


   var query = new Keen.Query("maximum", {
    eventCollection: "step",
    targetProperty: "p1",
    timezone: "UTC"
  });
  client.draw(query, document.getElementById("maximump1"), {
    // Custom configuration here
  });
  
    var query = new Keen.Query("maximum", {
    eventCollection: "step",
    targetProperty: "p2",
    timezone: "UTC"
  });
  client.draw(query, document.getElementById("maximump2"), {
    // Custom configuration here
  });
  
    var query = new Keen.Query("maximum", {
    eventCollection: "step",
    targetProperty: "p3",
    timezone: "UTC"
  });
  client.draw(query, document.getElementById("maximump3"), {
    // Custom configuration here
  });
  
    var query = new Keen.Query("maximum", {
    eventCollection: "step",
    targetProperty: "p4",
    timezone: "UTC"
  });
  client.draw(query, document.getElementById("maximump4"), {
    // Custom configuration here
  });

var query = new Keen.Query("minimum", {
    eventCollection: "step",
    targetProperty: "p1",
    timezone: "UTC"
  });
  client.draw(query, document.getElementById("minimump1"), {
    // Custom configuration here
  });
  
    var query = new Keen.Query("minimum", {
    eventCollection: "step",
    targetProperty: "p2",
    timezone: "UTC"
  });
  client.draw(query, document.getElementById("minimump2"), {
    // Custom configuration here
  });
  
    var query = new Keen.Query("minimum", {
    eventCollection: "step",
    targetProperty: "p3",
    timezone: "UTC"
  });
  client.draw(query, document.getElementById("minimump3"), {
    // Custom configuration here
  });
  
    var query = new Keen.Query("minimum", {
    eventCollection: "step",
    targetProperty: "p4",
    timezone: "UTC"
  });
  client.draw(query, document.getElementById("minimump4"), {
    // Custom configuration here
  });

  
   var p1 = new Keen.Query("average", {
    eventCollection: "step",
    targetProperty: "p1",
    timezone: "UTC"
  });
  var p2 = new Keen.Query("average", {
    eventCollection: "step",
    targetProperty: "p2",
    timezone: "UTC"
  });
  var p3 = new Keen.Query("average", {
    eventCollection: "step",
    targetProperty: "p3",
    timezone: "UTC"
  });
  var p4 = new Keen.Query("average", {
    eventCollection: "step",
    targetProperty: "p4",
    timezone: "UTC"
  });

  $(".p1").knob({
    'angleArc':250,
    'angleOffset':-125,
    'readOnly':true,
    'min':0,
    'max':1000,
    'fgColor': Keen.Dataviz.defaults.colors[1],
    height: 290,
    width: '95%'
  });
  client.run(p1, function(err, res){
    $(".p1").val(res.result).trigger('change');
  });
  
  $(".p2").knob({
    'angleArc':250,
    'angleOffset':-125,
    'readOnly':true,
    'min':0,
    'max':1000,
    'fgColor': Keen.Dataviz.defaults.colors[1],
    height: 290,
    width: '95%'
  });
  client.run(p2, function(err, res){
    $(".p2").val(res.result).trigger('change');
  });
  
  $(".p3").knob({
    'angleArc':250,
    'angleOffset':-125,
    'readOnly':true,
    'min':0,
    'max':1000,
    'fgColor': Keen.Dataviz.defaults.colors[1],
    height: 290,
    width: '95%'
  });
  client.run(p3, function(err, res){
    $(".p3").val(res.result).trigger('change');
  });
  
  $(".p4").knob({
    'angleArc':250,
    'angleOffset':-125,
    'readOnly':true,
    'min':0,
    'max':1000,
    'fgColor': Keen.Dataviz.defaults.colors[1],
    height: 290,
    width: '95%'
  });
  client.run(p4, function(err, res){
    $(".p4").val(res.result).trigger('change');
  });









});
