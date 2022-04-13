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
const YEAR = 1802;
tabStrToInt(income);
tabStrToInt(life);
tabStrToInt(population);
console.log(smallestValue(life, YEAR));

life.forEach(elm => {

    if (typeof elm[YEAR] === 'undefined' || elm[YEAR] === null) {
        elm[YEAR] = elm[YEAR-2];
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
    .domain([0, biggestValue(income, YEAR) * 1.1])
    .range([0, width]);

// Axe Y, en fonction de l'âge
let y = d3.scalePow()
    .domain([0, biggestValue(life, YEAR) * 1.1])
    .range([ height, 0]);

// La taille des bulles --> Log permet de limiter la différence trop élevée des bulles
let z = d3.scaleSqrt()
    .domain([smallestValue(population, YEAR), biggestValue(population, YEAR)])
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
    .attr("cx", (d) => x(d[YEAR]))
    .attr("r", 10)
    .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
    .style("opacity", "0.7")
    .attr("stroke", "black")

svg.selectAll("circle").data(life).join()
    .attr("cy", (d) => y(d[YEAR]));

svg.selectAll("circle").data(life).join()
    .attr("cy", (d) => y(d[YEAR]));

svg.selectAll("circle").data(population).join()
    .attr("r", (d) => z(d[YEAR]));



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

// ____________________________________________
// Exercice 3

d3.select("body")
    .append("h1")
    .attr('id', 'paragraph')
    .text('Annee')
let nIntervId;
 
function animate() {
	// regarder si l'intervalle a été déjà démarré
	if (!nIntervId) {
		nIntervId = setInterval(play, 1000);
	}
	}
 
let i = 0;
function play() {
    // Recommencer si à la fin du tableau
    if(i == data.length-1) {
        i = 0;
    } else {
        i++;
    }

    // Mise à jour graphique
    d3.select('#paragraphe').text(data[i].annee)
    updateChart([data[i]]);
}
 
// Mettre en pause
function stop() {
			clearInterval(nIntervId);
			nIntervId = null;
					}
 
// Fonction de mise à jour du graphique
function updateChart(data_iteration) {
 
			svg.selectAll('circle')
					.data(data_iteration)
					.join(enter => enter.append('circle')
					.attr('cx',300)
					.attr('cy', 150).transition(d3.transition()
					.duration(500)
					.ease(d3.easeLinear)).attr('r', d=>d.valeur),
					update => update.transition(d3.transition()
					.duration(500)
					.ease(d3.easeLinear)).attr('r', d=>d.valeur),
					exit => exit.remove())
}
 