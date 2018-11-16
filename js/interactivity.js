var a_button;
d3.csv('data/game_data_match.csv', rowConverter, function(data) {

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

  // Variable with all champion groups
  var champion_groups = svg.selectAll(".champion_group");

  // On click of champion_group
  champion_groups.on("click", function(d) {
    var currentChampion = d.champion;

    // Change bar color in all columns
    champion_groups.selectAll(".bar")
                   .style("fill", barColor)
                   .filter(function(d) {
                     return d.champion==currentChampion;
                   })
                   .style("fill", highlightBarColor);

    // Change font weight of name labels in all columns
    champion_groups.selectAll(".nameLabel") // name text
                   .style("font-weight", 400)
                   .text(function(d) { return d.champion; })
                   .filter(function(d) {
                     return d.champion==currentChampion;
                   })
                   .style("font-weight", "bold")
                   .text(function(d) {
                     return "#" + findRank(dataset, metric, d.queueid, d.champion) + " " + d.champion; // adds rank value to name label
                   })

    // Change count labels in all columns
    champion_groups.selectAll(".countLabel")
                   .style("fill", "none")
                   .filter(function(d) {
                     return d.champion==currentChampion;
                   })
                   .style("fill", function(d) {
                     if (runxScale(metric, d) <= dim_col.w_colmin) {
                       return "black";
                     }
                     else { return "white";}
                   })

  }); // end on mouseover function

  // Updating
  var updateBars = function(button, dataset, sort, metric) {

    // Update buttons
    var otherButtonID;
    var value = button._groups[0][0].value;

    if (value!="all") { // change color if it's not all in the class/champ filtering
      button.style("background-color", d3.rgb(86,46,53))
            .style("color", "white");
    }
    else {
      button.style("background-color", d3.rgb(200,200,200))
            .style("color", "black");
    }

    if (value == "play") {
      otherButtonID = "#button-win"
    }
    else if (value == "win") {
      otherButtonID = "#button-play"
    }
    else if (value == "count") {
      otherButtonID = "#button-alpha"
    }
    else if (value == "alpha") {
      otherButtonID = "#button-count";
    }
    d3.select(otherButtonID).style("background-color", d3.rgb(200,200,200))
                             .style("color", "black");

    // Update filtering


    // update groups with new data
    group420.data(getSortedDataset(dataset, metric, 420, sort));
    group450.data(getSortedDataset(dataset, metric, 450, sort));
    group1200.data(getSortedDataset(dataset, metric, 1200, sort));

    group420.select(".nameLabel")
            .text(function(d) {
              return d.champion;
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            })
            .style("font-weight", 400);
    group420.select(".bar")
            .attr("width", function(d) {
              return runxScale(metric, d);
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i;
            })
            .style("fill", barColor);
    group420.select(".countLabel")
            .attr("x", function(d) {
              if (runxScale(metric, d) <= dim_col.w_colmin) {
                return dim_col.left+dim_col.w_names + runxScale(metric, d) + 3;
              }
              else { return dim_col.left+dim_col.w_names + runxScale(metric, d) - 5;}
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
            })
            .style("fill", "none");

    // update 450's
    group450.select(".nameLabel")
            .text(function(d) {
              return d.champion;
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            })
            .style("font-weight", 400);
    group450.select(".bar")
            .attr("width", function(d) {
              return runxScale(metric, d);
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i;
            })
            .style("fill", barColor);
    group450.select(".countLabel")
            .attr("x", function(d) {
              if (runxScale(metric, d) <= dim_col.w_colmin) {
                return dim_col.left+dim_col.w_names + runxScale(metric, d) + 3;
              }
              else { return dim_col.left+dim_col.w_names + runxScale(metric, d) - 5;}
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
            })
            .style("fill", "none");

    // update 1200's
    group1200.select(".nameLabel")
            .text(function(d) {
              return d.champion;
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            })
            .style("font-weight", 400);
    group1200.select(".bar")
            .attr("width", function(d) {
              return runxScale(metric, d);
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i;
            })
            .style("fill", barColor);
    group1200.select(".countLabel")
            .attr("x", function(d) {
              if (runxScale(metric, d) <= dim_col.w_colmin) {
                return dim_col.left+dim_col.w_names + runxScale(metric, d) + 3;
              }
              else { return dim_col.left+dim_col.w_names + runxScale(metric, d) - 5;}
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
            })
            .style("fill", "none");

  } // end def of updateMetric

  // If metrics are changed
  d3.select("#button-win").on("click", function() {
    metric = "win";
    updateBars(d3.select(this), dataset, sort, metric);
  });
  d3.select("#button-play").on("click", function() {
    metric = "play";
    updateBars(d3.select(this), dataset, sort, metric);
  }) // end metric changes

  // If sorting is changed
  d3.select("#button-count").on("click", function() {
    sort = "count";
    updateBars(d3.select(this), dataset, sort, metric);
  });
  d3.select("#button-alpha").on("click", function() {
    sort = "alpha";
    updateBars(d3.select(this), dataset, sort, metric);
  }); // end sorting changes

  // If filtering by champion
  d3.select("#filter-class").on("change", function() {
    var filterSelection = d3.select(this).node().value; //selection value
    if (filterSelection == "all") {
      dataset = dataset_threemodes;
    }
    else {
      dataset = dataset_threemodes.filter(function(d) {
        return d.class = filterSelection;
      })
    }
    updateBars(d3.select(this), dataset, sort, metric);
  }); // end changing filter-class

}) // end csv function
