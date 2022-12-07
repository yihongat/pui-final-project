import * as d3 from "d3";

export function HorizontalBarChart(
  data: any,
  {
    // x = ([x]) => x, // given d in data, returns the (temporal) x-value
    // y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
    width = 928, // width of the chart, in pixels
    color = "#D74040",
    hoverColor = "#D74040",
    tickSize = 1,
    borderRadius = 0,
  } = {}
) {
  var margin = { top: 20, right: 30, bottom: 40, left: 90 },
    width = 460 - margin.left - margin.right,
    height = 280 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", [
      0,
      0,
      width + margin.left + margin.right,
      height + margin.top + margin.bottom,
    ])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const svgInner = svg.selectChild();

  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d: any) {
        return d.videoCount;
      }),
    ] as any)
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
  svgInner
    .append("g")
    .call(d3.axisLeft(y).tickSize(tickSize).tickPadding(10))
    .call((g) => g.select(".domain").remove());

  //Bars
  svgInner
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function (d: any) {
      return y(d.day) as any;
    })
    .attr("width", x(0))
    .attr("height", y.bandwidth())
    .attr("fill", color)
    .attr("rx", borderRadius);

  svgInner
    .selectAll("rect")
    .transition()
    .duration(2000)
    .attr("width", function (d: any) {
      return x(d.videoCount);
    })
    .delay(function (_, i) {
      return i * 100;
    });

  let tooltip: any = null;
  svgInner
    .selectAll("rect")
    .on("mouseover", function (event, d: any) {
      d3.selectAll(".d3-tooltip").remove();
      tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("top", "0")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "5px 10px")
        .style("background", "rgba(0,0,0,0.7)")
        .style("border-radius", "4px")
        .style("border", "0px solid #909090")
        .style("font-size", "14px")
        .style("width", "140px")
        .style("color", "#EEF2F3")
        .text("Tooltip");
      tooltip
        .html(
          `<div style="font-weight: 500">${d.day}</div><div>${
            Math.round((d.videoCount as number) * 10) / 10
          } videos per day</div>`
        )
        .style("visibility", "visible");
      d3.select(this).transition().attr("fill", hoverColor);
    })
    .on("mousemove", function (event: any) {
      tooltip
        .style("top", event.pageY - 10 + "px")
        .style("left", event.pageX + 10 + "px");
    })
    .on("mouseout", function () {
      tooltip.html(``).style("visibility", "hidden");
      d3.select(this).transition().attr("fill", color);
    });

  return svg.node();
}
