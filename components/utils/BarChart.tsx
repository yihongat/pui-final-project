import * as d3 from "d3";

export const BarChart = (
  data: any,
  {
    x = (_: any, i: any) => i, // given d in data, returns the (ordinal) x-value
    y = (d: any) => d, // given d in data, returns the (quantitative) y-value
    title, // given d in data, returns the title text
    marginTop = 20, // the top margin, in pixels
    marginRight = 0, // the right margin, in pixels
    marginBottom = 30, // the bottom margin, in pixels
    marginLeft = 40, // the left margin, in pixels
    width = 640, // the outer width of the chart, in pixels
    height = 400, // the outer height of the chart, in pixels
    xDomain, // an array of (ordinal) x-values
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xPadding = 0.1, // amount of x-range to reserve to separate bars
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor", // bar fill color
    hoverColor = "currentColor",
    tickSize = 1,
    borderRadius = 0,
    removeXLine = false,
  }: any
) => {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);

  // Compute default domains, and unique the x-domain.
  if (xDomain === undefined) xDomain = X;
  if (yDomain === undefined) yDomain = [0, d3.max(Y as any)];
  xDomain = new d3.InternSet(xDomain);

  // Omit any data not present in the x-domain.
  const I = d3.range(X.length).filter((i) => xDomain.has(X[i]));

  // Construct scales, axes, and formats.
  const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3
    .axisBottom(xScale as any)
    .tickSizeOuter(0)
    .tickSize(tickSize)
    .tickPadding(10);
  const yAxis = d3
    .axisLeft(yScale)
    .ticks(height / 40, yFormat)
    .tickSize(tickSize);

  // Compute titles.
  if (title === undefined) {
    const formatValue = yScale.tickFormat(100, yFormat);
    title = (i: any) => `${X[i]}\n${formatValue(Y[i])}`;
  } else {
    const O = d3.map(data, (d) => d);
    const T = title;
    title = (i: any) => T(O[i], i, data);
  }

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yLabel)
    );

  const bar = svg
    .append("g")
    .attr("fill", color)
    .selectAll("rect")
    .data(I)
    .join((enter) =>
      enter
        .append("rect")
        .attr("x", (i) => xScale(X[i] as any) as any)
        .attr("y", () => yScale(0))
        .attr("rx", borderRadius)
        .call((enter) =>
          enter.attr("height", 0).attr("width", xScale.bandwidth())
        )
    );

  bar
    .transition()
    .duration(2000)
    .attr("y", (i) => yScale(Y[i]))
    .attr("height", (i) => yScale(0) - yScale(Y[i]))
    .delay(function (_, i) {
      return i * 100;
    });

  let tooltip: any = null;

  bar
    .on("mouseover", function (event, i) {
      d3.selectAll(".d3-tooltip-bar").remove();
      tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "d3-tooltip-bar")
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
          `<div style="font-weight: 500">${X[i]}</div><div>${
            Math.round((Y[i] as number) * 10) / 10
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

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis)
    .call((g) => g.select(removeXLine ? ".domain" : ".noRemove").remove());

  return svg.node();
};
