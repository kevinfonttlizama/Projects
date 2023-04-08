
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(data => {
    
    
    const w = 500;
    const h = 1000;
    const padding = 50
    

    const svg = d3.select("body")
       .append("svg")
       .attr("width", w)
       .attr("height", h);

    svg.selectAll("rect")
       .data(data.data)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - 3 * d[1])
       .attr("width", 25)
       .attr("height", (d, i) => d[1] * 3)
       .attr("fill", "navy")
       .attr("class", "bar")
       .attr("padding", (d) => d = 0.1)
       .append("title")
       .text((d) => d[1])
       
    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text((d) => d)
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - (d * 3 + 3))

  })
  .catch(error => console.error(error));

