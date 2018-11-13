var svg = d3.select("#svg-barchart");
var w_svg = document.getElementById('svg-barchart').getBoundingClientRect().width; // get width and height based on window size
var max_width = 720;

// Layout
var margin = { top:5, bottom:10, left:5, right:5 };

// Within columns
var dim_col = { w_col:(w_svg-margin.left-margin.right)/3, w_names:80, btwn_colnames:5, btwn_col:(max_width-(max_width-w_svg))/100*2,
                   h_col:12, h_btwn:5,
                   top:30, left:5 }
var w_bars = dim_col.w_col - dim_col.left - dim_col.w_names - dim_col.btwn_colnames;

var orig_dataset; // original dataset
var dataset_threemodes; // dataset with the three game modes
var dataset; // dataset that changes based on filters
var metric; // set play rate as default view
var sort; // set to count

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

var rowConverter = function(d) {
  return {
    champion: d.champion,
    queueid: parseInt(d.queueid),
    ngames: parseInt(d.ngames),
    nwins: parseInt(d.nwins)
  };
}

d3.csv('data/game_data_match.csv', rowConverter, function(data) {

  // Datasets
  orig_dataset = data;
  dataset_threemodes = data.filter(function(d) {
                          return d.queueid!=470;
                        }); // save data that doesn't include the 470 mode
  dataset = dataset_threemodes; // default dataset - showing all champions

  // Default mode
  metric = "play";
  sort = "count";

  // Scale functions
  var xScale_play = d3.scaleLinear()
                      .domain([d3.min(dataset, function(d) { return d.ngames; }), d3.max(dataset, function(d) { return d.ngames})])
                      .range([10, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
  var xScale_win = d3.scaleLinear()
                      .domain([d3.min(dataset, function(d) { return d.nwins; }), d3.max(dataset, function(d) { return d.nwins})])
                      .range([10, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
  var runxScale = function(metric, row) { // Function that will take in the metric (metric being displayed) and use appropriate scale and spit out converted value
    if (metric == "play") {
      return xScale_play(row.ngames);
    }
    else { return xScale_win(row.nwins); }
  }

  // Create column groups
  var col1 = svg.append("g") // make a group element
                .attr("class", "column")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // Second column - ARAM; 1200
  var col2 = svg.append("g") // make a group element
                .attr("class", "column")
                .attr("transform", "translate(" + (margin.left+dim_col.w_col+dim_col.btwn_col) + "," + margin.top + ")");
  // Third column - Nexus Blitz; 450
  var col3 = svg.append("g") // make a group element
                .attr("class", "column")
                .attr("transform", "translate(" + (margin.left+dim_col.w_col*2+dim_col.btwn_col*2) + "," + margin.top + ")");

  // Create labels
  col1.append("text")
      .attr("class", "mode_label")
      .attr("x", dim_col.w_col/2)
      .attr("y", 10)
      .text("Ranked 5v5");
  col2.append("text")
      .attr("class", "mode_label")
      .attr("x", dim_col.w_col/2)
      .attr("y", 10)
      .text("ARAM");
  col3.append("text")
      .attr("class", "mode_label")
      .attr("x", dim_col.w_col/2)
      .attr("y", 10)
      .text("Nexus Blitz");

  // Create champion labels
  var name420_g = col1.append("g")
                      .attr("transform", "translate(" + dim_col.left + ",0)");
  var name420 = name420_g.selectAll("name420")
                         .data(getSortedDataset(dataset, metric, 420, sort))
                         .enter()
                         .append("text")
                         .attr("class", "nameLabel")
                         .attr("x", dim_col.left+dim_col.w_names-dim_col.btwn_colnames)
                         .attr("y", function(d,i) {
                           return dim_col.top + (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
                         })
                         .text(function(d) {
                           return d.champion;
                         });
  var name450_g = col2.append("g")
                        .attr("transform", "translate(" + dim_col.left + ",0)");
  var name450 = name450_g.selectAll("name450")
                         .data(getSortedDataset(dataset, metric, 450, sort))
                         .enter()
                         .append("text")
                         .attr("class", "nameLabel")
                         .attr("x", dim_col.left+dim_col.w_names-dim_col.btwn_colnames)
                         .attr("y", function(d,i) {
                           return dim_col.top + (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
                         })
                         .text(function(d) {
                           return d.champion;
                         });
  var name1200_g = col3.append("g")
                       .attr("transform", "translate(" + dim_col.left + ",0)");
  var name1200 = name1200_g.selectAll("name1200")
                           .data(getSortedDataset(dataset, metric, 1200, sort))
                           .enter()
                           .append("text")
                           .attr("class", "nameLabel")
                           .attr("x", dim_col.left+dim_col.w_names-dim_col.btwn_colnames)
                           .attr("y", function(d,i) {
                             return dim_col.top + (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
                           })
                           .text(function(d) {
                             return d.champion;
                           });

  // Create bars
  var bars420_g = col1.append("g")
                      .attr("transform", "translate(" + (dim_col.left+dim_col.w_names+dim_col.btwn_colnames) + ",0)");
  var bar420 = bars420_g.selectAll("bar420") // create bars
                         .data(getSortedDataset(dataset, metric, 420, sort))
                         .enter()
                         .append("rect")
                         .attr("class", "bar420")
                         .attr("x", 0)
                         .attr("y", function(d,i) {
                           return dim_col.top + (dim_col.h_col+dim_col.h_btwn)*i
                         })
                         .attr("width", function(d) {
                           return runxScale(metric, d)
                         })
                         .attr("height", dim_col.h_col)
                         .style("fill", "orange");

  var bars450_g = col2.append("g")
                      .attr("transform", "translate(" + (dim_col.left+dim_col.w_names+dim_col.btwn_colnames) + ",0)");
  var bar450 = bars450_g.selectAll("bar450") // create bars
                         .data(getSortedDataset(dataset, metric, 1200, sort))
                         .enter()
                         .append("rect")
                         .attr("class", "bar450")
                         .attr("x", 0)
                         .attr("y", function(d,i) {
                           return dim_col.top + (dim_col.h_col+dim_col.h_btwn)*i
                         })
                         .attr("width", function(d) {
                           return runxScale(metric, d)
                         })
                         .attr("height", dim_col.h_col)
                         .style("fill", "orange");
  var bars1200_g = col3.append("g")
                    .attr("transform", "translate(" + (dim_col.left+dim_col.w_names+dim_col.btwn_colnames) + ",0)");
  var bar1200 = bars1200_g.selectAll("bar1200") // create bars
                           .data(getSortedDataset(dataset, metric, 1200, sort))
                           .enter()
                           .append("rect")
                           .attr("class", "bar1200")
                           .attr("x", 0)
                           .attr("y", function(d,i) {
                             return dim_col.top + (dim_col.h_col+dim_col.h_btwn)*i
                           })
                           .attr("width", function(d) {
                             return runxScale(metric, d)
                           })
                           .attr("height", dim_col.h_col)
                           .style("fill", "orange");

    // Create line breaks
    var breakline = svg.selectAll("breakline")
                        .data(getSortedDataset(dataset, metric, 1200, sort).filter(function(d,i) {
                          return (i+1)%5==0;
                        })) // this can be any mode, but should be based on the metric
                        .enter()
                        .append("line")
                        .attr("class", "breakline")
                        .attr("x1", 0)
                        .attr("x2", w_svg-margin.left-margin.right)
                        .attr("y1", function(d,i) {
                          return margin.top + dim_col.top + (dim_col.h_col+dim_col.h_btwn)*(i+1)*5 - dim_col.h_btwn/2;
                        })
                        .attr("y2", function(d,i) {
                          return margin.top + dim_col.top + (dim_col.h_col+dim_col.h_btwn)*(i+1)*5 - dim_col.h_btwn/2;
                        });

}) // end d3.csv()
