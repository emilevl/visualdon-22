import * as d3 from 'd3'
import { dragDisable, geoClipRectangle } from 'd3';

import gdp from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv';
import lifeExpectancy from '../data/life_expectancy_years.csv';
import population from '../data/population_total.csv';

// EXERCICE 3

// Récupère toutes les années
const annees = Object.keys(population[0]);
// console.log(annees)

const pop = [],
    income = [],
    life = [],
    dataCombined = [];

// Merge all the three data sets
const mergeByCountry = (a1, a2, a3) => {
    let data = [];
    a1.map(itm => {
        let newObject = {
            ...a2.find((item) => (item.country === itm.country) && item),
            ...a3.find((item) => (item.country === itm.country) && item),
            ...itm
        }
        data.push(newObject);
    })
    return data;
}


annees.forEach(annee => {
    pop.push({ "annee": annee, "data": converterSI(population, annee, "pop") })
    income.push({ "annee": annee, "data": converterSI(gdp, annee, "income") })
    life.push({ "annee": annee, "data": converterSI(lifeExpectancy, annee, "life") })
    const popAnnee = pop.filter(d => d.annee == annee).map(d => d.data)[0];
    const incomeAnnee = income.filter(d => d.annee == annee).map(d => d.data)[0];
    const lifeAnnee = life.filter(d => d.annee == annee).map(d => d.data)[0];
    dataCombined.push({ "annee": annee, "data": mergeByCountry(popAnnee, incomeAnnee, lifeAnnee) })
});
// console.log(dataCombined)


// CREATION DU GRAPHIQUE

dataCombined.forEach(annee => {
    annee.data.forEach(pays => {
        if (isUnknown(pays.income) || isUnknown(pays.life) || isUnknown(pays.pop)) {
            pays.income = null;
            pays.life = null;
            pays.pop = null;
        }
    })
});

d3.select("body")
    .append("div")
    .attr('id', 'graph')

let margin = { top: 10, right: 20, bottom: 30, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

let svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Générer une taille d'axe X cohérente
let biggestGdp = 0;
dataCombined.forEach(annee => {
    annee.data.forEach(pays => {
        if (pays.income >= biggestGdp) {
            biggestGdp = pays.income;
        }
    })
});

// Add X axis
let x = d3.scaleSqrt()
    .domain([0, biggestGdp])
    .range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Générer une taille d'axe Y cohérente
let theBiggestLifeExp = 0;
dataCombined.forEach(annee => {
    annee.data.forEach(pays => {
        if (pays.life >= theBiggestLifeExp) {
            theBiggestLifeExp = pays.life;
        }
    })
});

// Add Y axis
let y = d3.scalePow()
    .exponent(1.25)
    .domain([0, theBiggestLifeExp * 1.1])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

// Add a scale for bubble size
let z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([5, 60]);

// Interval ID
let idInterval;

d3.select('body').append('h1').attr('id', 'anneeCourante')

let i = -1;

animate();

// ___________________ FUNCTION __________________________
function animate() {
    // regarder si l'intervalle a été déjà démarré
    if (!idInterval) {
        idInterval = setInterval(play, 1000);
    }
}


function play() {
    // Recommencer si à la fin du tableau
    if (i == 250) {
        i = 0;
    } else {
        i++;
    }

    d3.select('#anneeCourante').text(dataCombined[i].annee)
    updateChart(dataCombined[i]);
}

// Mettre en pause
function stop() {
    clearInterval(idInterval);
    idInterval = null;
}


// Fonction de mise à jour du graphique
function updateChart(data_iteration) {
    svg.selectAll('circle')
        .data(data_iteration.data)
        .join(enter => enter.append('circle')
            .attr("stroke", "black")
            .style("opacity", "0.7")
            .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
            .attr('cx', function (d) { return x(d.income); })
            .attr('cy', function (d) { return y(d.life); }).transition(d3.transition()
                .duration(500)
                .ease(d3.easeLinear)).attr('r', function (d) { return z(d.pop); }),
            update => update.transition(d3.transition()
                .duration(500)
                .ease(d3.easeLinear))
                .attr('r', function (d) { return z(d.pop); })
                .attr('cx', function (d) { return x(d.income); })
                .attr('cy', function (d) { return y(d.life); }),
            exit => exit.remove())
}

// Convertir les données en chiffres
function converterSI(array, variable, variableName) {
    let convertedVariable = array.map(d => {
        // Trouver le format SI (M, B, k)
        let SI = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? d[variable.toString()].slice(-1) : d[variable.toString()];
        // Extraire la partie numérique
        let number = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? parseFloat(d[variable.toString()].slice(0, -1)) : d[variable.toString()];
        // Selon la valeur SI, multiplier par la puissance
        switch (SI) {
            case 'M': {
                return { "country": d.country, [variableName]: Math.pow(10, 6) * number };
                break;
            }
            case 'B': {
                return { "country": d.country, [variableName]: Math.pow(10, 9) * number };
                break;
            }
            case 'k': {
                return { "country": d.country, [variableName]: Math.pow(10, 3) * number };
                break;
            }
            default: {
                return { "country": d.country, [variableName]: number };
                break;
            }
        }
    })
    return convertedVariable;
};

function isUnknown(elm) {
    return elm === undefined || elm === null || isNaN(elm);
};
