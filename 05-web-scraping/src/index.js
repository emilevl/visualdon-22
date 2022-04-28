import jsdom from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"

/* EX 1 - SCREENSHOT WIKIPEDIA CANTONS */
// (async () => {
//        // simulating a browser
//     const browser = await puppeteer.launch({
//         defaultViewport: {width: 1920, height: 1720}
//     });
//       // open a new web page in the simulated browser
//     const page = await browser.newPage();
//     await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Données_cantonales');
//     await page.screenshot({ path: 'img/wiki.png' });
  
//     await browser.close();
//   })();

/* EX 2 - RECUPERATION DES DONNEES WIKIPEDIA */

// (async () => {
//     const url = 'https://fr.wikipedia.org/wiki/Canton_(Suisse)';
//     const browser = await puppeteer.launch();

//     // Creating an object to store the data
//     function Canton(canton, population) {
//         this.canton = canton;
//         this.population = population;
//     }
  
//     try {
//         const page = await browser.newPage();
//         await page.goto(url);
  
//         const rawData = await page.$$eval('table tr', rows => {
//             return Array.from(rows, row => {
//                 const cols = row.querySelectorAll('td');
//                 return Array.from(cols, col => col.innerText);
//             });
//         });

//         // Preparing array, with values. the canton are from the 3rd child to the 28th.
//         let result = [];
//         for (let i = 2; i < 28; i++) {
//             result.push(new Canton(rawData[i][0],rawData[i][3]));
//         }

//         // Formating array
//         for (let i = 0; i < 26; i++) {
//             // Get the canton name
//             let string = result[i].canton;
//             if (string.includes('\n')) {
//                 result[i].canton = string.slice(0, string.indexOf('\n'));
//             }

//             // Remove spaces in number and convert to Integer
//             result[i].population = result[i].population.replaceAll(/\s/g,'');
//             result[i].population = parseInt(result[i].population)
//         }
//         console.table(result);

//     } catch (error) {
//         console.log('error', error);
//     }
// })();


/* EX 3 - WEBSCRAP D'UN SITE E-COMMERCE */
(async () => {
    
    const star = String.fromCharCode(9733);
    const url = 'https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops';
    const browser = await puppeteer.launch();
  
    try {
        const page = await browser.newPage();
        await page.goto(url);

        let productList = [];

        let div = await page.$$('div.thumbnail')

        for (let el of div) {
            let product = await el.$eval('.title', el => el.textContent);
            let price = await el.$eval('.price', el => el.textContent);
            let nbStars = await el.$eval('.ratings :nth-child(2)', el => el.getAttribute( 'data-rating' ));
            nbStars = parseInt(nbStars);
            // Adding real stars for the ratings
            let stars = '';
            for (let i = 0; i < 5; i++) {
                if (i < 4 && i < nbStars && i > 0) {
                    stars += ' ';
                }
                if (i < nbStars) {
                    stars += star;
                } else {
                    stars += String.fromCharCode(32) + String.fromCharCode(32);
                }
            }
            
            let productComplete = {
                produit: product,
                prix: price,
                etoiles: stars
            }

            productList.push(productComplete);
        }

        console.table(productList);
        
    } catch (error) {
      console.log('error', error);
    }
})();
