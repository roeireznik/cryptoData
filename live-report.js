$( document ).ready(function() {
  $('#btn-live-report').on("click",function(){
    $( "#btn-home,#btn-about" ).removeClass(" btn-primary");
    $( "#btn-home,#btn-about" ).addClass(" btn-link");
    $( "#btn-live-report" ).removeClass("btn-link");
    $( "#btn-live-report" ).addClass( "btn-primary" );
    $( "#allcoins" ).css("display", "none");
    $( "#about" ).css("display", "none");  
    $('#live-report').css("display", "flex")
    $('#search-div').css("display", "none");  

    var favcoins = JSON.parse(localStorage.getItem('favcoin'));

    function newcoindata() {
      async function fetchdata() {
        const apiurl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${favcoins}&tsyms=USD&api_key=679e40ea8d635c25e44de1fe32438b537d65d759a25846db0248f7df76e140af`
        const response = await fetch(apiurl)
        const barChartData = await response.json();
        return barChartData
      }

      fetchdata().then(res => {

        let prices = []

        for (i=0;i<favcoins.length;i++) {
          
          prices.push(res[favcoins[i].toUpperCase()].USD);
        }
        return prices
      })
    }


  async function graph(){

    var options = {
      exportEnabled: true,
      animationEnabled: true,
      title:{
        text: "Crypto currency value in usd "
      },
      axisX: {
        title: "States"
      },
      axisY: {
        title: "price",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      data: []
    };
    
    for(i=0;i<favcoins.length;i++){
    coin = {
      type: "line",
      name: `${favcoins[i].toUpperCase()}`,
      showInLegend: true,
      xValueFormatString: "HH:mm:ss",
      yValueFormatString: "$#,##0.#",
      dataPoints: []
    }
    options.data.push(coin);
  }

  let prices = await newcoindata()
  for(i=0;i<favcoins.length;i++){
    if(options.data[i].dataPoints.length < 10) {
      options.data[i].dataPoints.push({ x: new Date(), y:prices[i] })
    }else{
      chart.options.data[i].dataPoints.shift()
    }
    chart.render();
    await sleep(2);
  }

     $("#live-report").CanvasJSChart(options);
    
  }

  async function showReports() {
    await graph()
  }

























    
      
       
  
  })
    
})



