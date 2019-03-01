// Univariate function plotter
// Semidan Robaina Estévez, 2018
function draw() {
  try {
    // compile the expression
    const expression = document.getElementById('eq').value;
    const node = math.parse(expression);
    const expr = node.compile();

    // parse input
    const xmin = document.getElementById('minval').value;
    const xmax = document.getElementById('maxval').value;
    const x_step_size = document.getElementById('step_size').value;

    // evaluate the expression repeatedly for different values of x
    const xValues = math.range(
      parseFloat(xmin), parseFloat(xmax), x_step_size).toArray();
    const yValues = xValues.map(function (x) {
      return expr.eval({x: x})
    });

    // render the plot using plotly
    const trace1 = {
      x: xValues,
      y: yValues,
      mode: 'lines',
      line: {
       //color: 'rgb(000, 000, 100)',
       width: 3
      }
    };
    const data = [trace1];
    const layout = {
      title:'$$f(x) = ' + node.toTex() + '$$',
      xaxis:{title: '$$x$$'},
      yaxis:{title: '$$f(x)$$'}
    };

    var plot = document.getElementById('plot');
    Plotly.newPlot(plot, data, layout);

  }
  catch (err) {
    console.error(err);
    alert(err);
  }
}

document.getElementById('form').onsubmit = function (event) {
  event.preventDefault();
  draw();
}

draw();
