const canvas = document.getElementById("chart1");
const form = document.getElementById("form");
const label = document.getElementById("name");
const crear = document.getElementById("crear");
const chart = document.getElementById("chart");
const link = document.getElementById("descargar");
let myChart;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.key);
  const labels = [...document.querySelectorAll("#data > label")];
  let inputs = returnValues([...document.querySelectorAll("#data > input")]);
  const labelText = [];

  labels.forEach((element) => {
    labelText.push(element.textContent);
  });
  createChart(labelText, inputs);
});

form.addEventListener("keydown", (e) => {
  //Para que el usuario tenga que cliquear el boton de agregado
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

label.addEventListener("keyup", () => {
  if (label.value) {
    crear.hidden = false;
  } else {
    crear.hidden = true;
  }
});

crear.addEventListener("click", (e) => {
  const nuevaCategoria = document.querySelector(
    "#inputs > input[type=text]"
  ).value;
  const padre = document.getElementById("data");

  const labelNew = document.createElement("label");
  labelNew.appendChild(document.createTextNode(nuevaCategoria));

  const input = document.createElement("input");
  input.setAttribute("type", "number");

  padre.append(labelNew, input);

  label.value = "";
  chart.hidden = false; // showing the button to generate a chart
  crear.hidden = true; // hidding the button after a new label was added
});

function createChart() {
  let labels = arguments[0];
  let values = arguments[1];

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(canvas, {
    type: chartType(),
    data: {
      labels: [...labels],
      datasets: [
        {
          label: "Top",
          data: [...values],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
      indexAxis: "y",
    },
  });

  link.hidden = false;
}

function chartType() {
  const types = ["bar", "line", "doughnut", "pie", "polarArea", "radar"];
  let i = Math.floor(Math.random() * types.length);
  return types[i];
}

function returnValues() {
  const valuesConverted = [];

  arguments[0].forEach((element) => {
    let n = parseInt(element.value) || 0;
    valuesConverted.push(n);
  });

  return valuesConverted;
}

function dowload() {
  // Get the chart canvas element
  const chartCanvas = document.getElementById("chart1");

  // Get the chart image as a data URL
  const chartImage = chartCanvas.toDataURL("image/png");

  // Save the chart image as a file (optional)
  // const link = document.getElementById("descargar")
  link.download = "myChart.png";
  link.href = chartImage;

  // link.click()
}

link.addEventListener("click", dowload);
