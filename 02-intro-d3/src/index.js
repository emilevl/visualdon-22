import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

const body = d3.select("body");

body.append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .attr("class", "svg-circles1")
    .append("circle")
    .attr("class", "circle1")
    .attr("cx", "50")
    .attr("cy", "50")
    .attr("r", "40");

const svgCircles1 = d3.select(".svg-circles1");

svgCircles1.append("circle")
    .attr("class", "circle2")
    .attr("cx", "150")
    .attr("cy", "150")
    .attr("r", "40");

svgCircles1.append("circle")
    .attr("class", "circle3")
    .attr("cx", "250")
    .attr("cy", "250")
    .attr("r", "40");

const circle1 = d3.select(".circle1");
const circle2 = d3.select(".circle2");
const circle3 = d3.select(".circle3");

//Changez la couleur du deuxième cercle
//Déplacez de 50px vers la droite le premier et le deuxième cercle
circle2.attr("fill", "red").attr("transform", "translate(50, 0)");
circle1.attr("transform", "translate(50, 0)");

//Rajoutez du texte en dessous de chaque cercle2
svgCircles1.append("text").attr("x", circle1.attr("cx")).attr("y", (parseInt(circle1.attr("cy")) + parseInt(circle1.attr("r")) + 20)).text("Hello");
svgCircles1.append("text").attr("x", circle2.attr("cx")).attr("y", (parseInt(circle2.attr("cy")) + 100)).text("Hello");
svgCircles1.append("text").attr("x", circle3.attr("cx")).attr("y", (parseInt(circle3.attr("cy")) + 100)).text("Hello");


//Alignez verticalement les cercles en cliquant sur le dernier cercle
circle3.on("click", () => {
    svgCircles1.selectAll("circle").attr("cx", 200).attr("transform", "translate(0,0)");
    } )

//Vous avez à disposition les données suivantes: [20, 5, 25, 8, 15]
//Ces données représentent la hauteur des rectangles que vous allez dessiner avec la méthode data(data).enter() 
// que nous avons vue en cours. Les rectangles auront une largeur fixe de 20px et doivent être alignés en bas 
// l'un à côté de l'autre (comme un graphique en batons ! 📊 )
const data = [20, 5, 25, 8, 15];

body.append("div").append("svg")
  .attr("width", 500)
  .attr("height", 500)
  .attr("class", "svg-rect1");

  const svgRect = d3.select(".svg-rect1");
//   <rect x="40" y="40" width="60" height="30"></rect>
console.log(data.length)
svgRect.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 30)
    .attr("y", 40)
    .attr("width", 20)
    .attr("height", d => d*10)
    .attr("transform", "rotate(180), translate(-300, -500)")




    /********************************************** */

// Select body and add svg to it
const newBody = d3.select("body").append("svg").attr("width", 600).attr("height", 600);

// Append first circle
newBody.append('svg').append('circle')
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', 40)
  .attr('fill', '#6cba61');
// Append second circle
newBody.append('svg').append('circle')
.attr('cx', 150)
.attr('cy', 150)
.attr('r', 40)
.attr('fill', '#7f05aa')
.attr("transform","translate(50,0)");
// Append third circle
newBody.append('svg').append('circle')
  .attr('cx', 250)
  .attr('cy', 250)
  .attr('r', 40)
  .attr('fill', '#d6563a')
  .attr("transform","translate(50,0)")
  .attr("id","lastCircle");

d3.selectAll('circle')
    .each(function(){
    d3.select(this.parentNode).append("text")
    .text('Circle')
    .attr("x",d3.select(this.parentNode).node().getBBox().width-60)
    .attr("y",d3.select(this.parentNode).node().getBBox().height)
})

d3.select("#lastCircle").on("click", function(){
    d3.selectAll('circle')
    .each(function(){
        d3.select(this)
        .transition()
        .attr("cx", d3.select(this.parentNode.parentNode).node().getBBox().width/2)
        .attr("transform","none");
        d3.selectAll('text')
        .transition()
        .attr("x",d3.select(this.parentNode.parentNode).node().getBBox().width/2-20);
    })
});

var body2 = d3.select("body");

var dataRect = [20, 5, 25, 8, 15];

body2.data(dataRect)
.enter()
.append('svg')
.attr("height", function(h) { return h })
.attr("width", 30)
.append("rect")
.attr("width", 20)
.attr("height", function(h) { return h })
.attr("fill", "#69b3a2");