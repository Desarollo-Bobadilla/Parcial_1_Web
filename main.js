// Tamaño de la pantalla
let width = window.screen.availWidth

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
    
    let Burgers = data[0]
    let Tacos = data[1]
    let Salads = data[2]
    let Desserts = data[3]
    let Drinks_and_Sides = data[4]

    // Incialmente esta cargado 'Burgers' en tarjetas

    createDataVisual(Burgers)

    // Cuando haga click en otro del menu cargo esos productos

    let lis = document.getElementsByTagName("li")
    
    for(let i = 0; i < lis.length; i++){

        lis[i].onclick = function() {

            let prod = lis[i].getElementsByTagName("a")
            let name = prod[0].innerHTML
            deleteInfo()

            if (name === "Burgers") createDataVisual(Burgers)
            else if (name === "Tacos") createDataVisual(Tacos)
            else if (name === "Salads") createDataVisual(Salads)
            else if (name === "Desserts") createDataVisual(Desserts)
            else if (name === "Drinks &amp; Slides") createDataVisual(Drinks_and_Sides)
        }

    }


})

// Generar las cards con la información y guardar en el carrito la información

let carrito = {}

function createDataVisual(dat){

    let data = dat.products
    let subt = document.getElementById("subti")
    subt.innerHTML = dat.name

    if (width <= 428){
        let sec = document.getElementById("apodo")
        sec.innerHTML = dat.name
    }

    let info = document.getElementById("info1")

    let row = document.createElement("div")
    row.className = "row"

    info.appendChild(row)

    for(let i = 0; i < data.length; i++) {

        // Información del producto
        let name = data[i].name
        let description = data[i].description
        let price = data[i].price
        let image = data[i].image

        // CREAR ESTRUCTURA
        let col = document.createElement("div")
        col.className = "col-lg-3 col-12"

        let card = document.createElement("div")
        card.className = "card"


        let img = document.createElement("img")
        img.className = "product card-img-top"
        img.src = image
        img.alt = name

        let card_body = document.createElement("div")
        card_body.className = "btnc card-body"

        let title = document.createElement("h5")
        title.className = "tit card-title"
        title.innerHTML = name

        let text = document.createElement("p")
        text.className = "inf card-text"
        text.innerHTML = description
        
        let num = document.createElement("p")
        num.className = "pri card-text"
        num.innerHTML = "$" + price

        let del = document.createElement("button");
        del.className = "addC"
        del.innerHTML = "Add to cart";

        del.onclick = function() {

            let activity = carrito[data[i].name];

            if (typeof activity == "undefined") {
                carrito[data[i].name] = [1, data[i].price];
            }
            else{
                carrito[data[i].name][0] += 1;
            }

            let total = 0
            for (const [key, value] of Object.entries(carrito)) {
                total += value[0];
            }

            let count = document.getElementById("count")
            count.innerHTML = total + " items"

            let count_v2 = document.getElementById("count_v2")
            count_v2.innerHTML = total + " items"
        }

        // Añadir productos 

        row.appendChild(col)
        col.appendChild(card)
        card.appendChild(card_body)
        card_body.appendChild(img)
        card_body.appendChild(title)
        card_body.appendChild(text)
        card_body.appendChild(num)
        card_body.appendChild(del)

    }
}

function deleteInfo(){

    let info0 = document.getElementById("info0")
    info0.remove()
    let info1 = document.getElementById("info1")
    info1.remove()
    let info2 = document.getElementById("info2")
    info2.remove()

    let body = document.getElementById("data")

    let div1 = document.createElement("div")
    div1.id = "info0"
    div1.className = "col-lg-1 col-2"

    let div2 = document.createElement("div")
    div2.id = "info1"
    div2.className = "col-lg-10 col-8"

    let div3 = document.createElement("div")
    div3.id = "info2"
    div3.className = "col-lg-1 col-2"

    body.appendChild(div1)
    body.appendChild(div2)
    body.appendChild(div3)
}


// Cuando hago click en el carrito

let car = document.getElementById("car")

car.onclick = function() {

    let subt = document.getElementById("subti")
    subt.innerHTML = "ORDER DETAIL"

    deleteInfo()
    createTable()
}

let car_v2 = document.getElementById("car_v2")

car_v2.onclick = function() {

    let subt = document.getElementById("subti")
    subt.innerHTML = "ORDER DETAIL"

    deleteInfo()
    createTable()
}

function createTable() {

    let info = document.getElementById("info1")
    
    let table = document.createElement("table");

    if (width > 428){
        table.className = "table table-striped";
    }
    else{
        table.className = "table";
    }
    
    table.id = "myTable"

    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    
    table.appendChild(thead);
    table.appendChild(tbody);
    info.appendChild(table);

    // HEADERS

    let row_1 = document.createElement("tr");
    let heading_1 = document.createElement("th");
    let heading_2 = document.createElement("th");
    let heading_3 = document.createElement("th");
    let heading_4 = document.createElement("th");
    let heading_5 = document.createElement("th");
    let heading_6 = document.createElement("th");
    
    heading_1.innerHTML = "Item";
    heading_2.innerHTML = "Qty.";
    heading_3.innerHTML = "Description";
    heading_4.innerHTML = "Unit Price";
    heading_5.innerHTML = "Amount";
    heading_6.innerHTML = "Modify";

    if (width > 428){
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        row_1.appendChild(heading_5);
        row_1.appendChild(heading_6);
        thead.appendChild(row_1);
    }

    let num = 1
    for (const [key, value] of Object.entries(carrito)) {

        let row = document.createElement("tr");

        if (width <= 428){
            row.className = "oscura"
        }

        if (num % 2 == 1){
            row.className = "oscura"
            row.id = key
        }
        else{
            row.id = key
        }

        let tem = document.createElement("td");
        tem.innerHTML = num
        num += 1

        let qqty = document.createElement("td");
        qqty.innerHTML = value[0]

        let iption = document.createElement("td");
        iption.innerHTML = key

        let unit = document.createElement("td");
        unit.innerHTML = value[1]

        let amo = document.createElement("td");
        amo.innerHTML = value[0]*value[1]

        let add = document.createElement("button");
        add.innerHTML = "+";
        add.className = "am"

        add.onclick = function() {

            let update = document.getElementById(key)
            let cols = update.getElementsByTagName("td")
            
            if (width <= 428){
                carrito[cols[1].innerHTML][0] += 1
                let cash = document.getElementById("cash")
                cash.innerHTML = "Total: $" + totalCash ()
            }
            else{
                let qq = parseInt(cols[1].innerHTML)
                let pp = cols[3].innerHTML
    
                qq += 1
                cols[1].innerHTML = qq
                cols[4].innerHTML = qq*pp
    
                let cash = document.getElementById("cash")
                cash.innerHTML = "Total: $" + totalCash ()
            }
        }

        let minus = document.createElement("button");
        minus.innerHTML = "-";
        minus.className = "am"

        minus.onclick = function() {
            let update = document.getElementById(key)
            let cols = update.getElementsByTagName("td")

            if (width <= 428){
                carrito[cols[1].innerHTML][0] -= 1
                let cash = document.getElementById("cash")
                cash.innerHTML = "Total: $" + totalCash ()
            }
            else{
                let qq = parseInt(cols[1].innerHTML)
                let pp = cols[3].innerHTML
    
                qq -= 1
                cols[1].innerHTML = qq
                cols[4].innerHTML = qq*pp
    
                let cash = document.getElementById("cash")
                cash.innerHTML = "Total: $" + totalCash ()
            }
        }

        let btns = document.createElement("td");
        btns.appendChild(add)
        btns.appendChild(minus)
        
        if (width > 428) row.appendChild(tem);
        row.appendChild(qqty);
        row.appendChild(iption);
        if (width > 428) row.appendChild(unit);
        if (width > 428) row.appendChild(amo);
        row.appendChild(btns);

        thead.appendChild(row);
    }

    // FINAL POR TAMAÑO
    let final_row = document.createElement("div")
    let final_final_row = document.createElement("div")
    let div1 = document.createElement("div")
    let div2 = document.createElement("div")
    let div3 = document.createElement("div")

    if(width > 428){

        final_row.className = "final_row row"
    
        div1.className = "total col-2"
        div1.id = "cash"
    
        div2.className = "col-7"

        div3.className = "col-3"
    
        info.appendChild(final_row)
    
        final_row.appendChild(div1)
        final_row.appendChild(div2)
        final_row.appendChild(div3)
    }
    else{
        
        final_row.className = "final_row row"
        final_final_row.className = "row"
    
        div1.className = "total col-12"
        div1.id = "cash"
    
        info.appendChild(final_row)
        final_row.appendChild(div1)

        info.appendChild(final_final_row)
        final_final_row.appendChild(div2)
        final_final_row.appendChild(div3)
    }

    // ADD TOTAL AND BUTTONS

    let yes = document.createElement("button");
    yes.innerHTML = "Confirm Order";
    yes.className = "yes"

    yes.onclick = function() {
        confir()
    }

    let no = document.createElement("button");
    no.innerHTML = "Cancel";
    no.className = "no"

    no.onclick = function() {
        //swal("Oops!", "Something went wrong on the page!", "error");
        if (confirm("Cancel the order \nAre you sure about cancelling the order ?") == true) {
            let table = document.getElementById("myTable")
            resetInfoTable(table)
        }
    }

    div1.innerHTML = "Total: $" + totalCash ()
    div3.appendChild(no)
    div3.appendChild(yes)

}

function totalCash () {

    total = 0

    if (width <= 428){
        for (const [key, value] of Object.entries(carrito)) {
            total += value[0]*value[1]   
        }
    }
    else{
        let rows = document.getElementsByTagName("tr")

        for (let i = 1; i < rows.length; i++ ){
            let cols = parseFloat(rows[i].getElementsByTagName("td")[4].innerHTML)
            total += cols
        }
    }

    return total

}

function confir() {

    let info = []

    if(width <= 428){

        let c = 0

        for (const [key, value] of Object.entries(carrito)) {
            let data = {"item": c, "quantity": value[0], 
                        "description": key, "unitPrice": value[1]}
            info.push(data)
            c += 1  
        }

    }
    else{
        let rows = document.getElementsByTagName("tr")
    
        for (let i = 1; i < rows.length; i++ ){
    
            let cols = rows[i].getElementsByTagName("td")
            let data = {"item": cols[0].innerHTML, "quantity": cols[1].innerHTML, 
                        "description": cols[2].innerHTML, "unitPrice": cols[3].innerHTML}
            info.push(data)  
        }
    }

    console.log(info)
}

function resetInfoTable(btn){

    btn.remove()
    carrito = {}

    let cash = document.getElementById("cash")
    cash.innerHTML = "Total: $0"

    let count = document.getElementById("count")
    count.innerHTML = 0 + " items"

    let count_v2 = document.getElementById("count_v2")
    count_v2.innerHTML = 0 + " items"

}



// Change Menu

let body = document.body

changeDims = function() {

    if (width <= 428){
        let newMenu = document.getElementById("nnvar")
        newMenu.style.backgroundColor = "#FDCD55";
    
        let apodo = document.getElementById("apodo")
        apodo.style.color = "black"
    
        var size = [window.width,window.height];
        window.resizeTo(size[0],size[1]);
    }
    else{
        let newMenu = document.getElementById("nnvar")
        newMenu.style.backgroundColor = "#333a40;";
    
        let apodo = document.getElementById("apodo")
        apodo.style.color = "#333a40;"
    
        var size = [window.width,window.height];
        window.resizeTo(size[0],size[1]);
    }
}

changeDims()