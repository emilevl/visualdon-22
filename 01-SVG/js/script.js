let rectangle = document.getElementById("rectangle");

rectangle.onclick = function(){
    if (rectangle.style.fill == "blue") {
        rectangle.style.fill = "red";
    } else {
        rectangle.style.fill = "blue";
    }
};