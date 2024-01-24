
alert("bienvenido a nuestra tienda de zapatillas")
let usuario
let compra
let validacion = true
const fechaActual = new Date()

let zapatillas = [
    {marca: "adidas", color: "amarillo", cantidad: 8},
    {marca: "nike", color: "negro", cantidad: 5 },
    {marca: "puma", color: "azul", cantidad: 1 },
    {marca: "vans", color: "blanco", cantidad: 3 },
    {marca: "converse", color: "rojo", cantidad: 2}
];

        /* esta funcion busca los detalles del objeto que se busco a traves de la otra funcion
            de la misma variable 
            */ 

        function compraZapatilla(marcaEncontrada){

            if(marcaEncontrada){
                alert("Tenemos " + marcaEncontrada.cantidad  + " pares," + " de color " + marcaEncontrada.color.toUpperCase())
                compra = confirm("Desea comprar?")
            }
            if(compra == true && marcaEncontrada){
                alert("A comprado unas zapatillas marca " + marcaEncontrada.marca.toUpperCase() + " color " + marcaEncontrada.color.toUpperCase() + " el dia " + fechaActual.toLocaleDateString())
            }else if(compra == false){
                validacion = true
            }
            
        }

        
        while(validacion){
            usuario = prompt("Ingrese la marca de zapatilla que busca").toLowerCase()

            /* esto lo que hace es que el metodo find busque dentro de la array basandose en la propiedad marca, la funcion zapatilla sirve como argumento del find
                zapatilla representa cada elemento del array
                zapatilla.marca accede a la propiedad marca
            */ 
            let marcaEncontrada = zapatillas.find( (zapatilla) => zapatilla.marca === usuario) 

            if(marcaEncontrada){
                alert("Si tenemos zapatillas marca " + usuario.toUpperCase())
                validacion = false
                compraZapatilla(marcaEncontrada)
            }else if (usuario == ""){
                alert("Ingrese una marca de zapatilla porfavor")
            }else{
                alert("disculpe, no tenemos de esa marca, intente con otra")
            }
        }



