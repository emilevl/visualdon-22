import * as d3 from 'd3'
import { dragDisable } from 'd3';

import income from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv';
import life from '../data/life_expectancy_years.csv';
import population from '../data/population_total.csv';
// Pour importer les données
// import file from '../data/data.csv'

//pays: income[0].country
// console.log(income.map(income => income[2021]));
// console.log(population);
// console.log(life)
// console.log(life.map(one => one[2021]));
// console.log(smallestValue(population, 2021));
smallestValue(population, 2021);


const body = d3.select("body");

// // Graphique bâton

const margin = {top: 20, right: 10, bottom: 60, left: 60};
const width = 1500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

d3.select("body")
    .append("div")
    .attr('id', 'graph')
let svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

let x = d3.scaleLinear()
    .domain([0, 10000])
    .range([0, width]);

let y = d3.scaleLinear()
    .domain([0, 90])
    .range([ height, 0]);



svg.append("g")
    .call(d3.axisLeft(y));

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
.attr("transform", "translate(-2,10)")

svg.selectAll("bars")
    .data(income)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.country)+40; })
        .attr("y", function(d) { return y(d.length); })
        .attr("width", "20px")
        .attr("height", function(d) { return height - y(d.length); })
        .attr("fill", "#69b3a2")



// ________________________________________________
// set the dimensions and margins of the graph
// var margin = {top: 10, right: 20, bottom: 30, left: 50},
// width = 500 - margin.left - margin.right,
// height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
// var svg = d3.select("#graph")
// .append("svg")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
// .append("g")
// .attr("transform",
//       "translate(" + margin.left + "," + margin.top + ")");

// //Read the data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv", function(data) {

// // Add X axis
// var x = d3.scaleLinear()
// .domain([0, 10000])
// .range([ 0, width ]);
// svg.append("g")
// .attr("transform", "translate(0," + height + ")")
// .call(d3.axisBottom(x));

// // Add Y axis
// var y = d3.scaleLinear()
// .domain([35, 90])
// .range([ height, 0]);
// svg.append("g")
// .call(d3.axisLeft(y));

// // Add a scale for bubble size
// var z = d3.scaleLinear()
// .domain([200000, 1310000000])
// .range([ 1, 40]);

// // Add dots
// svg.append('g')
// .selectAll("dot")
// .data(data)
// .enter()
// .append("circle")
//   .attr("cx", function (d) { return x(d.gdpPercap); } )
//   .attr("cy", function (d) { return y(d.lifeExp); } )
//   .attr("r", function (d) { return z(d.pop); } )
//   .style("fill", "#69b3a2")
//   .style("opacity", "0.7")
//   .attr("stroke", "black")

// })


function biggestValue (data, date) {
    let biggestValue = 0;
    let number;
    data.forEach(value => {
        if (typeof value[`${date}`] === 'string') {    
            number = strToNumber(value[`${date}`]);
        }else {
            number = value[`${date}`]
        }
        if (number > biggestValue && typeof number !== 'undefined')
            biggestValue = number;
    });
    return biggestValue;
}

function smallestValue (data, date) {
    let smallestValue = 0;
    let number;
    data.forEach((value, index) => {
        // console.log(value[`${date}`])
        if (typeof value[`${date}`] === 'string') {    
            number = strToNumber(value[`${date}`]);
            console.log(number)
        }else {
            number = value[`${date}`]
        }
        if ((number < smallestValue && typeof number !== 'undefined') || index == 0) {
            //smallestValue = number;
            console.log(number)
        }
    });
    return smallestValue;
}

function strToNumber(str) {
    let multiple = 1;
    let lastChar = str.substr(str.length - 1);
    if (lastChar.toLowerCase() == "k")
        multiple = 1000;
    if (lastChar.toLowerCase() == "m")
        multiple = 1000000;
    let number = str.split(lastChar)[0];
    number = parseInt(number * multiple);
}