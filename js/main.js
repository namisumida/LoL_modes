var svg = d3.select("#graphic-svg");

// Define margins
var margin = {top: 20, bottom: 0, left: 60, right: 5};
var w_svg = document.getElementById('graphic-svg').getBoundingClientRect().width; // get width and height based on window size
var w_btwn_min = w_svg/10;
var max_circle_r = ((w_svg - (2*w_btwn_min) - margin.left - margin.right)/3)/2; // width of the svg, minus 2 btwn spacing, divide by 3 to get diameter of each circle, divide by 2 to get r

// Datasets
var dataset;
var three_dataset = [{division: "MEN'S"}, {division:"MIXED"}, {division:"WOMEN'S"}]

// Colors
var color1 = d3.color("#35a993");
var color2 = d3.color("#51addf");

// row converter function
var rowConverter = function(d) {
  return {
    game_id: parseInt(d.game_id),
    n_opoints: parseInt(d.n_opoints),
    holds: parseInt(d.holds),
    singleholds: parseInt(d.singleholds),
    holds_percent: parseFloat(d.holds_percent),
    singleholds_percent: parseFloat(d.singleholds_percent),
    win_team: d.win_team,
    lose_team: d.lose_team,
    division: d.division,
    score: d.score,
    tournament: d.tournament,
    game_type: d.game_type,
    year: parseInt(d.year)
  };
};

// Import data
d3.csv("data/opoints.csv", rowConverter, function(data) {

  dataset = data;
  // Calculate averages

  // Find averages
  var mens_n = mens_holds = mens_singleholds = mixed_n = mixed_holds = mixed_singleholds = womens_n = womens_holds = womens_singleholds = 0;
  for (i=0; i <10; i++) {
    var row = dataset[i];
    if (row.division == "mens") {
      mens_n += row.n_opoints;
      mens_holds = mens_holds + row.holds;
      mens_singleholds = mens_singleholds + row.singleholds;
    }
    else if (row.division == "mixed") {
      mixed_n = mixed_n + row.n_opoints;
      mixed_holds = mixed_holds + row.holds;
      mixed_singleholds = mixed_singleholds + row.singleholds;
    }
    else {
      womens_n = womens_n + row.n_opoints;
      womens_holds = womens_holds + row.holds;
      womens_singleholds = womens_singleholds + row.singleholds;
    }
  }
  var dataset_avg = [{ division: "mens", holds_percent: mens_holds/mens_n, singleholds_percent: mens_singleholds/mens_n},
                     { division: "mixed", holds_percent: mixed_holds/mixed_n, singleholds_percent: mixed_singleholds/mixed_n},
                     { division: "womens", holds_percent: womens_holds/womens_n, singleholds_percent: womens_singleholds/womens_n}];

  // Division labels
  var div_labels = svg.selectAll("div_labels")
                      .data(three_dataset)
                      .enter()
                      .append("text")
                      .attr("class", "div_labels")
                      .attr("x", function(d,i) {
                        return margin.left + max_circle_r*(2*i+1) + w_btwn_min*i;
                      })
                      .attr("y", margin.top)
                      .text(function(d) {
                        return d.division;
                      });

  var hold_circles = svg.selectAll("hold_circles")
                        .data(dataset)
                        .enter()
                        .append("circle")
                        .attr("class", "hold_circles")
                        .attr("cx", function(d,i) {
                          if (d.division=="mens") {
                            var div = 0;
                          }
                          else if (d.division=="mixed") {
                            var div = 1;
                          }
                          else { div = 2; }
                          return margin.left + max_circle_r*(2*div+1) + w_btwn_min*div;
                        })
                        .attr("cy", function(d) {
                          return margin.top + 20 + max_circle_r + (max_circle_r - (max_circle_r * d.holds_percent));
                        })
                        .attr("r", function(d) {
                          return max_circle_r*d.holds_percent;
                        })
                        .style("stroke-width", 4.5)
                        .style('opacity', 0.15)
                        .style("fill", "none");

  var hold_circles_avg = svg.selectAll("avg_hold_circles")
                            .data(dataset_avg)
                            .enter()
                            .append("circle")
                            .attr("class", "avg_circles")
                            .attr("cx", function(d,i) {
                              return margin.left + max_circle_r*(2*i+1) + w_btwn_min*i;
                            })
                            .attr("cy", function(d) {
                              return margin.top + 20 + max_circle_r + (max_circle_r - (max_circle_r * d.holds_percent));
                            })
                            .attr("r", function(d) {
                              return max_circle_r * d.holds_percent;
                            })
                            .style("fill", "none")
                            .style("stroke-width", 5)
                            .style("opacity", 0);

  var hold_avg_label = svg.append("text")
                          .text("Average conversion rate")
                          .attr("class", "avg_label")
                          .attr("x", 0)
                          .attr("y", margin.top + 45 + max_circle_r*2)
                          .call(wrap, 80)
                          .style("fill", "none");

  var hold_avg_text = svg.selectAll("hold_avg_text")
                         .data(dataset_avg)
                         .enter()
                         .append("text")
                         .attr("class", "avg_text")
                         .text(function(d) {
                           return d3.format(".0%")(d.holds_percent)
                         })
                         .attr("x", function(d,i) {
                           return margin.left + max_circle_r*(2*i+1) + w_btwn_min*i;
                         })
                         .attr("y", function(d) {
                           return margin.top + 55 + max_circle_r*2;
                         })
                         .style("fill", "none");

  // single possession score circles
  var single_circles = svg.selectAll("single_circles")
                          .data(dataset)
                          .enter()
                          .append("circle")
                          .attr("class", "single_circles")
                          .attr("cx", function(d,i) {
                            if (d.division=="mens") {
                              var div = 0;
                            }
                            else if (d.division=="mixed") {
                              var div = 1;
                            }
                            else { div = 2; }
                            return margin.left + max_circle_r*(2*div+1) + w_btwn_min*div;
                          })
                          .attr("cy", function(d) {
                            return margin.top + 20 + max_circle_r + (max_circle_r - (max_circle_r * d.singleholds_percent));
                          })
                          .attr("r", function(d) {
                            return max_circle_r * d.singleholds_percent;
                          })
                          .style("fill", "none")
                          .style("stroke-width", 4.5)
                          .style('opacity', 0.15);

  var single_circles_avg = svg.selectAll("avg_single_circles")
                              .data(dataset_avg)
                              .enter()
                              .append("circle")
                              .attr("class", "avg_single_circles")
                              .attr("cx", function(d,i) {
                                return margin.left + max_circle_r*(2*i+1) + w_btwn_min*i;
                              })
                              .attr("cy", function(d) {
                                return margin.top + 20 + max_circle_r + (max_circle_r - (max_circle_r * d.singleholds_percent));
                              })
                              .attr("r", function(d) {
                                return max_circle_r * d.singleholds_percent;
                              })
                              .style("fill", "none")
                              .style("stroke-width", 5)
                              .style("opacity", 0);

  var single_avg_label = svg.append("text")
                            .text("Average single-possession score rate")
                            .attr("class", "avg_label")
                            .attr("x", 0)
                            .attr("y", margin.top + 85 + max_circle_r*2)
                            .call(wrap, 100)
                            .style("fill", "none");

  var single_avg_text = svg.selectAll("single_avg_text")
                         .data(dataset_avg)
                         .enter()
                         .append("text")
                         .attr("class", "avg_text")
                         .text(function(d) {
                           return d3.format(".0%")(d.singleholds_percent)
                         })
                         .attr("x", function(d,i) {
                           return margin.left + max_circle_r*(2*i+1) + w_btwn_min*i;
                         })
                         .attr("y", function(d) {
                           return margin.top + 100 + max_circle_r*2;
                         })
                         .style("fill", "none");

// On mouseover of circles
  hold_circles.on("mouseover", function(d) {

    var currentElement = d3.select(this);
    var currentID = d.game_id;

    // Determine starting x position
    var xPosition;
    if (d.division=="mens") {
      xPosition = margin.left;
    }
    else if (d.division=="mixed") {
      xPosition = margin.left + max_circle_r*2 + w_btwn_min;
    }
    else { xPosition = margin.left + max_circle_r*4 + w_btwn_min*2; }

    // Hide averages
    hold_avg_text.style("fill", "none");
    single_avg_text.style("fill", "none");
    hold_avg_label.style("fill", "none");
    single_avg_label.style("fill", "none");
    hold_circles_avg.style("opacity", .2);
    single_circles_avg.style("opacity", .2);

    // Change opacity of mouseover circle
    currentElement.style("opacity", 1)
                  .style("stroke-width", 5);
    single_circles.filter(function(d) {
                    return d.game_id == currentID;
                  })
                  .style("opacity", 1)
                  .style("stroke-width", 5);

    // Create a tooltip
    var tooltip = svg.append("g")
       .attr("id", "tooltip")
       .attr("transform", "translate(" + xPosition + "," + (margin.top + 55 + max_circle_r*2) + ")")
       .attr("width", max_circle_r*2)
    // Add details
    tooltip.append('text')
           .attr("x", max_circle_r)
           .attr("y", 5)
           .text(function() {
             return d.year + " " + d.tournament + " " + d.game_type;
           })
           .attr("class", "tooltip_text");
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 18)
           .text(function() {
             return teamName_convert(d.win_team) + " (" + d.score.split("-")[0] + ") vs. " + teamName_convert(d.lose_team) + " (" + d.score.split("-")[1] + ")";
           })
           .attr("class", "tooltip_text");
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 45)
           .text(function() {
             return d3.format(".0%")(d.holds_percent)
           })
           .attr("class", "avg_text")
           .style("fill", color1);
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 75)
           .text(function() {
             return d3.format(".0%")(d.singleholds_percent)
           })
           .attr("class", "avg_text")
           .style("fill", color2);

  }) // end on mouseover

  hold_circles.on("mouseout", function(d) {
    svg.select("#tooltip") //remove tooltip
       .remove();

    var currentElement = d3.select(this);
    // Show averages again
    hold_avg_text.style("fill", color1);
    single_avg_text.style("fill", color2);
    hold_avg_label.style("fill", "black");
    single_avg_label.style("fill", "black");
    hold_circles_avg.style("opacity", 1)
                    .style("stroke-width", 4.5);
    single_circles_avg.style("opacity", 1)
                      .style("stroke-width", 4.5);

    // Change opacity of mouseover circle
    currentElement.style("opacity", .2);
    single_circles.style("opacity", .2);

  }) // end on mouseout

 // Mouseover on single hold circles
  single_circles.on("mouseover", function(d) {

    var currentElement = d3.select(this);
    var currentID = d.game_id;

    // Determine starting x position
    var xPosition;
    if (d.division=="mens") {
      xPosition = margin.left;
    }
    else if (d.division=="mixed") {
      xPosition = margin.left + max_circle_r*2 + w_btwn_min;
    }
    else { xPosition = margin.left + max_circle_r*4 + w_btwn_min*2; }

    // Hide averages
    hold_avg_text.style("fill", "none");
    single_avg_text.style("fill", "none");
    hold_avg_label.style("fill", "none");
    single_avg_label.style("fill", "none");
    hold_circles_avg.style("opacity", .2);
    single_circles_avg.style("opacity", .2);

    // Change opacity of mouseover circle
    currentElement.style("opacity", 1)
                  .style("stroke-width", 5);
    hold_circles.filter(function(d) {
                  return d.game_id == currentID;
                })
                .style("opacity", 1)
                .style("stroke-width", 5);

    // Create a tooltip
    var tooltip = svg.append("g")
       .attr("id", "tooltip")
       .attr("transform", "translate(" + xPosition + "," + (margin.top + 55 + max_circle_r*2) + ")")
       .attr("width", max_circle_r*2)
    // Add details
    tooltip.append('text')
           .attr("x", max_circle_r)
           .attr("y", 5)
           .text(function() {
             return d.year + " " + d.tournament + " " + d.game_type;
           })
           .attr("class", "tooltip_text");
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 18)
           .text(function() {
             return teamName_convert(d.win_team) + " (" + d.score.split("-")[0] + ") vs. " + teamName_convert(d.lose_team) + " (" + d.score.split("-")[1] + ")";
           })
           .attr("class", "tooltip_text");
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 45)
           .text(function() {
             return d3.format(".0%")(d.holds_percent)
           })
           .attr("class", "avg_text")
           .style("fill", color1);
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 75)
           .text(function() {
             return d3.format(".0%")(d.singleholds_percent)
           })
           .attr("class", "avg_text")
           .style("fill", color2);

  }) // end on mouseover

  single_circles.on("mouseout", function(d) {
    svg.select("#tooltip") //remove tooltip
       .remove();

    var currentElement = d3.select(this);
    // Show averages again
    hold_avg_text.style("fill", color1);
    single_avg_text.style("fill", color2);
    hold_avg_label.style("fill", "black");
    single_avg_label.style("fill", "black");
    hold_circles_avg.style("opacity", 1)
                    .style("stroke-width", 4.5);
    single_circles_avg.style("opacity", 1)
                      .style("stroke-width", 4.5);

    // Change opacity of mouseover circle
    currentElement.style("opacity", .2);
    hold_circles.style("opacity", .2);

  }) // end on mouseout

// Transitions - enter
  hold_circles.transition()
              .duration(2000)
              .delay(function(d,i) {
                return i*30;
              })
              .style("stroke", color1);
  hold_circles_avg.transition()
                  .delay(1500)
                  .duration(600)
                  .style("opacity", 1)
                  .style("stroke", color1);
  hold_avg_label.transition()
                .delay(2000)
                .duration(1500)
                .style('fill', 'black');
  hold_avg_text.transition()
                .delay(2000)
                .duration(1500)
                .style('fill', color1);
  single_circles.transition()
                .duration(2000)
                .delay(function(d,i) {
                  return 2000+i*30;
                })
                .style("stroke", color2);
  single_circles_avg.transition()
                    .delay(3500)
                    .duration(600)
                    .style("opacity", 1)
                    .style("stroke", color2);
  single_avg_label.transition()
                  .delay(4000)
                  .duration(1500)
                  .style('fill', 'black');
  single_avg_text.transition()
                  .delay(4000)
                  .duration(1500)
                  .style('fill', color2);


  // Interactivity with the input
  d3.selectAll("#input")
    .on("change", function() {

      var selection = d3.select(this).node().value; //selection value

      // Show everything
      hold_circles.style("stroke", color1);
      hold_circles_avg.style("stroke", color1);
      hold_avg_text.style("fill", color1);
      hold_avg_label.style("fill", "black");
      single_circles.style("stroke", color2);
      single_circles_avg.style("stroke", color2);
      single_avg_text.style("fill", color2);
      single_avg_label.style("fill", "black");

      // On mouseover of circles
      hold_circles.on("mouseover", function(d) {

        var currentElement = d3.select(this);
        var currentID = d.game_id;

        // Determine starting x position
        var xPosition;
        if (d.division=="mens") {
          xPosition = margin.left;
        }
        else if (d.division=="mixed") {
          xPosition = margin.left + max_circle_r*2 + w_btwn_min;
        }
        else { xPosition = margin.left + max_circle_r*4 + w_btwn_min*2; }

        // Hide averages
        hold_avg_text.style("fill", "none");
        single_avg_text.style("fill", "none");
        hold_avg_label.style("fill", "none");
        single_avg_label.style("fill", "none");
        hold_circles_avg.style("opacity", .2);
        single_circles_avg.style("opacity", .2);

        // Change opacity of mouseover circle
        currentElement.style("opacity", 1)
                      .style("stroke-width", 5);
        single_circles.filter(function(d) {
                        return d.game_id == currentID;
                      })
                      .style("opacity", 1)
                      .style("stroke-width", 5);

        // Create a tooltip
        var tooltip = svg.append("g")
           .attr("id", "tooltip")
           .attr("transform", "translate(" + xPosition + "," + (margin.top + 55 + max_circle_r*2) + ")")
           .attr("width", max_circle_r*2)
        // Add details
        tooltip.append('text')
               .attr("x", max_circle_r)
               .attr("y", 5)
               .text(function() {
                 return d.year + " " + d.tournament + " " + d.game_type;
               })
               .attr("class", "tooltip_text");
        tooltip.append("text")
               .attr("x", max_circle_r)
               .attr("y", 18)
               .text(function() {
                 return teamName_convert(d.win_team) + " (" + d.score.split("-")[0] + ") vs. " + teamName_convert(d.lose_team) + " (" + d.score.split("-")[1] + ")";
               })
               .attr("class", "tooltip_text");
        tooltip.append("text")
               .attr("x", max_circle_r)
               .attr("y", 45)
               .text(function() {
                 return d3.format(".0%")(d.holds_percent)
               })
               .attr("class", "avg_text")
               .style("fill", color1);
        tooltip.append("text")
               .attr("x", max_circle_r)
               .attr("y", 75)
               .text(function() {
                 return d3.format(".0%")(d.singleholds_percent)
               })
               .attr("class", "avg_text")
               .style("fill", color2);

      }) // end on mouseover

      hold_circles.on("mouseout", function(d) {
        svg.select("#tooltip") //remove tooltip
           .remove();

        var currentElement = d3.select(this);
        // Show averages again
        hold_avg_text.style("fill", color1);
        single_avg_text.style("fill", color2);
        hold_avg_label.style("fill", "black");
        single_avg_label.style("fill", "black");
        hold_circles_avg.style("opacity", 1)
                        .style("stroke-width", 4.5);
        single_circles_avg.style("opacity", 1)
                          .style("stroke-width", 4.5);

        // Change opacity of mouseover circle
        currentElement.style("opacity", .2);
        single_circles.style("opacity", .2);

      }) // end on mouseout

      // Mouseover on single hold circles
      single_circles.on("mouseover", function(d) {

        var currentElement = d3.select(this);
        var currentID = d.game_id;

        // Determine starting x position
        var xPosition;
        if (d.division=="mens") {
          xPosition = margin.left;
        }
        else if (d.division=="mixed") {
          xPosition = margin.left + max_circle_r*2 + w_btwn_min;
        }
        else { xPosition = margin.left + max_circle_r*4 + w_btwn_min*2; }

        // Hide averages
        hold_avg_text.style("fill", "none");
        single_avg_text.style("fill", "none");
        hold_avg_label.style("fill", "none");
        single_avg_label.style("fill", "none");
        hold_circles_avg.style("opacity", .2);
        single_circles_avg.style("opacity", .2);

        // Change opacity of mouseover circle
        currentElement.style("opacity", 1)
                      .style("stroke-width", 5);
        hold_circles.filter(function(d) {
                      return d.game_id == currentID;
                    })
                    .style("opacity", 1)
                    .style("stroke-width", 5);

        // Create a tooltip
        var tooltip = svg.append("g")
           .attr("id", "tooltip")
           .attr("transform", "translate(" + xPosition + "," + (margin.top + 55 + max_circle_r*2) + ")")
           .attr("width", max_circle_r*2)
        // Add details
        tooltip.append('text')
               .attr("x", max_circle_r)
               .attr("y", 5)
               .text(function() {
                 return d.year + " " + d.tournament + " " + d.game_type;
               })
               .attr("class", "tooltip_text");
        tooltip.append("text")
               .attr("x", max_circle_r)
               .attr("y", 18)
               .text(function() {
                 return teamName_convert(d.win_team) + " (" + d.score.split("-")[0] + ") vs. " + teamName_convert(d.lose_team) + " (" + d.score.split("-")[1] + ")";
               })
               .attr("class", "tooltip_text");
        tooltip.append("text")
               .attr("x", max_circle_r)
               .attr("y", 45)
               .text(function() {
                 return d3.format(".0%")(d.holds_percent)
               })
               .attr("class", "avg_text")
               .style("fill", color1);
        tooltip.append("text")
               .attr("x", max_circle_r)
               .attr("y", 75)
               .text(function() {
                 return d3.format(".0%")(d.singleholds_percent)
               })
               .attr("class", "avg_text")
               .style("fill", color2);

      }) // end on mouseover

      single_circles.on("mouseout", function(d) {
        svg.select("#tooltip") //remove tooltip
           .remove();

        var currentElement = d3.select(this);
        // Show averages again
        hold_avg_text.style("fill", color1);
        single_avg_text.style("fill", color2);
        hold_avg_label.style("fill", "black");
        single_avg_label.style("fill", "black");
        hold_circles_avg.style("opacity", 1)
                        .style("stroke-width", 4.5);
        single_circles_avg.style("opacity", 1)
                          .style("stroke-width", 4.5);

        // Change opacity of mouseover circle
        currentElement.style("opacity", .2);
        hold_circles.style("opacity", .2);

      }) // end on mouseout

      if (selection=="holds") {

        // Show hold data
        hold_circles.style("stroke", color1);
        hold_circles_avg.style("stroke", color1);
        hold_avg_text.style("fill", color1);
        hold_avg_label.style("fill", "black");

        // Hide single data
        single_circles.style("stroke", "none");
        single_circles_avg.style("stroke", "none");
        single_avg_text.style("fill", "none");
        single_avg_label.style("fill", "none");

        // // On mouseover of circles
        hold_circles.on("mouseover", function(d) {

          var currentElement = d3.select(this);
          var currentID = d.game_id;

          // Determine starting x position
          var xPosition;
          if (d.division=="mens") {
            xPosition = margin.left;
          }
          else if (d.division=="mixed") {
            xPosition = margin.left + max_circle_r*2 + w_btwn_min;
          }
          else { xPosition = margin.left + max_circle_r*4 + w_btwn_min*2; }

          // Hide averages
          hold_avg_text.style("fill", "none");
          hold_avg_label.style("fill", "none");
          hold_circles_avg.style("opacity", .2);

          // Change opacity of mouseover circle
          currentElement.style("opacity", 1)
                        .style("stroke-width", 5);

          // Create a tooltip
          var tooltip = svg.append("g")
             .attr("id", "tooltip")
             .attr("transform", "translate(" + xPosition + "," + (margin.top + 55 + max_circle_r*2) + ")")
             .attr("width", max_circle_r*2)
          // Add details
          tooltip.append('text')
                 .attr("x", max_circle_r)
                 .attr("y", 5)
                 .text(function() {
                   return d.year + " " + d.tournament + " " + d.game_type;
                 })
                 .attr("class", "tooltip_text");
          tooltip.append("text")
                 .attr("x", max_circle_r)
                 .attr("y", 18)
                 .text(function() {
                   return teamName_convert(d.win_team) + " (" + d.score.split("-")[0] + ") vs. " + teamName_convert(d.lose_team) + " (" + d.score.split("-")[1] + ")";
                 })
                 .attr("class", "tooltip_text");
          tooltip.append("text")
                 .attr("x", max_circle_r)
                 .attr("y", 45)
                 .text(function() {
                   return d3.format(".0%")(d.holds_percent)
                 })
                 .attr("class", "avg_text")
                 .style("fill", color1);

        }) // end on mouseover

        hold_circles.on("mouseout", function(d) {
          svg.select("#tooltip") //remove tooltip
             .remove();

          var currentElement = d3.select(this);
          // Show averages again
          hold_avg_text.style("fill", color1);
          hold_avg_label.style("fill", "black");
          hold_circles_avg.style("opacity", 1)
                          .style("stroke-width", 4.5);

          // Change opacity of mouseover circle
          currentElement.style("opacity", .2);

        }) // end on mouseout
      } // end if holds

      else if (selection=="single") {

        // Hide holds data
        hold_circles.style("stroke", "none");
        hold_circles_avg.style("stroke", "none");
        hold_avg_text.style("fill", "none");
        hold_avg_label.style("fill", "none");

        // Show single data
        single_circles.style("stroke", color2);
        single_circles_avg.style("stroke", color2);
        single_avg_text.style("fill", color2);
        single_avg_label.style("fill", "black");

        // Mouseover on single hold circles
        single_circles.on("mouseover", function(d) {

           var currentElement = d3.select(this);
           var currentID = d.game_id;

           // Determine starting x position
           var xPosition;
           if (d.division=="mens") {
             xPosition = margin.left;
           }
           else if (d.division=="mixed") {
             xPosition = margin.left + max_circle_r*2 + w_btwn_min;
           }
           else { xPosition = margin.left + max_circle_r*4 + w_btwn_min*2; }

           // Hide averages
           single_avg_text.style("fill", "none");
           single_avg_label.style("fill", "none");
           single_circles_avg.style("opacity", .2);

           // Change opacity of mouseover circle
           currentElement.style("opacity", 1)
                         .style("stroke-width", 5);

           // Create a tooltip
           var tooltip = svg.append("g")
              .attr("id", "tooltip")
              .attr("transform", "translate(" + xPosition + "," + (margin.top + 55 + max_circle_r*2) + ")")
              .attr("width", max_circle_r*2)
           // Add details
           tooltip.append('text')
                  .attr("x", max_circle_r)
                  .attr("y", 5)
                  .text(function() {
                    return d.year + " " + d.tournament + " " + d.game_type;
                  })
                  .attr("class", "tooltip_text");
           tooltip.append("text")
                  .attr("x", max_circle_r)
                  .attr("y", 18)
                  .text(function() {
                    return teamName_convert(d.win_team) + " (" + d.score.split("-")[0] + ") vs. " + teamName_convert(d.lose_team) + " (" + d.score.split("-")[1] + ")";
                  })
                  .attr("class", "tooltip_text");
           tooltip.append("text")
                  .attr("x", max_circle_r)
                  .attr("y", 75)
                  .text(function() {
                    return d3.format(".0%")(d.singleholds_percent)
                  })
                  .attr("class", "avg_text")
                  .style("fill", color2);

         }) // end on mouseover

         single_circles.on("mouseout", function(d) {
           svg.select("#tooltip") //remove tooltip
              .remove();

           var currentElement = d3.select(this);
           // Show averages again
           single_avg_text.style("fill", color2);
           single_avg_label.style("fill", "black");
           single_circles_avg.style("opacity", 1)
                             .style("stroke-width", 4.5);

           // Change opacity of mouseover circle
           currentElement.style("opacity", .2);
           hold_circles.style("opacity", .2);

         }) // end on mouseout

      } // end if single

    }) // end on function

}) // end d3.csv
