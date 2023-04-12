
    // Datos del conjunto de datos
    const URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

    // Obtener los datos del conjunto de datos
    d3.json(URL).then(data => {
      const dataset = data.data;

      // Ancho y alto del gráfico
      const width = 800;
      const height = 400;

      // Margen del gráfico
      const margin = {
        top: 40,
        right: 20,
        bottom: 60,
        left: 60
      };

      // Calcular el ancho y alto del gráfico sin los márgenes
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      // Crear el elemento svg del gráfico
      const svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);

      // Crear una escala para el eje x
      const xScale = d3.scaleBand()
        .domain(dataset.map(d => d[0]))
        .range([0, chartWidth])
        .padding(0.1);

      // Crear una escala para el eje y
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d[1])])
        .range([chartHeight, 0]);

      // Crear el eje x
      const xAxis = d3.axisBottom(xScale);
      svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
        .call(xAxis);

      // Crear el eje y
      const yAxis = d3.axisLeft(yScale);
      svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

            // Crear las barras del gráfico
      svg.selectAll('.bar')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d[0]) + margin.left)
        .attr('y', d => yScale(d[1]) + margin.top)
        .attr('width', xScale.bandwidth())
        .attr('height', d => chartHeight - yScale(d[1]))
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);

      // Función para manejar el evento de mouseover en las barras
      function handleMouseOver(event, d) {
        // Mostrar tooltip
        const tooltip = d3.select('#tooltip')
          .style('visibility', 'visible')
          .style('top', event.pageY - 50 + 'px')
          .style('left', event.pageX + 'px')
          .attr('data-date', d[0]);
        tooltip.html(`
          <p>Año: ${d[0]}</p>
          <p>PIB: $${d[1]} billones</p>
        `);
      }

      // Función para manejar el evento de mouseout en las barras
      function handleMouseOut() {
        // Ocultar tooltip
        d3.select('#tooltip').style('visibility', 'hidden');
      }

      // Agregar etiquetas al eje x
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - 10)
        .style('text-anchor', 'middle')
        .text('Año');

      // Agregar etiquetas al eje y
      svg.append('text')
        .attr('x', -height / 2)
        .attr('y', 20)
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'middle')
        .text('Billones de dólares');

      // Agregar el título del gráfico
      svg.append('text')
        .attr('id', 'title')
        .attr('x', width / 2)
        .attr('y', margin.top / 2)
        .style('text-anchor', 'middle')
        .style('font-size', '24px')
        .text('Producto Interno Bruto de Estados Unidos por Año');

    }).catch(error => console.error(error));