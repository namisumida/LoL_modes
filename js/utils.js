// FUNCTIONS
// text wrapping function
function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.3, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = 0, //parseFloat(text.attr("dy")),
        tspan = text.text(null)
                    .append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", dy + "em");
    while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word);
        }
    }
  });
}; // end wrap function

// Time-related
var parseTime = d3.timeParse("%m/%d/%y %I:%M:%S"); // convert strings to Dates
var formatTime = d3.timeFormat("%I:%M"); // convert Dates to strings

// Colors
var red = d3.rgb(212,89,84);
var light_red = d3.rgb(229,155,152);
var dark_red = d3.rgb(135, 63, 53);
var maroon = d3.rgb(170,62,71);

var orange = d3.rgb(234,158,43);

var yellow = d3.rgb(232,164,51);
var light_yellow = d3.rgb(241,200,132);
var dark_yellow = d3.rgb(206, 112, 32);

var lime = d3.rgb(148,157,71);
var teal = d3.rgb(56,118,104);

var blue = d3.rgb(20,151,252);
var light_blue = d3.rgb(113,192,253);
var dark_blue = d3.rgb(0, 109, 230);
