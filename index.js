function init() {
  var svg = d3.select("#svg-barchart");
  var w_svg = document.getElementById('svg-barchart').getBoundingClientRect().width; // get width and height based on window size
  var n_champion = 141;
  var margin = { top:30, bottom:10, left:0, right:40 };
  // Dimensions for column sections
  var dim_col = { w_col:(w_svg-margin.left-margin.right)/3, w_names:105, btwn_colnames:3, btwn_col1:5, btwn_col2:5,
    w_colmin: 60,
    h_col:13, h_btwn:5,
    top:30, left:5 }
  var w_bars = dim_col.w_col - dim_col.left - dim_col.w_names - dim_col.btwn_col1 - dim_col.btwn_col2;
  // Saving datasets
  var metric, sort, xScale_play, xScale_win;
  var avg_data = [{champ: 'Aatrox',winrate: 0.484620106433638 },
  {champ: 'Ahri',winrate: 0.498866213169796 },
  {champ: 'Akali',winrate: 0.397741472697074 },
  {champ: 'Alistar',winrate: 0.537150429510739 },
  {champ: 'Amumu',winrate: 0.553002044495287 },
  {champ: 'Anivia',winrate: 0.528135990590416 },
  {champ: 'Annie',winrate: 0.486048307080181 },
  {champ: 'Ashe',winrate: 0.463068849431503 },
  {champ: 'Aurelion Sol',winrate: 0.485882675446135 },
  {champ: 'Azir',winrate: 0.458300147994994 },
  {champ: 'Bard',winrate: 0.471827811586207 },
  {champ: 'Blitzcrank',winrate: 0.458426161687977 },
  {champ: 'Brand',winrate: 0.58729332118676 },
  {champ: 'Braum',winrate: 0.48779204375763 },
  {champ: 'Caitlyn',winrate: 0.467790612999271 },
  {champ: 'Camille',winrate: 0.475134020650502 },
  {champ: 'Cassiopeia',winrate: 0.534426789693149 },
  {champ: "Cho'Gath",winrate: 0.5134551089114 },
  {champ: 'Corki',winrate: 0.472509702557568 },
  {champ: 'Darius',winrate: 0.498715124812913 },
  {champ: 'Diana',winrate: 0.523989185700549 },
  {champ: 'Dr. Mundo',winrate: 0.543204534644253 },
  {champ: 'Draven',winrate: 0.467213935332566 },
  {champ: 'Ekko',winrate: 0.518524809425253 },
  {champ: 'Elise',winrate: 0.493895050809395 },
  {champ: 'Evelynn',winrate: 0.466038298357659 },
  {champ: 'Ezreal',winrate: 0.485545148641285 },
  {champ: 'Fiddlesticks',winrate: 0.502418998097949 },
  {champ: 'Fiora',winrate: 0.479191438752973 },
  {champ: 'Fizz',winrate: 0.494103383632573 },
  {champ: 'Galio',winrate: 0.508729437829111 },
  {champ: 'Gangplank',winrate: 0.475272864206699 },
  {champ: 'Garen',winrate: 0.510628757226084 },
  {champ: 'Gnar',winrate: 0.457838722847421 },
  {champ: 'Gragas',winrate: 0.51745572103963 },
  {champ: 'Graves',winrate: 0.535110556870696 },
  {champ: 'Hecarim',winrate: 0.474333237808009 },
  {champ: 'Heimerdinger',winrate: 0.488892991183619 },
  {champ: 'Illaoi',winrate: 0.497490816905686 },
  {champ: 'Irelia',winrate: 0.474172674070472 },
  {champ: 'Ivern',winrate: 0.449740514974656 },
  {champ: 'Janna',winrate: 0.512787098902753 },
  {champ: 'Jarvan IV',winrate: 0.520395937114316 },
  {champ: 'Jax',winrate: 0.530931352091651 },
  {champ: 'Jayce',winrate: 0.498398620309682 },
  {champ: 'Jhin',winrate: 0.501583029970556 },
  {champ: 'Jinx',winrate: 0.511073718670017 },
  {champ: "Kai'Sa",winrate: 0.515817237551695 },
  {champ: 'Kalista',winrate: 0.493511132269794 },
  {champ: 'Karma',winrate: 0.500194212493688 },
  {champ: 'Karthus',winrate: 0.58081893373498 },
  {champ: 'Kassadin',winrate: 0.491815205509883 },
  {champ: 'Katarina',winrate: 0.451131393772105 },
  {champ: 'Kayle',winrate: 0.554085570058389 },
  {champ: 'Kayn',winrate: 0.498578940374468 },
  {champ: 'Kennen',winrate: 0.488442822315693 },
  {champ: "Kha'Zix",winrate: 0.483186150672351 },
  {champ: 'Kindred',winrate: 0.486685012976446 },
  {champ: 'Kled',winrate: 0.506275883998853 },
  {champ: "Kog'Maw",winrate: 0.559924612359462 },
  {champ: 'LeBlanc',winrate: 0.466666666690069 },
  {champ: 'Lee Sin',winrate: 0.494543612925522 },
  {champ: 'Leona',winrate: 0.51742954354696 },
  {champ: 'Lissandra',winrate: 0.481136469567536 },
  {champ: 'Lucian',winrate: 0.507134874967248 },
  {champ: 'Lulu',winrate: 0.492258685802578 },
  {champ: 'Lux',winrate: 0.518096616871533 },
  {champ: 'Malphite',winrate: 0.521761874900541 },
  {champ: 'Malzahar',winrate: 0.514912124973638 },
  {champ: 'Maokai',winrate: 0.550234176822921 },
  {champ: 'Master Yi',winrate: 0.492346123107902 },
  {champ: 'Miss Fortune',winrate: 0.501001776741126 },
  {champ: 'Mordekaiser',winrate: 0.501358119023003 },
  {champ: 'Morgana',winrate: 0.530192074286061 },
  {champ: 'Nami',winrate: 0.524283206623903 },
  {champ: 'Nasus',winrate: 0.470759403829525 },
  {champ: 'Nautilus',winrate: 0.519706279039142 },
  {champ: 'Nidalee',winrate: 0.479804934050889 },
  {champ: 'Nocturne',winrate: 0.46126169762374 },
  {champ: 'Nunu',winrate: 0.481377258030678 },
  {champ: 'Olaf',winrate: 0.475846875967083 },
  {champ: 'Orianna',winrate: 0.533438042484914 },
  {champ: 'Ornn',winrate: 0.49563278197677 },
  {champ: 'Pantheon',winrate: 0.485353443319751 },
  {champ: 'Poppy',winrate: 0.533328420893302 },
  {champ: 'Pyke',winrate: 0.46523238627363 },
  {champ: 'Quinn',winrate: 0.460751864813911 },
  {champ: 'Rakan',winrate: 0.506520469793616 },
  {champ: 'Rammus',winrate: 0.493644980662322 },
  {champ: "Rek'Sai",winrate: 0.466043947643366 },
  {champ: 'Renekton',winrate: 0.494794829541989 },
  {champ: 'Rengar',winrate: 0.487553406525283 },
  {champ: 'Riven',winrate: 0.517079540505592 },
  {champ: 'Rumble',winrate: 0.531666963180751 },
  {champ: 'Ryze',winrate: 0.469362084484097 },
  {champ: 'Sejuani',winrate: 0.474309177586866 },
  {champ: 'Shaco',winrate: 0.462381656801272 },
  {champ: 'Shen',winrate: 0.481795044919493 },
  {champ: 'Shyvana',winrate: 0.477091633495518 },
  {champ: 'Singed',winrate: 0.528018318080683 },
  {champ: 'Sion',winrate: 0.546495489224562 },
  {champ: 'Sivir',winrate: 0.486305836310401 },
  {champ: 'Skarner',winrate: 0.494602889860744 },
  {champ: 'Sona',winrate: 0.527556325861785 },
  {champ: 'Soraka',winrate: 0.4913137893655 },
  {champ: 'Swain',winrate: 0.502147803937758 },
  {champ: 'Syndra',winrate: 0.493487433489452 },
  {champ: 'Tahm Kench',winrate: 0.478827361549577 },
  {champ: 'Taliyah',winrate: 0.527126231000239 },
  {champ: 'Talon',winrate: 0.463339686518301 },
  {champ: 'Taric',winrate: 0.537826877404769 },
  {champ: 'Teemo',winrate: 0.472499738707376 },
  {champ: 'Thresh',winrate: 0.487032466273287 },
  {champ: 'Tristana',winrate: 0.493274416818442 },
  {champ: 'Trundle',winrate: 0.49779207812675 },
  {champ: 'Tryndamere',winrate: 0.505955143070244 },
  {champ: 'Twisted Fate',winrate: 0.488251654343052 },
  {champ: 'Twitch',winrate: 0.500895939060735 },
  {champ: 'Udyr',winrate: 0.493658766539233 },
  {champ: 'Urgot',winrate: 0.51134505318612 },
  {champ: 'Varus',winrate: 0.476136104187942 },
  {champ: 'Vayne',winrate: 0.521392259446102 },
  {champ: 'Veigar',winrate: 0.496676217804412 },
  {champ: "Vel'Koz",winrate: 0.51679379097404 },
  {champ: 'Vi',winrate: 0.488395615203288 },
  {champ: 'Viktor',winrate: 0.509665541557533 },
  {champ: 'Vladimir',winrate: 0.47935400987539 },
  {champ: 'Volibear',winrate: 0.517387741330441 },
  {champ: 'Warwick',winrate: 0.469156468679203 },
  {champ: 'Wukong',winrate: 0.509678847007245 },
  {champ: 'Xayah',winrate: 0.503280224983727 },
  {champ: 'Xerath',winrate: 0.495114656016152 },
  {champ: 'Xin Zhao',winrate: 0.478278642802619 },
  {champ: 'Yasuo',winrate: 0.513977910969915 },
  {champ: 'Yorick',winrate: 0.495107114525522 },
  {champ: 'Zac',winrate: 0.485367153268848 },
  {champ: 'Zed',winrate: 0.478423817748161 },
  {champ: 'Ziggs',winrate: 0.509211691740744 },
  {champ: 'Zilean',winrate: 0.507737200435052 },
  {champ: 'Zoe',winrate: 0.448825440024095 },
  {champ: 'Zyra',winrate: 0.534561299287912 }];
  // Defining groups
  var breakline, group420, group450, group1200, group420enter, group450enter, group1200enter;
  // Colors
  var barColor = d3.color("#f6bba8");
  var highlightBarColor = d3.rgb(79,39,79);
  var light_gray = d3.rgb(200,200,200);
  var dark_gray = d3.rgb(100,100,100);
  var gray = d3.color("#a19da8");
  var green = d3.rgb(0,150,0);
  var dark_green = d3.rgb(0,200,0);
  var red = d3.rgb(212,89,84);
  var dark_red = d3.rgb(320,44,28);
  // Scale functions
  var global_min_ngames = d3.min(dataset, function(d) { return d.ngames; });
  var global_max_ngames = d3.max(dataset, function(d) { return d.ngames; });
  var xScale_play = d3.scaleLinear()
                      .domain([global_min_ngames, global_max_ngames])
                      .range([1, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
  var xScale_win = d3.scaleLinear()
                      .domain([0.32, 0.7])
                      .range([1, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
  function getSortedDataset(dataset, metric, gameMode, sort) { // input metric and gameMode; output sorted dataset ready to go in elements
    var sub_dataset = dataset.filter(function(d) { return d.queueid == gameMode; })
    if (sort == "count") { // sorting by metric count
      if (metric == "play") { // metric is play rate
        sub_dataset.sort(function(a,b) { return d3.descending(a.ngames, b.ngames); })
      }
      else { // metric is win rate
        sub_dataset.sort(function(a,b) { return d3.descending(a.nwins/a.ngames, b.nwins/b.ngames); })
      }
    }
    else { // sort alphabetically by name
      sub_dataset.sort(function(a,b) { return d3.ascending(a.champion, b.champion); })
    }
    return(sub_dataset);
  };
  // Function that finds rank of champion to display on click
  function findRank(dataset, metric, gameMode, championName) {
    if (metric == "play") {
      var sub_dataset = dataset.filter(function(d) { return d.queueid == gameMode; })
                               .sort(function(a,b) { return d3.descending(a.ngames, b.ngames); })
    }
    else {
      var sub_dataset = dataset.filter(function(d) { return d.queueid == gameMode; })
                               .sort(function(a,b) { return d3.descending(a.nwins/a.ngames, b.nwins/b.ngames); })
    }
    // find rank in sub_dataset
    return sub_dataset.findIndex(x => x.champion==championName)+1;
  }; // end findRank
  function updateMouseover() {
    champion_groups = svg.selectAll(".champion_group")
    // On click of champion_group
    champion_groups.on("click", function(d) {
      var currentChampion = d.champion;
      var nextChampion;
      // Change font weight of name labels in all columns
      champion_groups.selectAll(".nameLabel") // name text
                     .style("font-family", 'radnika-regular')
                     .text(function(d) { return d.champion; })
                     .filter(function(d,i) { return d.champion==currentChampion; })
                     .style("font-family", 'radnika-bold')
                     .text(function(d) { return "#" + findRank(dataset, metric, d.queueid, d.champion) + " " + d.champion; });
      // Change count labels in all columns
      if (document.getElementById("graphic").getBoundingClientRect().width>=680) {
        champion_groups.selectAll(".countLabel")
                       .style("fill", "none")
                       .filter(function(d) { return d.champion==currentChampion; })
                       .style("fill", function(d) {
                         if (metric=="play") {
                           if (xScale_play(d.ngames) <= dim_col.w_colmin) { return "black"; }
                           else { return "white";}
                         }
                         else { return "black";}
                       });
      }; // end if

      if (metric=="play") {
        // Change bar color in all columns
        champion_groups.selectAll(".bar")
                       .style("fill", barColor)
                       .filter(function(d) { return d.champion==currentChampion; })
                       .style("fill", highlightBarColor);
      }
      else if (metric=="win") {
        // Change dot color
        champion_groups.selectAll(".dot")
                       .style("fill", function(d) {
                         var winRate = +(d.nwins/d.ngames).toFixed(2);
                         if (winRate > .5) { return green; }
                         else if (winRate < .5) { return red; }
                         else { return gray; }
                       })
                       .filter(function(d) { return d.champion==currentChampion; })
                       .style("fill", function(d) {
                         var winRate = +(d.nwins/d.ngames).toFixed(2);
                         if (winRate > .5) { return dark_green; }
                         else if (winRate < .5) { return dark_red; }
                         else { return dark_gray; }
                       });
      }
    }); // end on mouseover function
  }; // end update mouseover
  // update button
  function updateButton(button) {
    // Update buttons
    var otherButtonID;
    var value = button._groups[0][0].value;

    // change button to selected styles
    button.style("background-color", d3.rgb(79,39,79))
          .style("color", "white");

    // change text for the count sorting label to play count
    if (value=="play") { document.getElementById("button-count").innerHTML = "Play count"; }
    else if (value=="win") { document.getElementById("button-count").innerHTML = "Win rate"; }

    // assign other button
    if (value == "play") { otherButtonID = "#button-win"; }
    else if (value == "win") { otherButtonID = "#button-play"; }
    else if (value == "count") { otherButtonID = "#button-alpha"; }
    else if (value == "alpha") { otherButtonID = "#button-count"; }
    d3.select(otherButtonID).style("background-color", "white")
                            .style("color", d3.rgb(79,39,79));
  }; // end update button
  function updateSizing(dataset) {
    var currentHeight = d3.select("#col1").node().getBBox().height;
    document.getElementById("graphic").style.height = (currentHeight+30) + "px";

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
                                    .attr("y1", function(d,i) { return margin.top + dim_col.top + (dim_col.h_col+dim_col.h_btwn)*(i+1)*5 - dim_col.h_btwn/2; })
                                    .attr("y2", function(d,i) { return margin.top + dim_col.top + (dim_col.h_col+dim_col.h_btwn)*(i+1)*5 - dim_col.h_btwn/2; });
    breakline = breakline.merge(breakline_enter);

    // Midlines - first need to hide them so when I get the height of the column, it doesn't interfere
    if (metric=="win") {
      svg.selectAll(".midline")
         .attr("y2", currentHeight + 15)
    };
  }; // end update resizing
  function updateData(dataset, sort, metric) {
    // update groups with new data
    group420 = group420.data(getSortedDataset(dataset, metric, 420, sort));
    group450 = group450.data(getSortedDataset(dataset, metric, 450, sort));
    group1200 = group1200.data(getSortedDataset(dataset, metric, 1200, sort));

    // Exit
    group420.exit().remove();
    group450.exit().remove();
    group1200.exit().remove();
  }; // end update data

  function updateBarsDots(dataset, sort, metric) {
    updateData(dataset, sort, metric);
    // Enter groups
    var group420enter = group420.enter()
                                .append("g")
                                .attr("class", "champion_group")
                                .attr("transform", "translate(0," + dim_col.top + ")");
    var group450enter = group450.enter()
                                .append("g")
                                .attr("class", "champion_group")
                                .attr("transform", "translate(0," + dim_col.top + ")");
    var group1200enter = group1200.enter()
                                  .append("g")
                                  .attr("class", "champion_group")
                                  .attr("transform", "translate(0," + dim_col.top + ")");
    // Enter elements
    // Background
    group420enter.append("rect") // to allow clickability between name and rect
                  .attr("class", "background")
                  .attr("x", 0)
                  .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
                  .attr("width", dim_col.w_col)
                  .attr("height", dim_col.h_col);
    group450enter.append("rect") // to allow clickability between name and rect
                  .attr("class", "background")
                  .attr("x", 0)
                  .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
                  .attr("width", dim_col.w_col)
                  .attr("height", dim_col.h_col);
    group1200enter.append("rect") // to allow clickability between name and rect
                  .attr("class", "background")
                  .attr("x", 0)
                  .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
                  .attr("width", dim_col.w_col)
                  .attr("height", dim_col.h_col);
    // Champion names
    group420enter.append("text")
                  .attr("class", "nameLabel")
                  .attr("x", dim_col.w_names-dim_col.btwn_colnames)
                  .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3; })
                  .text(function(d) { return d.champion; });
    group450enter.append("text") // champion names
                  .attr("class", "nameLabel")
                  .attr("x", dim_col.w_names-dim_col.btwn_colnames)
                  .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3; })
                  .text(function(d) { return d.champion; });
    group1200enter.append("text") // champion names
                  .attr("class", "nameLabel")
                  .attr("x", dim_col.w_names-dim_col.btwn_colnames)
                  .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3; })
                  .text(function(d) { return d.champion; });
    // Bars
    group420enter.append("rect") // bars
                  .attr("class", "bar")
                  .attr("x", dim_col.left+dim_col.w_names)
                  .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
                  .attr("width", function(d) { return xScale_play(d.ngames); })
                  .attr("height", dim_col.h_col)
                  .style("fill", function(d) {
                    if (metric=="play") { return barColor; }
                    else { return "none"; }
                  });
    group450enter.append("rect") // bars
                  .attr("class", "bar")
                  .attr("x", dim_col.left+dim_col.w_names)
                  .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
                  .attr("width", function(d) { return xScale_play(d.ngames); })
                  .attr("height", dim_col.h_col)
                  .style("fill", function(d) {
                    if (metric=="play") { return barColor; }
                    else { return "none"; }
                  });
    group1200enter.append("rect") // bars
                  .attr("class", "bar")
                  .attr("x", dim_col.left+dim_col.w_names)
                  .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
                  .attr("width", function(d) { return xScale_play(d.ngames); })
                  .attr("height", dim_col.h_col)
                  .style("fill", function(d) {
                    if (metric=="play") { return barColor; }
                    else { return "none"; }
                  });

    // Dot distance rects
    group450enter.append("rect")
                 .attr("class", "dotDistance")
                 .attr("x", function(d) {
                    var winRate = +(d.nwins/d.ngames).toFixed(2)
                    if (winRate > 0.5) { return dim_col.left+dim_col.w_names + xScale_win(.5); }
                    else { return dim_col.left+dim_col.w_names + xScale_win(winRate); }
                 })
                 .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2-1; })
                 .attr("height", 2)
                 .attr("width", function(d) { return Math.abs(xScale_win(+(d.nwins/d.ngames).toFixed(2))-xScale_win(.5)); })
                 .style("fill", function(d) {
                   if (metric=="win") { return gray; }
                   else { return "none"; }
                 });
    group420enter.append("rect")
                 .attr("class", "dotDistance")
                 .attr("x", function(d) {
                    var winRate = +(d.nwins/d.ngames).toFixed(2)
                    if (winRate > 0.5) { return dim_col.left+dim_col.w_names + xScale_win(.5); }
                    else { return dim_col.left+dim_col.w_names + xScale_win(winRate); }
                 })
                 .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2-1; })
                 .attr("height", 2)
                 .attr("width", function(d) { return Math.abs(xScale_win(+(d.nwins/d.ngames).toFixed(2))-xScale_win(.5)); })
                 .style("fill", function(d) {
                   if (metric=="win") { return gray; }
                   else { return "none"; }
                 });
    group1200enter.append("rect")
                   .attr("class", "dotDistance")
                   .attr("x", function(d) {
                      var winRate = +(d.nwins/d.ngames).toFixed(2)
                      if (winRate > 0.5) { return dim_col.left+dim_col.w_names + xScale_win(.5); }
                      else { return dim_col.left+dim_col.w_names + xScale_win(winRate); }
                   })
                   .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2-1; })
                   .attr("height", 2)
                   .attr("width", function(d) { return Math.abs(xScale_win(+(d.nwins/d.ngames).toFixed(2))-xScale_win(.5)); })
                   .style("fill", function(d) {
                     if (metric=="win") { return gray; }
                     else { return "none"; }
                   });

    // Dots
    group420enter.append("circle")
                  .attr("class", "dot")
                  .attr("cx", function(d) { return dim_col.left+dim_col.w_names + xScale_win(+(d.nwins/d.ngames).toFixed(2)); })
                  .attr("cy", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2; })
                  .attr("r", 4)
                  .style("fill", function(d) {
                    var winRate = +(d.nwins/d.ngames).toFixed(2);
                    if (winRate > .5) { return green; }
                    else if (winRate < .5) { return red; }
                    else { return gray; }
                  });
    group450enter.append("circle")
                  .attr("class", "dot")
                  .attr("cx", function(d) { return dim_col.left+dim_col.w_names + xScale_win(+(d.nwins/d.ngames).toFixed(2)); })
                  .attr("cy", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2; })
                  .attr("r", 4)
                  .style("fill", function(d) {
                    var winRate = +(d.nwins/d.ngames).toFixed(2);
                    if (winRate > .5) { return green; }
                    else if (winRate < .5) { return red; }
                    else { return gray; }
                  });
    group1200enter.append("circle")
                  .attr("class", "dot")
                  .attr("cx", function(d) { return dim_col.left+dim_col.w_names + xScale_win(+(d.nwins/d.ngames).toFixed(2)); })
                  .attr("cy", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2; })
                  .attr("r", 4)
                  .style("fill", function(d) {
                    var winRate = +(d.nwins/d.ngames).toFixed(2);
                    if (winRate > .5) { return green; }
                    else if (winRate < .5) { return red; }
                    else { return gray; }
                  });
    // Count labels
    group420enter.append("text")
                 .attr("class", "countLabel")
                 .attr("x", function(d) {
                   if (metric=="play") {
                     if (xScale_play(d.ngames) <= dim_col.w_colmin) { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3; }
                     else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
                   }
                   else {
                    if (d.nwins/d.ngames >= .5) { return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8; }
                    else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
                   }
                 })
                 .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +4; })
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
                     if (d.nwins/d.ngames >= .5) { return "end"; }
                     else { return "start"; }
                   }
                 });
    group450enter.append("text")
                 .attr("class", "countLabel")
                 .attr("x", function(d) {
                   if (metric=="play") {
                     if (xScale_play(d.ngames) <= dim_col.w_colmin) { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3; }
                     else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
                   }
                   else {
                    if (d.nwins/d.ngames >= .5) { return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8; }
                    else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
                   }
                 })
                 .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +4; })
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
                     if (d.nwins/d.ngames >= .5) { return "end"; }
                     else { return "start"; }
                   }
                 });
    group1200enter.append("text")
                   .attr("class", "countLabel")
                   .attr("x", function(d) {
                     if (metric=="play") {
                       if (xScale_play(d.ngames) <= dim_col.w_colmin) { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3; }
                       else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
                     }
                     else {
                      if (d.nwins/d.ngames >= .5) { return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8; }
                      else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
                     }
                   })
                   .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +4; })
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
                       if (d.nwins/d.ngames >= .5) { return "end"; }
                       else { return "start"; }
                     }
                   });

    // Merge enter groups with pre-existing groups
    group420 = group420.merge(group420enter);
    group450 = group450.merge(group450enter);
    group1200 = group1200.merge(group1200enter);

    // Update groups
    // Background
    group420.select(".background") // to allow clickability between name and rect
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; });
    group450.select(".background") // to allow clickability between name and rect
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; });
    group1200.select(".background") // to allow clickability between name and rect
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; });
    // Champion names
    group420.select(".nameLabel")
            .text(function(d) { return d.champion; })
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3; })
            .style("font-family", 'radnika-regular');
    group450.select(".nameLabel")
            .text(function(d) { return d.champion; })
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3; })
            .style("font-family", 'radnika-regular');
    group1200.select(".nameLabel")
            .text(function(d) { return d.champion; })
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3; })
            .style("font-family", 'radnika-regular');
    // Count labels
    group420.select(".countLabel")
            .attr("x", function(d) {
              if (metric=="play") {
                if (xScale_play(d.ngames) <= dim_col.w_colmin) { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3; }
                else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
              }
              else {
               if (d.nwins/d.ngames >= .5) { return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8; }
               else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
              }
            })
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i+dim_col.h_col/2+4; })
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
                if (d.nwins/d.ngames >= .5) { return "end"; }
                else { return "start"; }
              }
            })
            .style("fill", "none");
    group450.select(".countLabel")
            .attr("x", function(d) {
              if (metric=="play") {
                if (xScale_play(d.ngames) <= dim_col.w_colmin) { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3; }
                else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
              }
              else {
               if (d.nwins/d.ngames >= .5) { return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8; }
               else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
              }
            })
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i+dim_col.h_col/2+4; })
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
                if (d.nwins/d.ngames >= .5) { return "end"; }
                else { return "start"; }
              }
            })
            .style("fill", "none");
    group1200.select(".countLabel")
             .attr("x", function(d) {
               if (metric=="play") {
                 if (xScale_play(d.ngames) <= dim_col.w_colmin) { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) + 3; }
                 else { return dim_col.left+dim_col.w_names + xScale_play(d.ngames) - 5;}
               }
               else {
                if (d.nwins/d.ngames >= .5) { return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8; }
                else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
               }
             })
             .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i+dim_col.h_col/2+4; })
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
                 if (d.nwins/d.ngames >= .5) { return "end"; }
                 else { return "start"; }
               }
             })
             .style("fill", "none");

    // bars
    group420.select(".bar")
            .attr("width", function(d) { return xScale_play(d.ngames); })
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
            .style("fill", function(d) {
              if (metric=="play") { return barColor; }
              else { return "none"; }
            });
    group450.select(".bar")
            .attr("width", function(d) { return xScale_play(d.ngames); })
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
            .style("fill", function(d) {
              if (metric=="play") { return barColor; }
              else { return "none"; }
            });
    group1200.select(".bar")
            .attr("width", function(d) { return xScale_play(d.ngames); })
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
            .style("fill", function(d) {
              if (metric=="play") { return barColor; }
              else { return "none"; }
            });

    // Dot distance
    group420.select(".dotDistance")
             .attr("x", function(d) {
                var winRate = +(d.nwins/d.ngames).toFixed(2)
                if (winRate > 0.5) { return dim_col.left+dim_col.w_names + xScale_win(.5); }
                else { return dim_col.left+dim_col.w_names  + xScale_win(winRate); }
             })
             .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2-1; })
             .attr("width", function(d) { return Math.abs(xScale_win(+(d.nwins/d.ngames).toFixed(2))-xScale_win(.5)); })
             .style("fill", function(d) {
               if (metric=="win") { return gray; }
               else { return "none"; }
             });
    group450.select(".dotDistance")
             .attr("x", function(d) {
                var winRate = +(d.nwins/d.ngames).toFixed(2)
                if (winRate > 0.5) { return dim_col.left+dim_col.w_names + xScale_win(.5); }
                else { return dim_col.left+dim_col.w_names  + xScale_win(winRate); }
             })
             .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2-1; })
             .attr("width", function(d) { return Math.abs(xScale_win(+(d.nwins/d.ngames).toFixed(2))-xScale_win(.5)); })
             .style("fill", function(d) {
               if (metric=="win") { return gray; }
               else { return "none"; }
             });
    group1200.select(".dotDistance")
             .attr("x", function(d) {
                var winRate = +(d.nwins/d.ngames).toFixed(2)
                if (winRate > 0.5) { return dim_col.left+dim_col.w_names + xScale_win(.5); }
                else { return dim_col.left+dim_col.w_names  + xScale_win(winRate);  }
             })
             .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2-1; })
             .attr("width", function(d) { return Math.abs(xScale_win(+(d.nwins/d.ngames).toFixed(2))-xScale_win(.5)); })
             .style("fill", function(d) {
               if (metric=="win") { return gray;
               }
               else { return "none"; }
             });
    // Dots
    group420.select(".dot")
            .attr("cx", function(d) { return dim_col.left+dim_col.w_names + xScale_win(+(d.nwins/d.ngames).toFixed(2)); })
            .attr("cy", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
            })
            .style("fill", function(d) {
              var winRate = +(d.nwins/d.ngames).toFixed(2);
              if (winRate > .5) { return green; }
              else if (winRate < .5) { return red; }
              else { return gray; }
            });
    group450.select(".dot")
            .attr("cx", function(d) {
              return dim_col.left+dim_col.w_names + xScale_win(+(d.nwins/d.ngames).toFixed(2));
            })
            .attr("cy", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
            })
            .style("fill", function(d) {
              var winRate = +(d.nwins/d.ngames).toFixed(2);
              if (winRate > .5) { return green; }
              else if (winRate < .5) { return red; }
              else { return gray; }
            });
    group1200.select(".dot")
              .attr("cx", function(d) {
                return dim_col.left+dim_col.w_names + xScale_win(+(d.nwins/d.ngames).toFixed(2));
              })
              .attr("cy", function(d,i) {
                return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
              })
              .style("fill", function(d) {
                var winRate = +(d.nwins/d.ngames).toFixed(2);
                if (winRate > .5) { return green; }
                else if (winRate < .5) { return red; }
                else { return gray; }
              });

    if (metric=="play") {
      // Hide dots & dot distance rects
      svg.selectAll(".dotDistance")
         .style("fill", "none");
      svg.selectAll(".dot")
         .style("fill", "none");
      svg.selectAll(".midline")
         .style('stroke', "none");
      svg.selectAll(".numline_label")
         .style("fill", "none");
    } // end if specific to bar
    else { // if specific to dots
      // Hide bars
      svg.selectAll(".bar")
         .style("fill", "none");
      svg.selectAll(".midline")
         .style("stroke", gray);
      svg.selectAll(".numline_label")
         .style("fill", gray);
    }; // end if specific to dots

    updateMouseover();
    updateSizing(dataset);
  }; // end def of update bars

  function updateGraphicResizing() { // a function to redraw graphic once resized

    // Columns
    svg.select("#col1").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.select("#col2").attr("transform", "translate(" + (margin.left+dim_col.w_col+dim_col.btwn_col1) + "," + margin.top + ")");
    svg.select("#col3").attr("transform", "translate(" + (margin.left+dim_col.w_col*2+dim_col.btwn_col1+dim_col.btwn_col2) + "," + margin.top + ")");

    // Mode labels
    svg.selectAll(".mode_label")
        .attr("x", dim_col.w_col/2);

    // Background
    group420.select(".background") // to allow clickability between name and rect
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i;
            });
    group450.select(".background") // to allow clickability between name and rect
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i;
            });
    group1200.select(".background") // to allow clickability between name and rect
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i;
            });

    // Champion names
    group420.select(".nameLabel")
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            });
    group450.select(".nameLabel")
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            });
    group1200.select(".nameLabel")
             .attr("y", function(d,i) {
               return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
             });
    // Count labels
    // Change count labels in all columns
    if (document.getElementById("graphic").getBoundingClientRect().width>=680) {
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
                   return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8;
                 }
                 else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
                }
              })
              .attr("y", function(d,i) {
                return (dim_col.h_col+dim_col.h_btwn)*i+dim_col.h_col/2+4;
              })
              .style("text-anchor", function(d) {
                if (metric=="play") {
                  if (xScale_play(d.ngames) <= dim_col.w_colmin) { return "start"; }
                  else { return "end";}
                }
                else {
                  if (d.nwins/d.ngames >= .5) { return "end"; }
                  else { return "start"; }
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
                   return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8;
                 }
                 else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
                }
              })
              .attr("y", function(d,i) {
                return (dim_col.h_col+dim_col.h_btwn)*i+dim_col.h_col/2+4;
              })
              .style("text-anchor", function(d) {
                if (metric=="play") {
                  if (xScale_play(d.ngames) <= dim_col.w_colmin) { return "start"; }
                  else { return "end";}
                }
                else {
                  if (d.nwins/d.ngames >= .5) { return "end"; }
                  else { return "start"; }
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
                    return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8;
                  }
                  else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
                 }
               })
               .attr("y", function(d,i) {
                 return (dim_col.h_col+dim_col.h_btwn)*i+dim_col.h_col/2+4;
               })
               .style("text-anchor", function(d) {
                 if (metric=="play") {
                   if (xScale_play(d.ngames) <= dim_col.w_colmin) { return "start"; }
                   else { return "end";}
                 }
                 else {
                   if (d.nwins/d.ngames >= .5) { return "end"; }
                   else { return "start"; }
                 }
               });
    }
    else {
      svg.selectAll(".countLabel").style("fill", "none"); //no fill
    }; // end else

    // bars
    group420.select(".bar")
            .attr("width", function(d) {
              return xScale_play(d.ngames);
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i;
            });
    group450.select(".bar")
            .attr("width", function(d) {
              return xScale_play(d.ngames);
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i;
            });
    group1200.select(".bar")
            .attr("width", function(d) {
              return xScale_play(d.ngames);
            })
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i;
            });

    // Dot distance
    group420.select(".dotDistance")
             .attr("x", function(d) {
                var winRate = +(d.nwins/d.ngames).toFixed(2)
                if (winRate > 0.5) {
                  return dim_col.left+dim_col.w_names + xScale_win(.5);
                }
                else {
                  return dim_col.left+dim_col.w_names  + xScale_win(winRate);
                }
             })
             .attr("y", function(d,i) {
               return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2-1;
             })
             .attr("width", function(d) {
               return Math.abs(xScale_win(+(d.nwins/d.ngames).toFixed(2))-xScale_win(.5));
             });
    group450.select(".dotDistance")
             .attr("x", function(d) {
                var winRate = +(d.nwins/d.ngames).toFixed(2)
                if (winRate > 0.5) {
                  return dim_col.left+dim_col.w_names + xScale_win(.5);
                }
                else {
                  return dim_col.left+dim_col.w_names  + xScale_win(winRate);
                }
             })
             .attr("y", function(d,i) {
               return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2-1;
             })
             .attr("width", function(d) {
               return Math.abs(xScale_win(+(d.nwins/d.ngames).toFixed(2))-xScale_win(.5));
             });
    group1200.select(".dotDistance")
             .attr("x", function(d) {
                var winRate = +(d.nwins/d.ngames).toFixed(2)
                if (winRate > 0.5) {
                  return dim_col.left+dim_col.w_names + xScale_win(.5);
                }
                else {
                  return dim_col.left+dim_col.w_names  + xScale_win(winRate);
                }
             })
             .attr("y", function(d,i) {
               return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2-1;
             })
             .attr("width", function(d) {
               return Math.abs(xScale_win(+(d.nwins/d.ngames).toFixed(2))-xScale_win(.5));
             });
    // Dots
    group420.select(".dot")
            .attr("cx", function(d) {
              return dim_col.left+dim_col.w_names + xScale_win(+(d.nwins/d.ngames).toFixed(2));
            })
            .attr("cy", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
            });
    group450.select(".dot")
            .attr("cx", function(d) {
              return dim_col.left+dim_col.w_names + xScale_win(+(d.nwins/d.ngames).toFixed(2));
            })
            .attr("cy", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
            });
    group1200.select(".dot")
              .attr("cx", function(d) {
                return dim_col.left+dim_col.w_names + xScale_win(+(d.nwins/d.ngames).toFixed(2));
              })
              .attr("cy", function(d,i) {
                return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2;
              });

    // 50% midline label
    svg.selectAll(".numline_label")
        .attr("x", dim_col.left+dim_col.w_names + xScale_win(.5));
    svg.select("#midline1")
        .attr("x1", margin.left + dim_col.left+dim_col.w_names + xScale_win(.5))
        .attr("x2", margin.left + dim_col.left+dim_col.w_names + xScale_win(.5));
    svg.select("#midline2")
        .attr("x1", (margin.left+dim_col.w_col+dim_col.btwn_col1) + dim_col.left+dim_col.w_names + xScale_win(.5))
        .attr("x2", (margin.left+dim_col.w_col+dim_col.btwn_col1) + dim_col.left+dim_col.w_names + xScale_win(.5));
    svg.select("#midline3")
        .attr("x1", margin.left+dim_col.w_col*2+dim_col.btwn_col1+dim_col.btwn_col2 + dim_col.left+dim_col.w_names + xScale_win(.5))
        .attr("x2", margin.left+dim_col.w_col*2+dim_col.btwn_col1+dim_col.btwn_col2 + dim_col.left+dim_col.w_names + xScale_win(.5));

    // breakline
    svg.selectAll(".breakline")
        .attr("x2", w_svg-margin.left-margin.right)
        .attr("y1", function(d,i) {
          return margin.top + dim_col.top + (dim_col.h_col+dim_col.h_btwn)*(i+1)*5 - dim_col.h_btwn/2;
        })
        .attr("y2", function(d,i) {
          return margin.top + dim_col.top + (dim_col.h_col+dim_col.h_btwn)*(i+1)*5 - dim_col.h_btwn/2;
        });

  }; // end updateGraphic Resizing function
  function setup() {
    // Initial settings
    metric = "play";
    sort = "count";

    // Base elements
    // Create column groups
    var col1 = svg.append("g") // make a group element
                  .attr("class", "column")
                  .attr("id", "col1")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // Second column - ARAM; 1200
    var col2 = svg.append("g") // make a group element
                  .attr("class", "column")
                  .attr("id", "col2")
                  .attr("transform", "translate(" + (margin.left+dim_col.w_col+dim_col.btwn_col1) + "," + margin.top + ")");
    // Third column - Nexus Blitz; 450
    var col3 = svg.append("g") // make a group element
                  .attr("class", "column")
                  .attr("id", "col3")
                  .attr("transform", "translate(" + (margin.left+dim_col.w_col*2+dim_col.btwn_col1+dim_col.btwn_col2) + "," + margin.top + ")");

    // Create labels
    col1.append("text")
        .attr("class", "mode_label")
        .attr("x", dim_col.w_col/2)
        .attr("y", 0)
        .text("Nexus Blitz");
    col2.append("text")
        .attr("class", "mode_label")
        .attr("x", dim_col.w_col/2)
        .attr("y", 0)
        .text("Ranked 5v5");
    col3.append("text")
        .attr("class", "mode_label")
        .attr("x", dim_col.w_col/2)
        .attr("y", 0)
        .text("ARAM");

    // Create all the groups
    group420 = col2.selectAll("group420")
                    .data(getSortedDataset(dataset, metric, 420, sort))
                    .enter()
                    .append("g")
                    .attr("class", "champion_group")
                    .attr("transform", "translate(0," + dim_col.top + ")");
    group450 = col3.selectAll("group450")
                   .data(getSortedDataset(dataset, metric, 450, sort))
                   .enter()
                   .append("g")
                   .attr("class", "champion_group")
                   .attr("transform", "translate(0," + dim_col.top + ")");
    group1200 = col1.selectAll("group1200")
                     .data(getSortedDataset(dataset, metric, 1200, sort))
                     .enter()
                     .append("g")
                     .attr("class", "champion_group")
                     .attr("transform", "translate(0," + dim_col.top + ")");

    // Create white backgrounds
    group420.append("rect") // to allow clickability between name and rect
             .attr("class", "background")
             .attr("x", 0)
             .attr("y", function(d,i) {
               return (dim_col.h_col+dim_col.h_btwn)*i;
             })
             .attr("width", dim_col.w_col)
             .attr("height", dim_col.h_col);
    group450.append("rect") // to allow clickability between name and rect
             .attr("class", "background")
             .attr("x", 0)
             .attr("y", function(d,i) {
               return (dim_col.h_col+dim_col.h_btwn)*i;
             })
             .attr("width", dim_col.w_col)
             .attr("height", dim_col.h_col);
    group1200.append("rect") // to allow clickability between name and rect
             .attr("class", "background")
             .attr("x", 0)
             .attr("y", function(d,i) {
               return (dim_col.h_col+dim_col.h_btwn)*i;
             })
             .attr("width", dim_col.w_col)
             .attr("height", dim_col.h_col);

     // Create 50% midline label
     svg.selectAll(".column").append("text")
         .attr("class", "numline_label")
         .attr("x", dim_col.left+dim_col.w_names + xScale_win(.5))
         .attr("y", 23)
         .text("50%")
         .style("fill", "none");

    // Name labels
    group420.append("text") // champion names
            .attr("class", "nameLabel")
            .attr("x", dim_col.w_names-dim_col.btwn_colnames)
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            })
            .text(function(d) {
              return d.champion;
            });
    group450.append("text") // champion names
            .attr("class", "nameLabel")
            .attr("x", dim_col.w_names-dim_col.btwn_colnames)
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            })
            .text(function(d) {
              return d.champion;
            });
    group1200.append("text") // champion names
            .attr("class", "nameLabel")
            .attr("x", dim_col.w_names-dim_col.btwn_colnames)
            .attr("y", function(d,i) {
              return (dim_col.h_col+dim_col.h_btwn)*i + dim_col.h_col/2 +3;
            })
            .text(function(d) {
              return d.champion;
            });

    // Bars
    group420.append("rect") // bars
            .attr("class", "bar")
            .attr("x", dim_col.left+dim_col.w_names)
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
            .attr("width", function(d) { return xScale_play(d.ngames); })
            .attr("height", dim_col.h_col)
            .style("fill", barColor);
    group450.append("rect") // bars
            .attr("class", "bar")
            .attr("x", dim_col.left+dim_col.w_names)
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
            .attr("width", function(d) { return xScale_play(d.ngames); })
            .attr("height", dim_col.h_col)
            .style("fill", barColor);
    group1200.append("rect") // bars
            .attr("class", "bar")
            .attr("x", dim_col.left+dim_col.w_names)
            .attr("y", function(d,i) { return (dim_col.h_col+dim_col.h_btwn)*i; })
            .attr("width", function(d) { return xScale_play(d.ngames); })
            .attr("height", dim_col.h_col)
            .style("fill", barColor);

    // Dot distance
    group420.append("rect")
            .attr("class", "dotDistance")
            .attr("height", 2)
            .style("fill", "none");
    group450.append("rect")
            .attr("class", "dotDistance")
            .attr("height", 2)
            .style("fill", "none");
    group1200.append("rect")
            .attr("class", "dotDistance")
            .attr("height", 2)
            .style("fill", "none");

    // Dots
    group420.append("circle")
            .attr("class", "dot")
            .attr("r", 4)
            .style("fill", "none");
    group450.append("circle")
            .attr("class", "dot")
            .attr("r", 4)
            .style("fill", "none");
    group1200.append("circle")
              .attr("class", "dot")
              .attr("r", 4)
              .style("fill", "none");

    // Count labels
    group420.append("text")
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
                 return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8;
               }
               else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
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
                if (d.nwins/d.ngames >= .5) { return "end"; }
                else { return "start"; }
              }
            });
    group450.append("text") // count labels
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
                 return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8;
               }
               else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
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
                if (d.nwins/d.ngames >= .5) { return "end"; }
                else { return "start"; }
              }
            });
    group1200.append("text") // count labels
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
                  return dim_col.left+dim_col.w_names + xScale_win(0.5) - 8;
                }
                else { return dim_col.left+dim_col.w_names + xScale_win(0.5) + 8; };
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
                 if (d.nwins/d.ngames >= .5) { return "end"; }
                 else { return "start"; }
               }
             });

    // Create 50% lines for dot plots
    var currentHeight = d3.select("#col1").node().getBBox().height;
    svg.append("line")
        .attr("class", "midline")
        .attr("id", "midline1")
        .attr("x1", margin.left + dim_col.left+dim_col.w_names + xScale_win(.5))
        .attr("x2", margin.left + dim_col.left+dim_col.w_names + xScale_win(.5))
        .attr("y1", margin.top + 28)
        .attr("y2", margin.top + currentHeight + 18)
        .style("stroke", "none");
    svg.append("line")
        .attr("class", "midline")
        .attr("id", "midline2")
        .attr("x1", (margin.left+dim_col.w_col+dim_col.btwn_col1) + dim_col.left+dim_col.w_names + xScale_win(.5))
        .attr("x2", (margin.left+dim_col.w_col+dim_col.btwn_col1) + dim_col.left+dim_col.w_names + xScale_win(.5))
        .attr("y1", margin.top + 28)
        .attr("y2", margin.top + currentHeight + 18)
        .style("stroke", "none");
    svg.append("line")
        .attr("class", "midline")
        .attr("id", "midline3")
        .attr("x1", margin.left+dim_col.w_col*2+dim_col.btwn_col1+dim_col.btwn_col2 + dim_col.left+dim_col.w_names + xScale_win(.5))
        .attr("x2", margin.left+dim_col.w_col*2+dim_col.btwn_col1+dim_col.btwn_col2 + dim_col.left+dim_col.w_names + xScale_win(.5))
        .attr("y1", margin.top + 28)
        .attr("y2", margin.top + currentHeight + 18)
        .style("stroke", "none");

    // Create line breaks
    var breakline_g = svg.append("g").attr("id", "breakline_g");
    breakline = breakline_g.selectAll("breakline")
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

    // On click
    champion_groups = svg.selectAll(".champion_group");
    champion_groups.on("click", function(d) {
      var currentChampion = d.champion;
      var nextChampion;
      // Change font weight of name labels in all columns
      champion_groups.selectAll(".nameLabel") // name text
                     .style("font-family", 'radnika-regular')
                     .text(function(d) { return d.champion; })
                     .filter(function(d,i) {
                       return d.champion==currentChampion;
                     })
                     .style("font-family", 'radnika-bold')
                     .text(function(d) {
                       return "#" + findRank(dataset, metric, d.queueid, d.champion) + " " + d.champion; // adds rank value to name label
                     });
      // Change count labels in all columns
      if (document.getElementById("graphic").getBoundingClientRect().width>=680) {
        champion_groups.selectAll(".countLabel")
                       .style("fill", "none")
                       .filter(function(d) {
                         return d.champion==currentChampion;
                       })
                       .style("fill", function(d) {
                         if (xScale_play(d.ngames) <= dim_col.w_colmin) {
                           return "black";
                         }
                         else { return "white";}
                       });
      }; // end if statement

      // Change bar color in all columns
      champion_groups.selectAll(".bar")
                     .style("fill", barColor)
                     .filter(function(d) {
                       return d.champion==currentChampion;
                     })
                     .style("fill", highlightBarColor);
     }) // end on click
  }; // end setup function
  // Resizing
  function resize() {
    // Get width and update scales/margins/sizes
    w_svg = document.getElementById('svg-barchart').getBoundingClientRect().width;
    dim_col.w_col = (w_svg-margin.left-margin.right)/3;
    w_bars = dim_col.w_col - dim_col.left - dim_col.w_names - dim_col.btwn_col1 - dim_col.btwn_col2;
    xScale_play = d3.scaleLinear()
                    .domain([global_min_ngames, global_max_ngames])
                    .range([1, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);
    xScale_win = d3.scaleLinear()
                    .domain([0.32, 0.7])
                    .range([1, dim_col.w_col - dim_col.w_names - dim_col.btwn_colnames]);

    updateGraphicResizing();
  }; // end resize function
  // Function that create subsets
  setup();

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

    // get dataset to be used
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

  window.addEventListener('resize', resize);
}; // end init function
function rowConverter(d) {
  return {
    champion: d.champion,
    queueid: parseInt(d.queueid),
    ngames: parseInt(d.ngames),
    nwins: parseInt(d.nwins),
    nkills: parseInt(d.nkills),
    ndeaths: parseInt(d.ndeaths),
    nassists: parseInt(d.nassists),
    totalminionskilled: parseInt(d.totalminionskilled),
    neutralminionskilled: parseInt(d.neutralminionskilled),
    avgdamagedealtchampions: parseInt(d.avgdamagedealtchampions),
    role: d.role,
    broad_role: d.broad_role
  };
}; // end row converter
d3.csv('champion_stats_by_queue.csv', rowConverter, function(data) {
  // Datasets
  orig_dataset = data;
  dataset_threemodes = data.filter(function(d) { return d.queueid!=470; }); // save data that doesn't include the 470 mode
  dataset = dataset_threemodes;
  init();
}) // end d3.csv()
