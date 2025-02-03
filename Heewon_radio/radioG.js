var data = [
    {
      type: 'scatterpolar',
      r: [64.1, 133.2, 5.7, 0.6, 0.78, 114.7, 64.1],
      theta: ['CMP%', 'Pass YDS/G', 'Pass YDS/ATT', 'Rush YDS/ATT', 'TD/INT', 'PR', 'CMP%'],
      fill: 'none',
      name: 'Warren Davis (2024)',
      text: ['CMP%: 65.2', 'Pass YDS/G: 146.2', 'Pass YDS/ATT: 6.5', 'Rush YDS/ATT: 0.6', 'TD/INT: 0.83', 'PR: 124'],
      hoverinfo: 'text'
      
    },
    {
      type: 'scatterpolar',
      r: [68.5, 196.8, 8.7, 3.8, 5, 161.2, 68.5],
      theta: ['CMP%', 'Pass YDS/G', 'Pass YDS/ATT', 'Rush YDS/ATT', 'TD/INT', 'PR', 'CMP%'],
      fill: 'none',
      name: 'J.J. McCarthy (2022-2023 Avg)',
      text: ['CMP%: 68.45', 'Pass YDS/G: 196.8', 'Pass YDS/ATT: 8.7', 'Rush YDS/ATT: 3.8', 'TD/INT: 4.95', 'PR: 161.2'],
      hoverinfo: 'text'
    },
    {
      type: 'scatterpolar',
      r: [60.4, 217.8, 8, 2.1, 3, 144.6, 60.4],
      theta: ['CMP%', 'Pass YDS/G', 'Pass YDS/ATT', 'Rush YDS/ATT', 'TD/INT', 'PR', 'CMP%'],
      fill: 'none',
      name: 'Shea Patterson (2020-2021 Avg)',
      text: ['CMP%: 60.4', 'Pass YDS/G: 217.75', 'Pass YDS/ATT: 8', 'Rush YDS/ATT: 2.1', 'TD/INT: 3.0075', 'PR: 144.6'],
      hoverinfo: 'text'
    },
   
  ];
  
  var layout = {
    polar: {
      radialaxis: { 
        visible: false,
        showgrid: false
      },
      angularaxis: { tickvals: [0, 1, 2, 3, 4, 5], ticktext: ['CMP%', 'Pass YDS/G', 'Pass YDS/ATT', 'Rush YDS/ATT', 'TD/INT', 'PR', 'CMP%'] }
    },
    title: "Quarterback Performance Comparison (2020-2024)",
    showlegend: true,
    annotations: [
      {
        x: 1,
        y: -0.3,
        xref: 'paper',
        yref: 'paper',
        text: "Created by Hee Won Choi | Stats Source: ESPN",
        showarrow: false,
        font: {
          size: 12
        }
      }
    ]
  };
  // Adjust the ranges for each metric
  data.forEach(function(entry) {
    entry.r.forEach(function(value, index) {
      switch(entry.theta[index]) {
        case 'CMP%':
          entry.r[index] = value / 73 * 250; // Adjusting CMP% to fit within range
          break;
        case 'Pass YDS/G':
          entry.r[index] = value / 220 * 250; // Adjusting Pass YDS/G to fit within range
          break;
        case 'Pass YDS/ATT':
          entry.r[index] = value / 9 * 250; // Adjusting Pass YDS/ATT to fit within range
          break;
        case 'Rush YDS/ATT':
          entry.r[index] = value / 4.5 * 250; // Adjusting Rush YDS/ATT to fit within range
          break;
        case 'TD/INT':
          entry.r[index] = value / 5.5 * 250; // Adjusting TD/INT to fit within range
          break;
        case 'PR':
          entry.r[index] = value / 170 * 250; // Adjusting PR to fit within range
          break;
      }
    });
  });
  
  Plotly.newPlot("myDiv", data, layout);
  