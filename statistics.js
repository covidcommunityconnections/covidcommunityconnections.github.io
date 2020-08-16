//database connection
var firebaseConfig = {
  apiKey: "AIzaSyD-1MaCWh4ZkJqDm01P2iA9TajvIClBsaU",
  authDomain: "c-c-c-cc792.firebaseapp.com",
  databaseURL: "https://c-c-c-cc792.firebaseio.com",
  projectId: "c-c-c-cc792",
  storageBucket: "c-c-c-cc792.appspot.com",
  messagingSenderId: "490142429048",
  appId: "1:490142429048:web:d3bb81313019253724e28d",
  measurementId: "G-GBFK7CZQQL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//retrieving data
var Stats = firebase.database().ref("Statistics/");
var statdata;

Stats.once("value").then(function(snapshot) {
  localStorage.setItem("stats", JSON.stringify(snapshot.val()));

  console.log("statdata", statdata);

  showCharts();
});

function showCharts() {
  var testArray = [];
  var testArray2 = [];

  var symptoms_list = [
    "Fever",
    "Chills",
    "Cough",
    "Difficulty Breathing",
    "Fatigue",
    "Muscle or Body Aches",
    "Headache",
    "Loss of Taste or Smell",
    "Sore Throat",
    "Congestion or Runny Nose",
    "Nausea or Vomiting",
    "Diarrhea",
    "No Symptoms"
  ];

  statdata = JSON.parse(localStorage.getItem("stats"));

  for (let i = 0; i < 13; i++) {
    var iname = symptoms_list[i];
    var data_values = statdata[iname];
    var n_values = data_values["neg"];
    var y_values = data_values["pos"];
    var n_percent = Math.round((n_values / (n_values + y_values)) * 100);
    var y_percent = Math.round((y_values / (n_values + y_values)) * 100);
    testArray.push([y_percent, n_percent]);
    testArray2.push({ y: y_values, label: symptoms_list[i] });
  }

  var sortarray = testArray;

  sortarray.sort(function(a, b) {
    return a.y_percent - b.y_percent;
  });


  CanvasJS.addColorSet("neon_colors", [
    "#FFFF00",
    "#25BEA0"
  ]);

  var chart1 = new CanvasJS.Chart("chartContainer1", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,

    title: {
      text: "Fever",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabelFontColor: "white",
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[0][0], label: "Yes" },
          { y: testArray[0][1], label: "No" }
        ]
      }
    ]
  });
  chart1.render();

  var chart2 = new CanvasJS.Chart("chartContainer2", {
    //theme: "dark1", // "light1", "light2", "dark1", "dark2"
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Chills",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabelFontColor: "white",
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[1][0], label: "Yes" },
          { y: testArray[1][1], label: "No" }
        ]
      }
    ]
  });
  chart2.render();

  var chart3 = new CanvasJS.Chart("chartContainer3", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Cough",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontColor: "white",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[2][0], label: "Yes" },
          { y: testArray[2][1], label: "No" }
        ]
      }
    ]
  });
  chart3.render();

  var chart4 = new CanvasJS.Chart("chartContainer4", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Difficulty Breathing",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontColor: "white",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[3][0], label: "Yes" },
          { y: testArray[3][1], label: "No" }
        ]
      }
    ]
  });
  chart4.render();

  var chart5 = new CanvasJS.Chart("chartContainer5", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Fatigue",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontColor: "white",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[4][0], label: "Yes" },
          { y: testArray[4][1], label: "No" }
        ]
      }
    ]
  });
  chart5.render();

  var chart6 = new CanvasJS.Chart("chartContainer6", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Muscle or Body Aches",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontColor: "white",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[5][0], label: "Yes" },
          { y: testArray[5][1], label: "No" }
        ]
      }
    ]
  });
  chart6.render();

  var chart7 = new CanvasJS.Chart("chartContainer7", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Headache",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontColor: "white",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[6][0], label: "Yes" },
          { y: testArray[6][1], label: "No" }
        ]
      }
    ]
  });
  chart7.render();

  var chart8 = new CanvasJS.Chart("chartContainer8", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Loss of Taste/Smell",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontColor: "white",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[7][0], label: "Yes" },
          { y: testArray[7][1], label: "No" }
        ]
      }
    ]
  });
  chart8.render();

  var chart9 = new CanvasJS.Chart("chartContainer9", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Sore Throat",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontColor: "white",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[8][0], label: "Yes" },
          { y: testArray[8][1], label: "No" }
        ]
      }
    ]
  });
  chart9.render();

  var chart10 = new CanvasJS.Chart("chartContainer10", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Congestion/Runny Nose",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontColor: "white",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[9][0], label: "Yes" },
          { y: testArray[9][1], label: "No" }
        ]
      }
    ]
  });
  chart10.render();

  var chart11 = new CanvasJS.Chart("chartContainer11", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Nausea or Vomiting",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontColor: "white",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[10][0], label: "Yes" },
          { y: testArray[10][1], label: "No" }
        ]
      }
    ]
  });
  chart11.render();

  var chart12 = new CanvasJS.Chart("chartContainer12", {
    colorSet: "neon_colors",
    backgroundColor: "",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: "Diarrhea",
      fontColor: "white",
      fontFamily: "Arial Black"
    },
    toolTip: {
      enabled: false
    },
    data: [
      {
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        legendText: "{label}",
        indexLabelFontColor: "white",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: testArray[11][0], label: "Yes" },
          { y: testArray[11][1], label: "No" }
        ]
      }
    ]
  });
  chart12.render();

  var bar = new CanvasJS.Chart("barContainer", {
    animationEnabled: true,
    title: {
      text: ""
    },
    backgroundColor: "",
    dataPointWidth: 20,
    axisY: {
      title: "Number of People With Symptom",
      labelFontColor: "#ffffff",
      titleFontColor: "#ffffff",
      labelAngle: 0,
      fontFamily: "Avenir",
      labelFontSize: 15,
      titleFontSize: 20,
      minimum: 0
    },
    axisX: {
      labelFontColor: "#ffffff",
      fontFamily: "Avenir",
      reversed: true,
      interval: 1,
      labelAutoFit: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
      fontColor: "#ffffff"
    },
    toolTip: {
      shared: false,
      content: toolTipFormatter,
      backgroundColor: "#ffffff",
      animationEnabled: true,
      borderThickness: 3,
      cornerRadius: 5
    },

    data: [
      {
        type: "bar",
        name: "People",
        color: "#FFFF00",
        dataPoints: testArray2
      }
    ]
  });
  bar.render();

  function toolTipFormatter(e) {
    var str = "";
    var total = 0;
    var tot_count = 0;
    var tot_avg;
    var str3;
    var str2;
    for (var i = 0; i < e.entries.length; i++) {
      var str1 =
        '<span style= "color:black">' +
        e.entries[i].dataSeries.name +
        "</span>: " +
        e.entries[i].dataPoint.y +
        " <br/>";
      total = e.entries[i].dataPoint.y + total;
      tot_count += 1;
      str = str.concat(str1);
    }
    tot_avg = Math.round(total / tot_count);
    str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
    return str2.concat(str);
  }

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    bar.render();
  }
}
