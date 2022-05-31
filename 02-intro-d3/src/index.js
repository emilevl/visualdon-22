import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

const body = d3.select("body");


const width = window.innerWidth,
height = window.innerHeight;

const h = width/10
const w = height/10;


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

    // let svgSieges = d3.select(".sieges").width(width).height(height);

// append img comfortable-chair-svgrepo-com.svg as an svg to the body
// var width = 800,
//     height = 800;
// let img = await(d3.xml('/comfortable-chair-svgrepo-com.svg'));

// d3.xml('myIllustration.svg')
//     .then(data => {
//         d3.select('body').node().append(data.documentElement)
//     })
let siege = d3.select('.siege')

// g.append('svg')
//   .attr('width', 30)
//   .attr('height', 30)
//   .append(() => img.documentElement);


// var img = g.append("svg:image")
//     .attr("xlink:href", "/comfortable-chair-svgrepo-com.svg")
//     .attr("width", 30)
//     .attr("height", 30)
//     .attr("x", 0)
//     .attr("y",0);
// let newSiege = siege.clone(true)
// .attr('x', 62)
// .attr('y', 50)
// .attr('width', 30)
let iX = 0;
let iY = 0;
for(let i = 1; i < 500; i++){
    let eachImg = siege.clone(true)
      .attr("transform", "translate(" + translateX(i) + ", " + translateY(i) + ")")
      .attr('class', () => {
        if (disney){
          return 'disney';
        }else if (pixar) {
          return 'pixar'
        }else {
          return 'empty'
        }
      })
      // .fill('fill', () => {
      //   return 'blue'
      // })
}

function translateX(i) {
  let positionX = 0;
  if (i%10 == 0) {
    iX = 0;
  } else {
    iX ++;
  }
  positionX = iX * 50;

  return positionX
}

function translateY(i) {
  let positionY = 0;
  if (i%10 == 0) {
    iY ++;
  }
  positionY = iY * 100;

  return positionY
}


// const testsvg = () =>{
//     const svg = d3.create('svg').attr("width", w).attr("height", h)
//     const main = svg.append("g").attr('id','test')
   
//     main.append('circle')
//       .attr('fill','red')
//       .attr("cx", w/2)
//       .attr("cy", h/2)
//       .attr("r", w/2);
  
//     main.append('line')
//       .attr('id','teLine')
//       .attr('x1',w/2)
//       .attr('y1',0)
//       .attr('x2',w/2)
//       .attr('y2',w)
//       .attr('stroke','black')
//       .attr('transform',`rotate(45,${w/2},${h/2})`)
  
//     return svg.node()
//   }

// const svg2 = () => {
//     let i = 0
//     const svg = d3.create('svg').attr("width", width).attr("height", width)
//     const main2 = svg.append("g").attr('id','main2')

//     let other = d3.select(testsvg)
//     let group = other.selectAll('#test').clone(true);

//     let c = main2.selectAll('g')
//         .data(data).join('g')
//         .attr("transform", ([i, j]) => `translate(${i},${j})`)
//         .attr('id', (d,i) => `C2_${i}`)
//         .append(() => group.clone(true).node())
        
//     return svg.node()
// }
// body.append(testsvg)

// body.append(svg2)
// const data = d3.cross(d3.range(0,width,w), d3.range(0,width,h))

// body.append("svg")
//     .attr("width", 500)
//     .attr("height", 500)
//     .attr("class", "svg-test")
//     .append("circle")
//     .attr("class", "circle1")
//     .attr("cx", "50")
//     .attr("cy", "50")
//     .attr("r", "40");

// body.append("svg")
//     .attr("width", 500)
//     .attr("height", 500)
//     .attr("class", "svg-circles1")
//     .append("circle")
//     .attr("class", "circle1")
//     .attr("cx", "50")
//     .attr("cy", "50")
//     .attr("r", "40");

// const svgCircles1 = d3.select(".svg-circles1");

// svgCircles1.append("circle")
//     .attr("class", "circle2")
//     .attr("cx", "150")
//     .attr("cy", "150")
//     .attr("r", "40");

// svgCircles1.append("circle")
//     .attr("class", "circle3")
//     .attr("cx", "250")
//     .attr("cy", "250")
//     .attr("r", "40");

// const circle1 = d3.select(".circle1");
// const circle2 = d3.select(".circle2");
// const circle3 = d3.select(".circle3");

// //Changez la couleur du deuxième cercle
// //Déplacez de 50px vers la droite le premier et le deuxième cercle
// circle2.attr("fill", "red").attr("transform", "translate(50, 0)");
// circle1.attr("transform", "translate(50, 0)");

// //Rajoutez du texte en dessous de chaque cercle2
// svgCircles1.append("text").attr("x", circle1.attr("cx")).attr("y", (parseInt(circle1.attr("cy")) + parseInt(circle1.attr("r")) + 20)).text("Hello");
// svgCircles1.append("text").attr("x", circle2.attr("cx")).attr("y", (parseInt(circle2.attr("cy")) + 100)).text("Hello");
// svgCircles1.append("text").attr("x", circle3.attr("cx")).attr("y", (parseInt(circle3.attr("cy")) + 100)).text("Hello");


// //Alignez verticalement les cercles en cliquant sur le dernier cercle
// circle3.on("click", () => {
//     svgCircles1.selectAll("circle").attr("cx", 200).attr("transform", "translate(0,0)");
//     } )

// //Vous avez à disposition les données suivantes: [20, 5, 25, 8, 15]
// //Ces données représentent la hauteur des rectangles que vous allez dessiner avec la méthode data(data).enter() 
// // que nous avons vue en cours. Les rectangles auront une largeur fixe de 20px et doivent être alignés en bas 
// // l'un à côté de l'autre (comme un graphique en batons ! 📊 )
// const data = [20, 5, 25, 8, 15];

// body.append("div").append("svg")
//   .attr("width", 500)
//   .attr("height", 500)
//   .attr("class", "svg-rect1");

//   const svgRect = d3.select(".svg-rect1");
// //   <rect x="40" y="40" width="60" height="30"></rect>
// console.log(data.length)
// svgRect.selectAll("rect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("x", (d, i) => i * 30)
//     .attr("y", 40)
//     .attr("width", 20)
//     .attr("height", d => d*10)
//     .attr("transform", "rotate(180), translate(-300, -500)")




//     /********************************************** */

// // Select body and add svg to it
// const newBody = d3.select("body").append("svg").attr("width", 600).attr("height", 600);

// // Append first circle
// newBody.append('svg').append('circle')
//   .attr('cx', 50)
//   .attr('cy', 50)
//   .attr('r', 40)
//   .attr('fill', '#6cba61');
// // Append second circle
// newBody.append('svg').append('circle')
// .attr('cx', 150)
// .attr('cy', 150)
// .attr('r', 40)
// .attr('fill', '#7f05aa')
// .attr("transform","translate(50,0)");
// // Append third circle
// newBody.append('svg').append('circle')
//   .attr('cx', 250)
//   .attr('cy', 250)
//   .attr('r', 40)
//   .attr('fill', '#d6563a')
//   .attr("transform","translate(50,0)")
//   .attr("id","lastCircle");

// d3.selectAll('circle')
//     .each(function(){
//     d3.select(this.parentNode).append("text")
//     .text('Circle')
//     .attr("x",d3.select(this.parentNode).node().getBBox().width-60)
//     .attr("y",d3.select(this.parentNode).node().getBBox().height)
// })

// d3.select("#lastCircle").on("click", function(){
//     d3.selectAll('circle')
//     .each(function(){
//         d3.select(this)
//         .transition()
//         .attr("cx", d3.select(this.parentNode.parentNode).node().getBBox().width/2)
//         .attr("transform","none");
//         d3.selectAll('text')
//         .transition()
//         .attr("x",d3.select(this.parentNode.parentNode).node().getBBox().width/2-20);
//     })
// });

// var body2 = d3.select("body");

// var dataRect = [20, 5, 25, 8, 15];

// body2.data(dataRect)
// .enter()
// .append('svg')
// .attr("height", function(h) { return h })
// .attr("width", 30)
// .append("rect")
// .attr("width", 20)
// .attr("height", function(h) { return h })
// .attr("fill", "#69b3a2");