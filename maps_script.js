/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

var data;

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#ffff00");
polygonTemplate.stroke = am4core.color("#191919");

polygonTemplate.events.on("hit", function(ev) {
  data = ev.target.dataItem.dataContext;
  geocode(data.id, data.name);
});

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#e5e502");

// Remove Antarctica
polygonSeries.exclude = ["AQ"];

// Add zoom control
chart.zoomControl = new am4maps.ZoomControl();

function global_stats() {
  axios
    .get("https://api.covid19api.com/summary", {})
    .then(function(response) {
      var country = response.data.Global;

      document.getElementById("country_name").innerHTML = "Global Statistics";

      document.getElementById("new_confirmed").innerHTML = country.NewConfirmed;
      document.getElementById("new_death").innerHTML = country.NewDeaths;
      document.getElementById("new_recovered").innerHTML = country.NewRecovered;

      document.getElementById("total_confirmed").innerHTML =
        country.TotalConfirmed;
      document.getElementById("total_death").innerHTML = country.TotalDeaths;
      document.getElementById("total_recovered").innerHTML =
        country.TotalRecovered;

 
    })
    .catch(function(error) {
      console.log(error);
    });
}

function geocode(d, n) {
  axios
    .get("https://api.covid19api.com/summary", {})
    .then(function(response) {
      var countries_list = response.data.Countries;
      var ind = 0;

      for (let c of countries_list) {
        if (c.CountryCode == d) {
          break;
        } else {
          ind++;
        }
      }

      console.log(countries_list[ind]); // list of all countries

      var country = countries_list[ind];

      document.getElementById("country_name").innerHTML = n;

      if (n == "Greenland") {
        // check if any other countries are undefined
        document.getElementById("new_confirmed").innerHTML = "undefined";
        document.getElementById("new_death").innerHTML = "undefined";
        document.getElementById("new_recovered").innerHTML = "undefined";

        document.getElementById("total_confirmed").innerHTML = "undefined";
        document.getElementById("total_death").innerHTML = "undefined";
        document.getElementById("total_recovered").innerHTML = "undefined";
      } else {
        document.getElementById("new_confirmed").innerHTML =
          country.NewConfirmed;
        document.getElementById("new_death").innerHTML = country.NewDeaths;
        document.getElementById("new_recovered").innerHTML =
          country.NewRecovered;

        document.getElementById("total_confirmed").innerHTML =
          country.TotalConfirmed;
        document.getElementById("total_death").innerHTML = country.TotalDeaths;
        document.getElementById("total_recovered").innerHTML =
          country.TotalRecovered;
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
