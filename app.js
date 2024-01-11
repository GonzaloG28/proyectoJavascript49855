
let nuevaContraseña
let verificacion = true

while(verificacion){
    nuevaContraseña = prompt("Ingrese su nueva contraseña")
    if(nuevaContraseña == ""){
        alert("Porfavor ingrese una contraseña")

    }else{
        alert("Tu nueva contraseña es: " + nuevaContraseña)
        verificacion = false
    }
}


function inicioSesion(contraseña, verificacionSesion, intento){
        verificacionSesion = true
        intento = 1
    do{
         contraseña = prompt("Ingrese su contraseña para iniciar sesion (solo tiene 4 intentos)")
        if(contraseña === nuevaContraseña){
            alert("BIENVENIDO A TU CUENTA")
            verificacionSesion = false
        }else{
            alert("Error, ingrese su contraseña porfavor")
            intento++
            if(intento > 4){
                alert("Superaste el limite de intentos, intentalo mas tarde")
                break
            }
        }
    } while(verificacionSesion)
}


if(verificacion == false){
    inicioSesion()
}
