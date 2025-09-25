# bar-chart
"Technology Industry Growth Bar Chart"

## Description
Developed the **Technology Industry Growth Bar Chart** as part of freeCodeCamp’s Data Visualization certification. This D3.js-based project visualizes U.S. GDP growth from 1947 to 2015 as a proxy for technology industry growth, using data from the Bureau of Economic Analysis (via freeCodeCamp’s dataset). The chart features a futuristic, cyberpunk aesthetic with neon cyan (`#00b7eb`), neon green (`#39ff14`), and a dark circuit-patterned background, aligning with my **PatriotPlates AI** and **PatriotSecurity AI** branding for the 2026 launch. Inspired by Donald Trump’s no-tax-on-tips policy, Elon Musk’s AI innovation with xAI, and Gordon Ramsay’s pursuit of excellence, this project complements my roles as a **Front-End Developer**, **FoodTech Entrepreneur**, and **Cybersecurity Analyst** in **West Columbia, SC** (flexible for **Miami or Tampa, FL**). It integrates with my Stratford Cooking and Catering Diploma with Highest Honors and synergizes with **Nae’s PatriotPlates AI RPG Creature Search** and **PatriotPlates AI & PatriotSecurity AI Interactive Menu** through a shared futuristic theme. The project adheres to WCAG 2.1 Level AA accessibility standards and passes all 14 freeCodeCamp test cases.

## Features
- **Data Visualization**: Displays U.S. GDP growth (1947–2015) as a bar chart using D3.js, with each bar representing a quarter’s GDP in billions USD.
- **Interactive Tooltip**: Shows the date and GDP value on hover, with `data-date` and `data-gdp` attributes for accessibility and test compliance.
- **Responsive Design**: Adapts to mobile devices with media queries (`<600px`) for smaller fonts and padding.
- **Futuristic Aesthetic**: Uses neon cyan (`#00b7eb`) for bars, neon green (`#39ff14`) for hover effects, and a circuit-patterned dark background (`#1c2526`) with the Orbitron font.
- **Accessibility**: Implements ARIA attributes (e.g., `aria-live` for tooltips) and high-contrast colors for WCAG 2.1 Level AA compliance.
- **Axes and Labels**: Includes a time-based x-axis (years, 5-year intervals) and y-axis (GDP in billions USD), with clear labels for context.
- **Synergy**: Shares a futuristic design with **PatriotPlates AI & PatriotSecurity AI Interactive Menu** and **RPG Creature Search**, reinforcing my portfolio’s tech-forward branding.

## Achievements
- Passed all 14 freeCodeCamp Data Visualization test cases, ensuring correct data rendering, axes, and interactivity.
- Mastered D3.js for scalable, dynamic data visualization with precise scaling and axis configuration.
- Designed a visually cohesive interface that reflects my expertise in FoodTech and cybersecurity through a futuristic lens.
- Integrated inspirations from Trump’s no-tax-on-tips policy, Musk’s xAI leadership, and Ramsay’s culinary standards to create a unique tech-culinary narrative.
- Ensured accessibility for users with disabilities, leveraging my experience with Erb’s palsy.
- Strengthened portfolio for **PatriotPlates AI** and **PatriotSecurity AI** 2026 launch.

## Code Sample
Below is the bar creation section from `script.js`, which uses D3.js to render the GDP data as bars with interactivity:
```javascript
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
