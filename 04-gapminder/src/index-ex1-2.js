import * as d3 from 'd3'
import { dragDisable, geoClipRectangle } from 'd3';

import income from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv';
import life from '../data/life_expectancy_years.csv';
import population from '../data/population_total.csv';

// Affichage des différentes données (test)
// console.log(income.map(income => income[2021]));
// console.log(population);
// console.log(life)
// console.log(life.map(one => one[2021]));
// console.log(smallestValue(population, 2021));
// console.log(biggestValue(population, 2021));
tabStrToInt(income);
tabStrToInt(life);
tabStrToInt(population);
console.log(smallestValue(life, 2021));

life.forEach(elm => {

    if (typeof elm['2021'] === 'undefined' || elm['2021'] === null) {
        elm['2021'] = elm['2019'];
    }
});
const body = d3.select("body");

// Définition des marges

const margin = {top: 20, right: 10, bottom: 60, left: 60};
const width = 1500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// Création du graph de base
d3.select("body")
    .append("div")
    .attr('id', 'graph')
let svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// Axe X, en fonction du revenu
let x = d3.scaleLinear()
    .domain([0, biggestValue(income, 2021) * 1.1])
    .range([0, width]);

// Axe Y, en fonction de l'âge
let y = d3.scalePow()
    .domain([0, biggestValue(life, 2021) * 1.1])
    .range([ height, 0]);

// La taille des bulles --> Log permet de limiter la différence trop élevée des bulles
let z = d3.scaleSqrt()
    .domain([smallestValue(population, 2021), biggestValue(population, 2021)])
    .range([5, 60]);


svg.append("g")
    .call(d3.axisLeft(y));

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
.attr("transform", "translate(-2,10)")

// Add dots
svg.append('g')
    .selectAll("dot")
    .data(income)
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d["2021"]))
    .attr("r", 10)
    .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
    .style("opacity", "0.7")
    .attr("stroke", "black")

svg.selectAll("circle").data(life).join()
    .attr("cy", (d) => y(d["2021"]));

svg.selectAll("circle").data(life).join()
    .attr("cy", (d) => y(d["2021"]));

svg.selectAll("circle").data(population).join()
    .attr("r", (d) => z(d["2021"]));



function biggestValue (data, date) {
    let biggestValue = 0;
    let number;
    data.forEach(value => {
        if (typeof value[`${date}`] === 'string') {
            number = strToNumber(value[`${date}`]);
        }else {
            number = value[`${date}`]
        }
        if (number > biggestValue && typeof number !== 'undefined' && typeof number !== 'null')
            biggestValue = number;
    });
    return biggestValue;
}

function smallestValue (data, date) {
    let smallestValue = 0;
    let number;
    data.forEach((value, index) => {
        if (typeof value[`${date}`] === 'string') { 
            number = strToNumber(value[`${date}`]);
        }else {
            number = value[`${date}`]
        }
        if ((number < smallestValue && typeof number !== 'undefined' && number !== null) || index == 0) {
            smallestValue = number;
        }
    });
    return smallestValue;
}

function strToNumber(str) {
    let SI = typeof str === 'string' ||str instanceof String ? str.slice(-1) : str;
    
    // Extraire la partie numérique
    let number = typeof str === 'string' || str instanceof String ? parseFloat(str.slice(0,-1)) : str;
    
   // Selon la valeur SI, multiplier par la puissance
    switch (SI) {
        case 'M': {
            return number * Math.pow(10, 6);
            break;
        }
        case 'B': {
            return number * Math.pow(10, 9);
            break;
        }
        case 'k': {
            return number * Math.pow(10, 3);
            break;
        }
        default: {
            return number;
            break;
        }
    }
}

// population.forEach(pays => {
//     let popAnneeCourante = pays['2021'];
//     if (typeof popAnneeCourante === 'string') {
//         popAnneeCourante = strToNumber(pays['2021']);
//     }
//     pays['2021'] = popAnneeCourante;
// });
// console.log(population);
// console.log(tabStrToInt(population));
//tabStrToInt(population)
//console.log(population)

function tabStrToInt(tab) {
    tab.forEach(elm => {
        for (let i = 1800; i < 2050; i++) {
            let number = strToNumber(elm[i]);
            
            if (typeof number === 'undefined' || number === null && (typeof elm[i+1] !== undefined && elm[i+1] !== null)) {
                number = (elm[i-1] + elm[i+1]) / 2;
            }
            elm[i] = number;   
        }
    });
}



// _______________________________________________________
/* EXERCICE 2 */
let listCountries = []

// 
life.forEach(row => {
  let countryData = {};
  countryData[row['country']] = row['2021']
  listCountries.push(countryData)
});
console.log(listCountries);

// let margin = {top: 20, right: 20, bottom: 30, left: 50},
//   width = 650 - margin.left - margin.right,
//   height = 500 - margin.top - margin.bottom;

let svgGraph = d3.select("#graph")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom);

  // Map and projection
let path = d3.geoPath();
let projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);
  
// Data and color scale
let colorScale = d3.scaleThreshold()
  .domain([50, 60, 70, 80, 90, 100])
  .range(d3.schemeGreens[7]);

  d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(d){
      // Draw the map
      svgGraph.append("g")
      .selectAll("path")
      .data(d.features)
      .join("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set id
      .attr("id", function(d){ return d.properties.name;})
      .attr("fill", function (d) {
        let number = 0;
        listCountries.forEach(country => {
            if (typeof country[this.id] != "undefined") {
              console.log(country[this.id]);
              number = country[this.id]
            }
        })
        console.log(number);
        return colorScale(number);
      })
  })