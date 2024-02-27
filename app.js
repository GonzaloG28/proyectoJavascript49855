
 //funcion que crea los productos de la API con sus respectivos datos
 function crearProducto(datosProductos){
     let contenedorProductos = document.getElementById("contenedorProductos")
     datosProductos.forEach(producto =>{
         let cardProducto = document.createElement("div")
         let claseProducto = `producto-${producto.id}-${producto.category.replace(/\s+/g, '-')}`; //Reemplaza todos los espacios en blanco con guiones en la categoría del producto 
         cardProducto.classList.add("card", "col-sm-3", "producto",claseProducto, "hvr-grow")
         cardProducto.setAttribute("data-marca",producto.title )


         cardProducto.innerHTML = `
         <img src="${producto.image}" class="card-img-top" alt="IMGpdto">
         <div class="card-body">
             <h5 class="card-title"> ${producto.title} ${producto.category}</h5>
         </div>
         <ul class="list-group list-group-flush">
             <li class="list-group-item" id="precio_producto">Price: <b>$${parseInt(producto.price)}</b></li>
         </ul>
         <div class="card-body">
             <button class="btn btn-primary agregarCarrito" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add to cart</button>
         </div>`

         contenedorProductos.appendChild(cardProducto)
     })

}

document.getElementById("cargandoMensaje").style.display = "block";

// obtengo todos los datos de la API para usarlo en el proyecto
 fetch('https://fakestoreapi.com/products?limit=20')
    .then(res => res.json())
    .then(datosProductos => {
        document.getElementById("cargandoMensaje").style.display = "none";
        crearProducto(datosProductos);
       

        // AGREAGA CADA PRODUCTO AL CARRITO
        //para cada producto se seleccionan todos los botones de "agregar al carrito" con la clase correspondiente a la marca en el DOM
        datosProductos.forEach(producto => {
            let selector = `.producto-${producto.id}-${producto.category.replace(/\s+/g, '-').replace(/'/g, '\\\'')} .agregarCarrito`;
            let botonAgregar = document.querySelectorAll(selector);
        
            botonAgregar.forEach(boton => {
                boton.addEventListener("click", () => {
                    carritoGuardado.push({...producto});
                    localStorage.setItem("boxCarrito", JSON.stringify(carritoGuardado));
                    renderizarCarrito();
                    sumaCarrito();
                    Toastify({
                        text: "Added to cart",
                        duration: 600,
                        className: "info",
                        style: {
                            background: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
                          },
                      }).showToast();
                    console.log(carritoGuardado);
                });
            });
        });
    })
    .catch(error => {
        console.error('Error al obtener datos de productos:', error);
        document.getElementById("cargandoMensaje").style.display = "none";
        
    });



//se intenta cargar el contenido del carrito desde el localStorage
 //si no hay nada en el local storage se inicializa como un array vacio
 let boxCarrito = document.querySelector("#boxCarrito")
 let carritoGuardado = JSON.parse(localStorage.getItem("boxCarrito")) || []  

 //funcion que se encarga de mostrar el contenido del carrito al cargar la pagina y al agregar un nuevo elemento al carrito
 function renderizarCarrito(){
     boxCarrito.innerHTML = ""

     carritoGuardado.forEach(producto =>{
         let productoCarrito = document.createElement("div")
         productoCarrito.innerHTML = `
         <div class="card mb-3" id="cardProducto" data-id="${producto.id}">
                 <div class="row g-0">
                   <div class="col-md-4">
                     <img src="${producto.image}" class="img-fluid rounded-start imagenCarrito" alt="Producto">
                   </div>
                   <div class="col-md-6">
                     <div class="card-body" id="precioCarrito">
                       <h6 class="card-title">${producto.title} ${producto.category}</h6>
                       <p class="card-text"><b>Price: $${parseInt(producto.price)}</b></p>
                     </div>
                   </div>
                   <div class ="col-md-2 btn-cerrar">
                   <button type="button" class="btn-close btn-${producto.title}-${producto.category}" aria-label="Close"></button>
                   </div>
                 </div>
               </div>
         `
         boxCarrito.appendChild(productoCarrito)
     })
 }

renderizarCarrito() 



// SUMA CARRITO

 //suma precio y cantidad de productos
 let precio = document.getElementById("precioTotal")
 let contadorCarrito = document.getElementById("contadorCarrito")
 let itemCarrito = document.getElementById("itemTotal")
 let itemPago = document.getElementById("itemPago")
 let precioPago = document.getElementById("precioPago")


function sumaCarrito(){
 let precioTotal = 0
 let productosCarrito = carritoGuardado.length
 carritoGuardado.forEach(productoCarrito => {
     precioTotal += parseInt(productoCarrito.price);
 })
 
 itemCarrito.textContent = `${productosCarrito}`
 contadorCarrito.textContent = `${productosCarrito}`
 itemPago.textContent = `${productosCarrito}`
 precio.textContent = `${precioTotal}`
 precioPago.textContent = `${precioTotal}`

}

sumaCarrito() 


let boxProductos = document.getElementById("boxProductos") 
 
document.addEventListener("keypress", e =>{
    if (e.target.matches("#buscador")) {  //verifica si el elemento que desencadeno el evento del teclado coincide con el elemento del buscador
        filtrarProducto(e.target.value.toLowerCase()) //si el elemento desencadenado coincide con el buscador se llama a la funcion filtrarProducto
        if(e.key === "Enter"){  //se encarga de evitar el comportamiento predeterminado de la tecla enter
            e.preventDefault()
        }
    }
   })

   //se compara  el titulo de cada producto con el termino de busqueda
 // si el producto existe se muestran los resultados
 // si no existe, muestra un mensaje 

function filtrarProducto(buscador) {
    let marcaNoEncontrada = document.getElementById("mensajeNoEncontrado");
    let marcaEncontrada = false;

    document.querySelectorAll(".producto").forEach(producto => {
        let tituloProducto = producto.querySelector(".card-title").textContent.toLowerCase();
        
        if (tituloProducto.includes(buscador)) {
            producto.style.display = ""; // Mostrar producto si coincide con la búsqueda
            marcaEncontrada = true;
        } else {
            producto.style.display = "none"; // Ocultar producto si no coincide con la búsqueda
        }
    });

    // Mostrar mensaje si no se encuentra ninguna coincidencia
    marcaNoEncontrada.style.display = marcaEncontrada ? "none" : "block";
}




// BOTON VACIAR CARRITO

 //crear una funcion que elimine los datos del carrito
  let LimpiarCarrito = document.getElementById("borrarCarrito")
  LimpiarCarrito.addEventListener("click", borrarCarrito)

 //con innerHTML limpiamos el contenido del carrito en el html
 // carritoGuardado = [] -> reinicia a carritoGuardado

  function borrarCarrito(){
    Swal.fire({
        title: "Do you want to empty the cart?",
        text: "You will eliminate all your products!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#15b1b1",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
        confirmButtonText: "Acept"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Removed!",
            text: "You have emptied your cart.",
            icon: "success"
          });

            localStorage.removeItem("boxCarrito")
            boxCarrito.innerHTML = ""
            carritoGuardado = []
            sumaCarrito()
        }
      });
 } 



// BOTON PARA ELIMINAR UN SOLO PRODUCTO

 function eliminar(event) {
    // Accede al elemento padre del botón, que es el contenedor del producto
    Toastify({
        text: "Removed",
        duration: 500,
        style: {
            background: "linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
        }
      }).showToast();

        const itemAEliminar = event.target.closest(".card");
        console.log(itemAEliminar)
        const idEliminar = itemAEliminar.dataset.id;
        console.log(idEliminar)

         // busca en el array carritoGuardado el primer elemento cuyo id coincida con el idEliminar
        //busca y elimina el primer elemento con un id que coincida con el idEliminar del array carritoGuardado. Esto asegura que solo se elimine un elemento con ese id, evitando eliminar elementos adicionales que puedan tener el mismo id.
        const index = carritoGuardado.find(producto => producto.id == idEliminar);
        if (index !== -1) {
            carritoGuardado.splice(index, 1); // Elimina solo el primer elemento con el ID dado
        }
   
        // Elimina el elemento del DOM
        itemAEliminar.remove();
    

        localStorage.setItem("boxCarrito", JSON.stringify(carritoGuardado));

        // actualizo los nuevos valores del carrito
        sumaCarrito();
        }


        
        document.addEventListener("click", function(event) {
            if (event.target.classList.contains("btn-close")) {
                eliminar(event);
            }
        });

       

        let botonCompra = document.getElementById("botonCompra")
        botonCompra.addEventListener("click", realizarCompra)

        function realizarCompra() {
            // Vaciar el carrito
            Swal.fire({
                title: "confirm the purchase?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#15b1b1",
                cancelButtonColor: "#d33",
                confirmButtonText: "yes, buy",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Vaciar el carrito
                    localStorage.removeItem("boxCarrito");
                    carritoGuardado = [];
                    renderizarCarrito();
                    sumaCarrito();
                    Swal.fire(
                        "¡Success!",
                        "Thanks for your purchase.",
                        "success"
                    );
                }
            });
        }

       
       
       