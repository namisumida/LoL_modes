d3.csv('data/game_data_match.csv', rowConverter, function(data) {

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



}) // end csv function
