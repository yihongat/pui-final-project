import * as d3 from "d3";

export function HorizontalBarChart(
  data: any,
  {
    // x = ([x]) => x, // given d in data, returns the (temporal) x-value
    // y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    width = 928, // width of the chart, in pixels
    color = "#D74040",
  } = {}
) {
  var margin = { top: 20, right: 30, bottom: 40, left: 90 },
    width = 460 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const svgInner = svg.selectChild();

  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d.videoCount;
      }),
    ])
    .range([0, width]);
  svgInner
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(0,0)")
    .style("text-anchor", "end");

  // Y axis
  var y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      data.map(function (d: any) {
        return d.day;
      })
    )
    .padding(0.1);
  svgInner.append("g").call(d3.axisLeft(y));

  //Bars
  svgInner
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d: any) {
      return y(d.day);
    })
    .attr("width", function (d) {
      return x(d.videoCount);
    })
    .attr("height", y.bandwidth())
    .attr("fill", color);

  return svg.node();
}
