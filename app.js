

//definimos el array de objetos zapatillas

let zapatillas = [
    {id: 1, marca: "adidas", color: "rosa", cantidad: 10, precio: 120},
    {id: 2, marca: "nike", color: "azules", cantidad: 15, precio: 90},
    {id: 3, marca: "vans", color: "rojo", cantidad: 4, precio: 55},
    {id: 4, marca: "converse", color: "negro", cantidad: 2, precio: 60},
    {id: 5, marca: "adidas", color: "blanco", cantidad: 5, precio: 85},
    {id: 6, marca: "puma", color: "verde", cantidad: 8, precio: 130},
    {id: 7, marca: "vans", color: "blanco", cantidad: 3, precio: 80},
    {id: 8, marca: "puma", color: "blanco", cantidad: 1, precio: 75},
    {id: 9, marca: "nike", color: "negro", cantidad: 3, precio: 65},
    {id: 10, marca: "converse", color: "rojo", cantidad: 4, precio: 100},
    {id: 11, marca: "nike", color: "rosa", cantidad: 6, precio: 75},
    {id: 12, marca: "puma", color: "negro", cantidad: 7, precio: 130}
 ];

 crearProducto(zapatillas)

 function crearProducto(arrayZapatilla){
     let contenedorZapatillas = document.getElementById("contenedorZapatillas")
     arrayZapatilla.forEach(zapatilla =>{
         let cardZapatilla = document.createElement("div")
         cardZapatilla.classList.add("card", "col-sm-3", "zapatilla", zapatilla.marca, zapatilla.color)
         cardZapatilla.setAttribute("data-marca", zapatilla.marca)


         cardZapatilla.innerHTML = `
         <img src="./img/${zapatilla.marca}-${zapatilla.id}.png" class="card-img-top" alt="zapatilla">
     <div class="card-body">
         <h5 class="card-title">Zapatillas ${zapatilla.marca} ${zapatilla.color}</h5>
     </div>
     <ul class="list-group list-group-flush">
         <li class="list-group-item">Cantidad: <b>${zapatilla.cantidad}</b></li>
         <li class="list-group-item">Precio: <b>$${zapatilla.precio}</b></li>
     </ul>
     <div class="card-body">
         <button class="btn btn-primary agregarCarrito" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Agregar al carrito</button>
     </div>`

         contenedorZapatillas.appendChild(cardZapatilla)
     })
 }



//Buscador funcional que muestra productos segun su marca y que al ingresar una marca que no existe mande un mensaje de error

let boxZapatillas = document.getElementById("boxZapatillas")
 
//se selecciona el elemento del buscador y cuando se presiona una tecla esta funcion se activa

document.addEventListener("keypress", e =>{
 if (e.target.matches("#buscador")) {  //verifica si el elemento que desencadeno el evento del teclado coincide con el elemento del buscador
     filtrarZapatillas(e.target.value.toLowerCase()) //si el elemento desencadenado coincide con el buscador se llama a la funcion filtrarZapatillas
     if(e.key === "Enter"){  //se encarga de evitar el comportamiento predeterminado de la tecla enter
         e.preventDefault()
     }
 }
})

 //se compara  la marca de cada zapatilla con el termino de busqueda
 // si la marca existe, solo muestra las zapatillas de cada marca
 // si no existe, muestra un mensaje 
 function filtrarZapatillas(buscador){
     let marcaEncontrada = false
     document.querySelectorAll(".zapatilla").forEach(zapatilla =>{
         let marcaZapatilla = zapatilla.dataset.marca.toLowerCase()
         if (marcaZapatilla.includes(buscador)) {
             zapatilla.classList.remove("filtro");
             marcaEncontrada = true;
         } else {
             zapatilla.classList.add("filtro");
         }
 })

     let marcaNoEncontrada = document.getElementById("mensajeNoEncontrado")
     if(!marcaEncontrada){
         marcaNoEncontrada.style.display = "block"
     }else{
         marcaNoEncontrada.style.display = "none"
     }
 } 





 let boxCarrito = document.querySelector("#boxCarrito")

 //se intenta cargar el contenido del carrito desde el localStorage
 //si no hay nada en el local storage se inicializa como un array vacio
 let carritoGuardado = JSON.parse(localStorage.getItem("boxCarrito")) || [] 


 //funcion que se encarga de mostrar el contenido del carrito al cargar la pagina y al agregar un nuevo elemento al carrito
 function renderizarCarrito(){
     boxCarrito.innerHTML = ""

     carritoGuardado.forEach(zapatilla =>{
         let productoCarrito = document.createElement("div")
         productoCarrito.innerHTML = `
         <div class="card mb-3" data-id="${zapatilla.id}">
                 <div class="row g-0">
                   <div class="col-md-4">
                     <img src="./img/${zapatilla.marca}-${zapatilla.id}.png" class="img-fluid rounded-start" alt="zapatilla">
                   </div>
                   <div class="col-md-6">
                     <div class="card-body">
                       <h5 class="card-title">${zapatilla.marca} ${zapatilla.color}</h5>
                       <p class="card-text">precio: $${zapatilla.precio}</p>
                       <p class="card-text">cantidad: <b class="ctn-${zapatilla.id}"></b></p>
                     </div>
                   </div>
                   <div class ="col-md-2 btn-cerrar">
                   <button type="button" class="btn-close btn-${zapatilla.marca}-${zapatilla.color}" aria-label="Close"></button>
                   </div>
                 </div>
               </div>
         `
         boxCarrito.appendChild(productoCarrito)
     })
 }

 renderizarCarrito()


 //suma precio y cantidad de productos
 let precio = document.getElementById("precioTotal")
let contadorCarrito = document.getElementById("contadorCarrito")
let itemCarrito = document.getElementById("itemTotal")

function sumaCarrito(){
 let precioTotal = 0
 let productosCarrito = carritoGuardado.length
 carritoGuardado.forEach(zapatillaCarrito => {
     precioTotal += zapatillaCarrito.precio
 })

 itemCarrito.textContent = `${productosCarrito}`
 contadorCarrito.textContent = `${productosCarrito}`
 precio.textContent = `${precioTotal}`

}

sumaCarrito()

 //para cada zapatilla se seleccionan todos los botones de "agregar al carrito" con la clase correspondiente a la marca en el DOM


    
     zapatillas.forEach(zapatilla => {
     let productos = document.querySelectorAll(`.zapatilla.${zapatilla.marca}.${zapatilla.color}`)
     let cantidadp = document.querySelector(`.ctn-${zapatilla.id}`)
     //cuando se hace click en "agregar al carrito" se agrega esa zapatilla al carritoGuardado y se actualiza en contenido en el localStorage
     //se llama a la funcion renderizarCarrito para mostrar los cambios en el html mostrando el nuevo producto agregado

     productos.forEach(boton => {
         boton.addEventListener("click", () =>{
                const zapatillaExistente = carritoGuardado.find(item => item.id === zapatilla.id)
            
                if (zapatillaExistente) {
                    // Muestra una alerta indicando que el producto ya está en el carrito
                    /* alert(`El producto ${zapatilla.marca} ${zapatilla.color} ya está en el carrito.`); */
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `El producto ${zapatilla.marca.toUpperCase()} ${zapatilla.color.toUpperCase()} ya está en el carrito.`,
                      });
                } else {
                    // Agrega el producto al carrito si no existe
                    carritoGuardado.push({ ...zapatilla, cantidad: 1 });
                    localStorage.setItem("boxCarrito", JSON.stringify(carritoGuardado));
                    renderizarCarrito();
                    sumaCarrito();
                    console.log(carritoGuardado);
                }
         })
     })
 })



 //crear una funcion que elimine los datos del carrito

 let LimpiarCarrito = document.getElementById("borrarCarrito")
 LimpiarCarrito.addEventListener("click", borrarCarrito)

 //con innerHTML limpiamos el contenido del carrito en el html
 // carritoGuardado = [] -> reinicia a carritoGuardado

 function borrarCarrito(){
     localStorage.removeItem("boxCarrito")
     boxCarrito.innerHTML = ""
     carritoGuardado = []
     sumaCarrito()
 }

 function eliminar(event) {
    // Accede al elemento padre del botón, que es el contenedor de la zapatilla
    const itemAEliminar = event.target.closest(".card");
    console.log(itemAEliminar)
    const idEliminar = itemAEliminar.dataset.id;
    console.log(idEliminar)

    // Elimina el elemento del DOM
    itemAEliminar.remove();
    

    carritoGuardado = carritoGuardado.filter(producto => producto.id != idEliminar);
    localStorage.setItem("boxCarrito", JSON.stringify(carritoGuardado));

        // actualizo los nuevos valores del carrito
    sumaCarrito();
}


        document.addEventListener("click", function(event) {
            if (event.target.classList.contains("btn-close")) {
                eliminar(event);
            }
        });

       

        
        

      

       
       
       