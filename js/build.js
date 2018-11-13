var svg = d3.select("#svg-barchart");
var w_svg = document.getElementById('svg-barchart').getBoundingClientRect().width; // get width and height based on window size
var max_width = 720;

// Layout
var margin = { top:5, bottom:10, left:10, right:5 };

// Within columns
var dim_col = { w_col:(w_svg-margin.left-margin.right)/3, w_names:80, btwn_colnames:5, btwn_col:(max_width-(max_width-w_svg))/100*2,
                   h_col:12, h_btwn:5,
                   top:30, left:5 }
var w_bars = dim_col.w_col - dim_col.left - dim_col.w_names - dim_col.btwn_colnames;

var orig_dataset; // original dataset
var dataset; // dataset that changes based on filters
var metric = "play"; // set play rate as default view
var sort = "count"; // set to count

// Functions that create subsets
var getSortedDataset = function(dataset, metric, game_mode, sort) { // input metric and game_mode; output sorted dataset ready to go in elements
  var sub_dataset = dataset.filter(function(d) { return d.queueid == game_mode; })
  if (sort == "count") { // sorting by metric count
    if (metric == "play") { // metric is play rate
      sub_dataset.sort(function(a,b) { return d3.descending(a.ngames, b.ngames); })
    }
    else { // metric is win rate
      sub_dataset.sort(function(a,b) { return d3.descending(a.nwins, b.nwins); })
    }
  }
  else { // sort alphabetically by name
    sub_dataset.sort(function(a,b) { return d3.descending(a.champion, b.champion); })
  }
  return(sub_dataset);
}
