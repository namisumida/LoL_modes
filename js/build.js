// Layout
var margin = { top:10, bottom:10, left:10, right:10 };

// Within columns
var margin_col = { w_col:200, w_names:10, btwn_colnames:3, btwn_col:10, top:30 }
var w_bars = margin_col.w_col - margin_col.w_names - margin_col.btwn_colnames;


var svg = d3.select("#svg-barchart");
var dataset;
var selection = "play" // set play rate as default view

// Functions that create subsets
var getSortedDataset = function(selection, game_mode) { // input selection and game_mode; output sorted dataset ready to go in elements
  var sub_dataset = dataset.filter(function(d) { return d.queueid == game_mode; })
  if (selection == "play") {
    sub_dataset.sort(function(a,b) { return d3.descending(a.ngames, b.ngames); })
  }
  else {
    sub_dataset.sort(function(a,b) { return d3.descending(a.nwins, b.nwins); })
  }
  return(sub_dataset);
}
