
// Path de los datos
const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

// Obtener y guardar los datos

let data = [];

function get_Data(callback) {
  fetch(url).then(res => res.json()).then(res => {
    callback(res);
  });
}

// Bajar la información

get_Data( (value) => {
    data = value;

    // Dividir por tipo de producto
    
    let Burgers = data[0].products
    let Tacos = data[1].products
    let Salads = data[2].products
    let Desserts = data[3].products
    let Drinks_and_Sides = data[4].products

    // Incialmente esta cargado 'Burgers' en tarjetas

    createDataVisual(Burgers)

    // Cuando haga click en otro del menu cargo esos productos

    let lis = document.getElementsByTagName("li")
    
    for(let i = 0; i < lis.length; i++){

        lis[i].onclick = function() {

            let prod = lis[i].getElementsByTagName("a")
            let name = prod[0].innerHTML
            deleteInfo()

            console.log(name)

            if (name === "Burgers") createDataVisual(Burgers)
            else if (name === "Tacos") createDataVisual(Tacos)
            else if (name === "Salads") createDataVisual(Salads)
            else if (name === "Desserts") createDataVisual(Desserts)
            else if (name === "Drinks &amp; Slides") createDataVisual(Drinks_and_Sides)
        }

    }


})

// Generar las cards con la información y guardar en el carrito la información

let carrito = []

function createDataVisual(data){

    let info = document.getElementById("info")

    for(let i = 0; i < data.length; i++) {

        // Información del producto
        let name = data[i].name
        let description = data[i].description
        let price = data[i].price
        let image = data[i].image

        // CREAR ESTRUCTURA
        let row = document.createElement("div")
        row.className = "row"

        let card = document.createElement("div")
        card.className = "card"
        card.style = "width: 18rem;"

        let img = document.createElement("img")
        img.className = "card-img-top"
        img.src = image
        img.alt = name

        let card_body = document.createElement("div")
        card_body.className = "card-body"

        let title = document.createElement("h5")
        title.className = "card-title"
        title.innerHTML = name

        let text = document.createElement("p")
        text.className = "card-text"
        text.innerHTML = description
        
        let num = document.createElement("p")
        num.className = "card-text"
        num.innerHTML = price

        let del = document.createElement("button");
        del.innerHTML = "Add to cart";

        del.onclick = function() {
            carrito.push(data[i].name)
            let count = document.getElementById("count")
            count.innerHTML = carrito.length
        }

        let hr = document.createElement("hr")

        // Añadir productos 

        info.appendChild(card)
        card.appendChild(card_body)
        card.appendChild(img)
        card_body.appendChild(title)
        card_body.appendChild(text)
        card_body.appendChild(num)
        card_body.appendChild(del)
        info.appendChild(hr)

    }
}

function deleteInfo(){

    let info = document.getElementById("info")
    info.remove()

    let body = document.getElementById("data")
    let div = document.createElement("div")
    div.id = "info"
    body.appendChild(div)
}