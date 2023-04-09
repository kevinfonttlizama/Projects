fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(data => {
    
    
    const w = 800;
    const h = 500;
    const padding = 80;
    const xScale = d3.scaleLinear()
            .domain([0, d3.max(data.data, (d) => d[0] )])
            .range([padding, w - padding]);


   const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data.data, (d) => d[1])])
                     .range([h - padding, padding]);
    

    const svg = d3.select("body")
       .append("svg")
       .attr("width", w)
       .attr("height", h);

    svg.selectAll("rect")
       .data(data.data)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 3)
       .attr("y", (d, i) => yScale(d[1]))
       .attr("width", w + padding * 2)
       .attr("height", (d) => h - padding - yScale(d[1]))
       .attr("fill", "navy")
       .attr("class", "bar")   
       .append("title")
       .text((d) => d[1]);
       
    svg.selectAll("text")
       .data(data.data)
       .enter()
       .append("text")
       .text((d) => d)
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - padding + 20 /5 );

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale); 

    svg.append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

    svg.append("g")
      .attr("transform","translate("+ padding + ",0)")
      .call(yAxis);

  })
  .catch(error => console.error(error));