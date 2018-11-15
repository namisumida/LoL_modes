d3.csv('data/game_data_match.csv', rowConverter, function(data) {

  // Scale functions
  var xScale_play = d3.scaleLinear()
                      .domain([d3.min(dataset, function(d) { return d.ngames; }), d3.max(dataset, function(d) { return d.ngames})])
                      .range([10, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
  var xScale_win = d3.scaleLinear()
                      .domain([d3.min(dataset, function(d) { return d.nwins; }), d3.max(dataset, function(d) { return d.nwins})])
                      .range([10, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
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
                     return "#" + findRank(dataset, metric, d.queueid, sort, d.champion) + " " + d.champion; // adds rank value to name label
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
      // Change rank labels in all columns
      champion_groups.selectAll(".rankLabel")
                     .style("fill", "none")
                     .filter(function(d) {
                       return d.champion==currentChampion;
                     })
                     .style("fill", "black");
  }); // end on mouseover function

  // Changing metrics
  var updateMetric = function(dataset, sort, metric) {

    var group420 = d3.selectAll(".group420")
                     .data(getSortedDataset(dataset, metric, 420, sort));
    var group450 = d3.selectAll(".group450")
                     .data(getSortedDataset(dataset, metric, 450, sort));
    var group1200 = d3.selectAll(".group1200")
                     .data(getSortedDataset(dataset, metric, 1200, sort));

    svg.selectAll(".nameLabel")
        .text(function(d) {
          return d.champion;
        })
        .attr("y", function(d,i) {
          return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
        });
    svg.selectAll(".bar")
        .attr("width", function(d) {
          return runxScale(metric, d);
        })
        .attr("y", function(d,i) {
          return (dim_col.h_col+dim_col.h_btwn)*i;
        });
    svg.selectAll(".countLabel")
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
        });

  } // end def of updateMetric
  d3.select("#button-win").on("click", function() {
    updateMetric(dataset, sort, "win");
  });
  d3.select("#button-play").on("click", function() {
    updateMetric(dataset, sort, "play");
  })


}) // end csv function
