d3.csv('data/champion_stats_by_queue.csv', rowConverter, function(data) {

  // Scale functions
  var xScale_play = d3.scaleLinear()
                      .domain([d3.min(dataset, function(d) { return d.ngames; }), d3.max(dataset, function(d) { return d.ngames})])
                      .range([1, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
  var xScale_win = d3.scaleLinear()
                     .domain([0, 1])
                     .range([1, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);

  // Variable with all champion groups
  var champion_groups = svg.selectAll(".champion_group");
  var updateMouseover = function() {
    champion_groups = svg.selectAll(".champion_group")
    // On click of champion_group
    champion_groups.on("click", function(d) {
      var currentChampion = d.champion;

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
                     });

      if (metric=="play") {
        // Change bar color in all columns
        champion_groups.selectAll(".bar")
                       .style("fill", barColor)
                       .filter(function(d) {
                         return d.champion==currentChampion;
                       })
                       .style("fill", highlightBarColor);
      }
      else if (metric=="win") {
        // Change dot color
        champion_groups.selectAll(".dot")
                       .style("fill", barColor)
                       .filter(function(d) { return d.champion==currentChampion; })
                       .style("fill", highlightBarColor);
      }

      // Change count labels in all columns
      champion_groups.selectAll(".countLabel")
                     .style("fill", "none")
                     .filter(function(d) {
                       return d.champion==currentChampion;
                     })
                     .style("fill", function(d) {
                       if (metric=="play") {
                         if (xScale_play(d.ngames) <= dim_col.w_colmin) {
                           return "black";
                         }
                         else { return "white";}
                       }
                       else { return "black";}
                     });
    }); // end on mouseover function
  }; // end update mouseover
  updateMouseover();

  // update button
  var updateButton = function(button) {
    // Update buttons
    var otherButtonID;
    var value = button._groups[0][0].value;

    // change button to selected styles
    button.style("background-color", d3.color("#a19da8"))
          .style("color", "white");

    // change text for the count sorting label to play count
    if (value=="play") {
      document.getElementById("button-count").innerHTML = "Play count";
    }
    else if (value=="win") {
      document.getElementById("button-count").innerHTML = "Win rate";
    }

    // assign other button
    if (value == "play") {
      otherButtonID = "#button-win";
    }
    else if (value == "win") {
      otherButtonID = "#button-play";
    }
    else if (value == "count") {
      otherButtonID = "#button-alpha";
    }
    else if (value == "alpha") {
      otherButtonID = "#button-count";
    }
    d3.select(otherButtonID).style("background-color", "white")
                            .style("color", d3.color("#a19da8"));
  }; // end update button

  var updateSizing = function() {
    // Resize entire window
    document.getElementById("graphic").style.height = (currentHeight+30) + "px";
    var currentHeight = d3.select("#col1").node().getBBox().height;

    // Breaklines
    breakline = breakline.data(getSortedDataset(dataset, "play", 1200, sort).filter(function(d,i) {
                            return (i+1)%5==0;
                          })); // this can be any mode, but should be based on the metric
    breakline.exit().remove();
    var breakline_enter = breakline.enter()
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
    breakline = breakline.merge(breakline_enter);

    // Midlines - first need to hide them so when I get the height of the column, it doesn't interfere
    if (metric=="win") {
      svg.selectAll(".midline")
         .attr("y2", currentHeight)
    };
  }; // end update resizing

  var updateData = function(dataset, sort, metric) {
    // update groups with new data
    group420 = group420.data(getSortedDataset(dataset, metric, 420, sort));
    group450 = group450.data(getSortedDataset(dataset, metric, 450, sort));
    group1200 = group1200.data(getSortedDataset(dataset, metric, 1200, sort));

    // Exit
    group420.exit()
            .remove();
    group450.exit()
            .remove();
    group1200.exit()
             .remove();
  }; // end update data

  // Update bars or dots
  var updateBarsDots = function(dataset, sort, metric) {

    updateData(dataset, sort, metric);

    // Enter groups
    var group420enter = group420.enter()
                                .append("g")
                                .attr("class", "champion_group")
                                .attr("transform", "translate(" + dim_col.left + "," + dim_col.top + ")");

    var group450enter = group450.enter()
                                .append("g")
                                .attr("class", "champion_group")
                                .attr("transform", "translate(" + dim_col.left + "," + dim_col.top + ")");
    var group1200enter = group1200.enter()
                                  .append("g")
                                  .attr("class", "champion_group")
                                  .attr("transform", "translate(" + dim_col.left + "," + dim_col.top + ")");

    // Enter elements
    // Background
    group420enter.append("rect") // to allow clickability between name and rect
                  .attr("class", "background")
                  .attr("x", 0)
                  .attr("y", function(d,i) {
                    return (dim_col.h_col+dim_col.h_btwn)*i;
                  })
                  .attr("width", dim_col.w_col)
                  .attr("height", dim_col.h_col);
    group450enter.append("rect") // to allow clickability between name and rect
                  .attr("class", "background")
                  .attr("x", 0)
                  .attr("y", function(d,i) {
                    return (dim_col.h_col+dim_col.h_btwn)*i;
                  })
                  .attr("width", dim_col.w_col)
                  .attr("height", dim_col.h_col);
    group1200enter.append("rect") // to allow clickability between name and rect
                  .attr("class", "background")
                  .attr("x", 0)
                  .attr("y", function(d,i) {
                    return (dim_col.h_col+dim_col.h_btwn)*i;
                  })
                  .attr("width", dim_col.w_col)
                  .attr("height", dim_col.h_col);
    // Champion names
    group420enter.append("text")
                  .attr("class", "nameLabel")
                  .attr("x", dim_col.w_names-dim_col.btwn_colnames)
                  .attr("y", function(d,i) {
                    return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
                  })
                  .text(function(d) {
                    return d.champion;
                  });
    group450enter.append("text") // champion names
                  .attr("class", "nameLabel")
                  .attr("x", dim_col.w_names-dim_col.btwn_colnames)
                  .attr("y", function(d,i) {
                    return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
                  })
                  .text(function(d) {
                    return d.champion;
                  });
    group1200enter.append("text") // champion names
                  .attr("class", "nameLabel")
                  .attr("x", dim_col.w_names-dim_col.btwn_colnames)
                  .attr("y", function(d,i) {
                    return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
                  })
                  .text(function(d) {
                    return d.champion;
                  });
    // Count labels
    group420enter.append("text")
                 .attr("class", "countLabel")
                 .attr("x", function(d) {
                   if (metric=="play") {
                     if (xScale_play(d.ngames) <= dim_col.w_colmin) {
                       return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3;
                     }
                     else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
                   }
                   else {
                    if (d.nwins/d.ngames >= .5) {
                      return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) + 8;
                    }
                    else { return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) - 8; };
                   }
                 })
                 .attr("y", function(d,i) {
                   return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +4;
                 })
                 .text(function(d) {
                   if (metric=="play") { return d3.format(",")(d.ngames); }
                   else { return d3.format(".0%")(d.nwins/d.ngames); }
                 })
                 .style("text-anchor", function(d) {
                   if (metric=="play") {
                     if (xScale_play(d.ngames) <= dim_col.w_colmin) { return "start"; }
                     else { return "end";}
                   }
                   else {
                    if (d.nwins/d.ngames >= .5) { return "start"; }
                    else { return "end"; };
                   }
                 });
    group450enter.append("text")
                 .attr("class", "countLabel")
                 .attr("x", function(d) {
                   if (metric=="play") {
                     if (xScale_play(d.ngames) <= dim_col.w_colmin) {
                       return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3;
                     }
                     else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
                   }
                   else {
                    if (d.nwins/d.ngames >= .5) {
                      return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) + 8;
                    }
                    else { return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) - 8; };
                   }
                 })
                 .attr("y", function(d,i) {
                   return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +4;
                 })
                 .text(function(d) {
                   if (metric=="play") { return d3.format(",")(d.ngames); }
                   else { return d3.format(".0%")(d.nwins/d.ngames); }
                 })
                 .style("text-anchor", function(d) {
                   if (metric=="play") {
                     if (xScale_play(d.ngames) <= dim_col.w_colmin) { return "start"; }
                     else { return "end";}
                   }
                   else {
                    if (d.nwins/d.ngames >= .5) { return "start"; }
                    else { return "end"; };
                   }
                 });
    group1200enter.append("text")
                   .attr("class", "countLabel")
                   .attr("x", function(d) {
                     if (metric=="play") {
                       if (xScale_play(d.ngames) <= dim_col.w_colmin) {
                         return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3;
                       }
                       else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
                     }
                     else {
                      if (d.nwins/d.ngames >= .5) {
                        return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) + 8;
                      }
                      else { return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) - 8; };
                     }
                   })
                   .attr("y", function(d,i) {
                     return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +4;
                   })
                   .text(function(d) {
                     if (metric=="play") { return d3.format(",")(d.ngames); }
                     else { return d3.format(".0%")(d.nwins/d.ngames); }
                   })
                   .style("text-anchor", function(d) {
                     if (metric=="play") {
                       if (xScale_play(d.ngames) <= dim_col.w_colmin) { return "start"; }
                       else { return "end";}
                     }
                     else {
                      if (d.nwins/d.ngames >= .5) { return "start"; }
                      else { return "end"; };
                     }
                   });

    // Specific to play
    if (metric=="play") {
      // Bars
      group420enter.append("rect") // bars
                    .attr("class", "bar")
                    .attr("x", dim_col.left+dim_col.w_names)
                    .attr("y", function(d,i) {
                      return (dim_col.h_col+dim_col.h_btwn)*i;
                    })
                    .attr("width", function(d) {
                      return xScale_play(d.ngames);
                    })
                    .attr("height", dim_col.h_col)
                    .style("fill", barColor);
      group450enter.append("rect") // bars
                    .attr("class", "bar")
                    .attr("x", dim_col.left+dim_col.w_names)
                    .attr("y", function(d,i) {
                      return (dim_col.h_col+dim_col.h_btwn)*i;
                    })
                    .attr("width", function(d) {
                      return xScale_play(d.ngames);
                    })
                    .attr("height", dim_col.h_col)
                    .style("fill", barColor);
      group1200enter.append("rect") // bars
                    .attr("class", "bar")
                    .attr("x", dim_col.left+dim_col.w_names)
                    .attr("y", function(d,i) {
                      return (dim_col.h_col+dim_col.h_btwn)*i;
                    })
                    .attr("width", function(d) {
                      return xScale_play(d.ngames);
                    })
                    .attr("height", dim_col.h_col)
                    .style("fill", barColor);
    } // end specific to play
    else { // specific to dots
      // Dots
      group420enter.append("circle")
                    .attr("class", "dot")
                    .attr("cx", function(d) {
                      return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames);
                    })
                    .attr("cy", function(d,i) {
                      return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
                    })
                    .attr("r", 5)
                    .style("fill", barColor);
      group450enter.append("circle")
                    .attr("class", "dot")
                    .attr("cx", function(d) {
                      return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames);
                    })
                    .attr("cy", function(d,i) {
                      return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
                    })
                    .attr("r", 5)
                    .style("fill", barColor);
      group1200enter.append("circle")
                    .attr("class", "dot")
                    .attr("cx", function(d) {
                      return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames);
                    })
                    .attr("cy", function(d,i) {
                      return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
                    })
                    .attr("r", 5)
                    .style("fill", barColor);
    }; // end specific to win

    // Merge enter groups with pre-existing groups
    group420 = group420.merge(group420enter);
    group450 = group450.merge(group450enter);
    group1200 = group1200.merge(group1200enter);

    // Update groups
    // Champion names
    group420.select(".nameLabel")
            .text(function(d) {
              return d.champion;
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            })
            .style("font-weight", 400);
    group450.select(".nameLabel")
            .text(function(d) {
              return d.champion;
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            })
            .style("font-weight", 400);
    group1200.select(".nameLabel")
            .text(function(d) {
              return d.champion;
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            })
            .style("font-weight", 400);
    // Count labels
    group420.select(".countLabel")
            .attr("x", function(d) {
              if (metric=="play") {
                if (xScale_play(d.ngames) <= dim_col.w_colmin) {
                  return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3;
                }
                else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
              }
              else {
               if (d.nwins/d.ngames >= .5) {
                 return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) + 8;
               }
               else { return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) - 8; };
              }
            })
            .text(function(d) {
              if (metric=="play") { return d3.format(",")(d.ngames); }
              else { return d3.format(".0%")(d.nwins/d.ngames); }
            })
            .style("text-anchor", function(d) {
              if (metric=="play") {
                if (xScale_play(d.ngames) <= dim_col.w_colmin) { return "start"; }
                else { return "end";}
              }
              else {
               if (d.nwins/d.ngames >= .5) { return "start"; }
               else { return "end"; };
              }
            });
    group450.select(".countLabel")
            .attr("x", function(d) {
              if (metric=="play") {
                if (xScale_play(d.ngames) <= dim_col.w_colmin) {
                  return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3;
                }
                else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
              }
              else {
               if (d.nwins/d.ngames >= .5) {
                 return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) + 8;
               }
               else { return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) - 8; };
              }
            })
            .text(function(d) {
              if (metric=="play") { return d3.format(",")(d.ngames); }
              else { return d3.format(".0%")(d.nwins/d.ngames); }
            })
            .style("text-anchor", function(d) {
              if (metric=="play") {
                if (xScale_play(d.ngames) <= dim_col.w_colmin) { return "start"; }
                else { return "end";}
              }
              else {
               if (d.nwins/d.ngames >= .5) { return "start"; }
               else { return "end"; };
              }
            });
    group1200.select(".countLabel")
             .attr("x", function(d) {
               if (metric=="play") {
                 if (xScale_play(d.ngames) <= dim_col.w_colmin) {
                   return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3;
                 }
                 else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
               }
               else {
                if (d.nwins/d.ngames >= .5) {
                  return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) + 8;
                }
                else { return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames) - 8; };
               }
             })
             .text(function(d) {
               if (metric=="play") { return d3.format(",")(d.ngames); }
               else { return d3.format(".0%")(d.nwins/d.ngames); }
             })
             .style("text-anchor", function(d) {
               if (metric=="play") {
                 if (xScale_play(d.ngames) <= dim_col.w_colmin) { return "start"; }
                 else { return "end";}
               }
               else {
                if (d.nwins/d.ngames >= .5) { return "start"; }
                else { return "end"; };
               }
             });

    if (metric=="play") {
      // bars
      group420.select(".bar")
              .attr("width", function(d) {
                return xScale_play(d.ngames);
              })
              .attr("y", function(d,i) {
                return (dim_col.h_col+dim_col.h_btwn)*i;
              })
              .style("fill", barColor);
      group450.select(".bar")
              .attr("width", function(d) {
                return xScale_play(d.ngames);
              })
              .attr("y", function(d,i) {
                return (dim_col.h_col+dim_col.h_btwn)*i;
              })
              .style("fill", barColor);
      group1200.select(".bar")
              .attr("width", function(d) {
                return xScale_play(d.ngames);
              })
              .attr("y", function(d,i) {
                return (dim_col.h_col+dim_col.h_btwn)*i;
              })
              .style("fill", barColor);
      // Hide dots
      group420.select(".dot")
              .style("fill", "none");
      group450.select(".dot")
              .style("fill", "none");
      group1200.select(".dot")
               .style("fill", "none");
    } // end if specific to bar
    else { // if specific to dots
      // Dots
      group420.select(".dot")
              .attr("cx", function(d) {
                return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames);
              })
              .attr("cy", function(d,i) {
                return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
              })
              .style("fill", barColor);
      group450.select(".dot")
              .attr("cx", function(d) {
                return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames);
              })
              .attr("cy", function(d,i) {
                return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
              })
              .style("fill", barColor);
      group1200.select(".dot")
                .attr("cx", function(d) {
                  return dim_col.left+dim_col.w_names + xScale_win(d.nwins/d.ngames);
                })
                .attr("cy", function(d,i) {
                  return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
                })
                .style("fill", barColor);
      // Hide bars
      group420.select(".bar")
              .style("fill", "none");
      group450.select(".bar")
              .style("fill", "none");
      group1200.select(".bar")
               .style("fill", "none");
    }; // end if specific to dots

    // Show 50% midline if play rate
    if (metric=="win") {
      svg.selectAll(".midline")
         .style("stroke", gray);
      svg.selectAll(".midline_label")
         .style("fill", gray);
    }
    else if (metric=="play") {
      svg.selectAll(".midline")
         .style('stroke', "none");
      svg.selectAll(".midline_label")
         .style("fill", "none");
    }

    updateMouseover();
    updateSizing();
  }; // end def of update bars


  // If metrics are changed
  d3.select("#button-win").on("click", function() {
    metric = "win";
    updateButton(d3.select(this));
    updateBarsDots(dataset, sort, metric);
  });
  d3.select("#button-play").on("click", function() {
    metric = "play";
    updateButton(d3.select(this));
    updateBarsDots(dataset, sort, metric);
  }) // end metric changes

  // If sorting is changed
  d3.select("#button-count").on("click", function() {
    sort = "count";
    updateButton(d3.select(this));
    updateBarsDots(dataset, sort, metric);

  });
  d3.select("#button-alpha").on("click", function() {
    sort = "alpha";
    updateButton(d3.select(this));
    updateBarsDots(dataset, sort, metric);
  }); // end sorting changes

  // If filtering by champion
  d3.select("#filter-class").on("change", function() {
    var filterSelection = d3.select(this).node().value; //selection value
    if (filterSelection == "all") {
      dataset = dataset_threemodes;
    }
    else {
      dataset = dataset_threemodes.filter(function(d) {
        return d.broad_role == filterSelection;
      })
    }
    updateButton(d3.select(this));
    updateBarsDots(dataset, sort, metric);
  }); // end changing filter-class

}) // end csv function
