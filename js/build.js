var svg = d3.select("#svg-barchart");
var w_svg = document.getElementById('svg-barchart').getBoundingClientRect().width; // get width and height based on window size

// Layout
var margin = { top:10, bottom:10, left:10, right:10 };

// Within columns
var dim_col = { w_col:(w_svg-margin.left-margin.right)/3, w_names:80, btwn_colnames:5, btwn_col:10,
                   h_col:12, h_btwn:5,
                   top:30, left:5 }
var w_bars = dim_col.w_col - dim_col.left - dim_col.w_names - dim_col.btwn_colnames;


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
