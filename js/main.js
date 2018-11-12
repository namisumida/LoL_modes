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
  dataset = data.filter(function(d) {
    return d.queueid!=470;
  }); // save data that doesn't include the 470 mode

  // Scale functions
  var xScale_play = d3.scaleLinear()
                      .domain([d3.min(dataset, function(d) { return d.ngames; }), d3.max(dataset, function(d) { return d.ngames})])
                      .range([10, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
  var xScale_win = d3.scaleLinear()
                      .domain([d3.min(dataset, function(d) { return d.nwins; }), d3.max(dataset, function(d) { return d.nwins})])
                      .range([10, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
  var runxScale = function(selection, row) { // Function that will take in the selection (metric being displayed) and use appropriate scale and spit out converted value
    if (selection == "play") {
      return xScale_play(row.ngames);
    }
    else { return xScale_win(row.nwins); }
  }

  // Create groups
  // First column - ranked 5v5; 420
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
                         .data(getSortedDataset(selection, 420))
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
                         .data(getSortedDataset(selection, 450))
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
                           .data(getSortedDataset(selection, 1200))
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
                         .data(getSortedDataset(selection, 420))
                         .enter()
                         .append("rect")
                         .attr("class", "bar420")
                         .attr("x", 0)
                         .attr("y", function(d,i) {
                           return dim_col.top + (dim_col.h_col+dim_col.h_btwn)*i
                         })
                         .attr("width", function(d) {
                           return runxScale(selection, d)
                         })
                         .attr("height", dim_col.h_col)
                         .style("fill", "orange");

  var bars450_g = col2.append("g")
                      .attr("transform", "translate(" + (dim_col.left+dim_col.w_names+dim_col.btwn_colnames) + ",0)");
  var bar450 = bars450_g.selectAll("bar450") // create bars
                         .data(getSortedDataset(selection, 1200))
                         .enter()
                         .append("rect")
                         .attr("class", "bar450")
                         .attr("x", 0)
                         .attr("y", function(d,i) {
                           return dim_col.top + (dim_col.h_col+dim_col.h_btwn)*i
                         })
                         .attr("width", function(d) {
                           return runxScale(selection, d)
                         })
                         .attr("height", dim_col.h_col)
                         .style("fill", "orange");
  var bars1200_g = col3.append("g")
                    .attr("transform", "translate(" + (dim_col.left+dim_col.w_names+dim_col.btwn_colnames) + ",0)");
  var bar1200 = bars1200_g.selectAll("bar1200") // create bars
                           .data(getSortedDataset(selection, 1200))
                           .enter()
                           .append("rect")
                           .attr("class", "bar1200")
                           .attr("x", 0)
                           .attr("y", function(d,i) {
                             return dim_col.top + (dim_col.h_col+dim_col.h_btwn)*i
                           })
                           .attr("width", function(d) {
                             return runxScale(selection, d)
                           })
                           .attr("height", dim_col.h_col)
                           .style("fill", "orange");

}) // end d3.csv()
