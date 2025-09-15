d3.json("gdp-data.json")
  .then((data) => {
    // Parse data
    const dataset = data.data.map((d) => ({
      date: d[0], // Keep as string for data-date
      gdp: parseFloat(d[1]) // Parse as number for yScale
    }));

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 70, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    // Create chart group
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse dates and GDP values
    const parseDate = d3.timeParse("%Y-%m-%d");
    const dates = dataset.map((d) => parseDate(d.date));
    const gdpValues = dataset.map((d) => d.gdp);

    // Set up scales
    const xScale = d3
      .scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([0, width])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(gdpValues)])
      .range([height, 0])
      .nice();

    // Create axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(d3.timeYear.every(5))
      .tickFormat(d3.timeFormat("%Y"));

    const yAxis = d3.axisLeft(yScale);

    // Append x-axis
    chart
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll(".tick")
      .attr("class", "tick");

    // Append y-axis
    chart
      .append("g")
      .attr("id", "y-axis")
      .call(yAxis)
      .selectAll(".tick")
      .attr("class", "tick");

    // Add axis labels
    chart
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 50)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--axis-color)")
      .text("Year");

    chart
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--axis-color)")
      .text("Growth (Billions USD)");

    // Create bars
    chart
      .selectAll(".bar")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", (d) => d.date)
      .attr("data-gdp", (d) => d.gdp)
      .attr("x", (d) => xScale(parseDate(d.date)))
      .attr("y", (d) => yScale(d.gdp))
      .attr("width", width / dataset.length)
      .attr("height", (d) => height - yScale(d.gdp))
      .on("mouseover", (event, d) => {
        d3.select("#tooltip")
          .style("opacity", 0.9)
          .attr("data-date", d.date)
          .html(`Date: ${d.date}<br>Growth: $${d.gdp.toFixed(1)} Billion`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 50}px`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
      });
  })
  .catch((error) => {
    console.error("Error loading the data:", error);
  });