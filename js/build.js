var svg = d3.select("#svg-barchart");
var w_svg = document.getElementById('svg-barchart').getBoundingClientRect().width; // get width and height based on window size
var max_width = 720;
var n_champion = 141;

// Layout
var margin = { top:5, bottom:10, left:0, right:20 };

// Dimensions for column sections
var dim_col = { w_col:(w_svg-margin.left-margin.right)/3, w_names:105, btwn_colnames:5, btwn_col:(max_width-(max_width-w_svg))/100*2,
  w_colmin: 60,
  h_col:13, h_btwn:5,
  top:30, left:5 }
var w_bars = dim_col.w_col - dim_col.left - dim_col.w_names - dim_col.btwn_colnames;

// Saving datasets
var orig_dataset; // original dataset
var dataset_threemodes; // dataset with the three game modes
var dataset; // dataset that changes based on filters
var metric;
var sort;

// Colors
var barColor = d3.rgb(185, 123, 134);
var highlightBarColor = d3.rgb(86,46,53);
var light_gray = d3.rgb(200,200,200);

// Defining groups
var group420, group450, group1200;

// Function that create subsets
var getSortedDataset = function(dataset, metric, gameMode, sort) { // input metric and gameMode; output sorted dataset ready to go in elements
  var sub_dataset = dataset.filter(function(d) { return d.queueid == gameMode; })
  if (sort == "count") { // sorting by metric count
    if (metric == "play") { // metric is play rate
      sub_dataset.sort(function(a,b) { return d3.descending(a.ngames, b.ngames); })
    }
    else { // metric is win rate
      sub_dataset.sort(function(a,b) { return d3.descending(a.nwins, b.nwins); })
    }
  }
  else { // sort alphabetically by name
    sub_dataset.sort(function(a,b) { return d3.ascending(a.champion, b.champion); })
  }
  return(sub_dataset);
}

// Function that finds rank of champion to display on click
var findRank = function(dataset, metric, gameMode, championName) {
  if (metric == "play") {
    var sub_dataset = dataset.filter(function(d) { return d.queueid == gameMode; })
                             .sort(function(a,b) { return d3.descending(a.ngames, b.ngames); })
  }
  else {
    var sub_dataset = dataset.filter(function(d) { return d.queueid == gameMode; })
                             .sort(function(a,b) { return d3.descending(a.nwins, b.nwins); })
  }
  // find rank in sub_dataset
  return sub_dataset.findIndex(x => x.champion==championName)+1;
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
                      .range([1, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
  var xScale_win = d3.scaleLinear()
                      .domain([d3.min(dataset, function(d) { return d.nwins; }), d3.max(dataset, function(d) { return d.nwins})])
                      .range([1, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
  // Function that will take in the metric (metric being displayed) and use appropriate scale and spit out converted value
  var runxScale = function(metric, row) {
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

  // 420 ranked 5v5 column
  group420 = col1.selectAll("group420")
                  .data(getSortedDataset(dataset, metric, 420, sort))
                  .enter()
                  .append("g")
                  .attr("class", "champion_group")
                  .attr("transform", "translate(" + dim_col.left + "," + dim_col.top + ")");
  group420.append("text") // champion names
          .attr("class", "nameLabel")
          .attr("x", dim_col.w_names-dim_col.btwn_colnames)
          .attr("y", function(d,i) {
            return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
          })
          .text(function(d) {
            return d.champion;
          });
  group420.append("rect") // bars
          .attr("class", "bar")
          .attr("x", dim_col.left+dim_col.w_names)
          .attr("y", function(d,i) {
            return (dim_col.h_col+dim_col.h_btwn)*i;
          })
          .attr("width", function(d) {
            return runxScale(metric, d);
          })
          .attr("height", dim_col.h_col)
          .style("fill", barColor);
  group420.append("text")
          .attr("class", "countLabel")
          .attr("x", function(d) {
            if (runxScale(metric, d) <= dim_col.w_colmin) {
              return dim_col.left+dim_col.w_names + runxScale(metric, d) + 3;
            }
            else { return dim_col.left+dim_col.w_names + runxScale(metric, d) - 5;}
          })
          .attr("y", function(d,i) {
            return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +4;
          })
          .text(function(d) {
            if (metric == "play") {
              return d3.format(",")(d.ngames);
            }
            else { return d3.format(",")(d.nwins); }
          })
          .style("text-anchor", function(d) {
            if (runxScale(metric, d) <= dim_col.w_colmin) {
              return "start"
            }
            else { return "end"; }
          });

  // 450 ARAM
  group450 = col2.selectAll("group450")
                 .data(getSortedDataset(dataset, metric, 450, sort))
                 .enter()
                 .append("g")
                 .attr("class", "champion_group")
                 .attr("transform", "translate(" + dim_col.left + "," + dim_col.top + ")");
  group450.append("text") // champion names
          .attr("class", "nameLabel")
          .attr("x", dim_col.w_names-dim_col.btwn_colnames)
          .attr("y", function(d,i) {
            return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
          })
          .text(function(d) {
            return d.champion;
          });
  group450.append("rect") // bars
          .attr("class", "bar")
          .attr("x", dim_col.left+dim_col.w_names)
          .attr("y", function(d,i) {
            return (dim_col.h_col+dim_col.h_btwn)*i
          })
          .attr("width", function(d) {
            return runxScale(metric, d)
          })
          .attr("height", dim_col.h_col)
          .style("fill", barColor);
  group450.append("text") // count labels
          .attr("class", "countLabel")
          .attr("x", function(d) {
            if (runxScale(metric, d) <= dim_col.w_colmin) {
              return dim_col.left+dim_col.w_names + runxScale(metric, d) + 3;
            }
            else { return dim_col.left+dim_col.w_names + runxScale(metric, d) - 5;}
          })
          .attr("y", function(d,i) {
            return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +4;
          })
          .text(function(d) {
            if (metric == "play") {
              return d3.format(",")(d.ngames);
            }
            else { return d3.format(",")(d.nwins); }
          })
          .style("text-anchor", function(d) {
            if (runxScale(metric, d) <= dim_col.w_colmin) {
              return "start"
            }
            else { return "end"; }
          });

  // 1200 Nexus Blitz
  group1200 = col3.selectAll("group1200")
                   .data(getSortedDataset(dataset, metric, 1200, sort))
                   .enter()
                   .append("g")
                   .attr("class", "champion_group")
                   .attr("transform", "translate(" + dim_col.left + "," + dim_col.top + ")");
  group1200.append("text") // champion names
          .attr("class", "nameLabel")
          .attr("x", dim_col.w_names-dim_col.btwn_colnames)
          .attr("y", function(d,i) {
            return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
          })
          .text(function(d) {
            return d.champion;
          });
  group1200.append("rect") // bars
          .attr("class", "bar")
          .attr("x", dim_col.left+dim_col.w_names)
          .attr("y", function(d,i) {
            return (dim_col.h_col+dim_col.h_btwn)*i
          })
          .attr("width", function(d) {
            return runxScale(metric, d)
          })
          .attr("height", dim_col.h_col)
          .style("fill", barColor);
  group1200.append("text") // count labels
          .attr("class", "countLabel")
          .attr("x", function(d) {
            if (runxScale(metric, d) <= dim_col.w_colmin) {
              return dim_col.left+dim_col.w_names + runxScale(metric, d) + 3;
            }
            else { return dim_col.left+dim_col.w_names + runxScale(metric, d) - 5;}
          })
          .attr("y", function(d,i) {
            return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +4;
          })
          .text(function(d) {
            if (metric == "play") {
              return d3.format(",")(d.ngames);
            }
            else { return d3.format(",")(d.nwins); }
          })
          .style("text-anchor", function(d) {
            if (runxScale(metric, d) <= dim_col.w_colmin) {
              return "start"
            }
            else { return "end"; }
          });

  // Create line breaks
  var breakline_g = svg.append("g").attr("id", "breakline_g");
  var breakline = breakline_g.selectAll("breakline")
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
