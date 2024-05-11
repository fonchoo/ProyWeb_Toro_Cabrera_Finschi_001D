var nombre = document.getElementById('nombre');
var apellido = document.getElementById('apellido');
var mail = document.getElementById('mail');
var mensaje = document.getElementById('mensaje');
var errorNombre = document.getElementById('errorNombre');
var errorApellido = document.getElementById('errorApellido');
var errorMail = document.getElementById('errorMail');
var errorMensaje = document.getElementById('errorMensaje');
var mensajeExito = document.getElementById('mensajeExito');

function enviarFormulario() {
    console.log('Enviando formulario...')

    var hayErrores = false; // Variable para verificar si hay errores

    var mensajesError = [];

    if(nombre.value.trim() === '') {
        mensajesError.push('Ingresa tu nombre');
        errorNombre.textContent = 'Ingresa tu nombre';
        hayErrores = true; // Se establece a true si hay un error
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/.test(nombre.value)) {
        mensajesError.push('El nombre solo puede contener letras');
        errorNombre.textContent = 'El nombre solo puede contener letras';
        hayErrores = true; // Se establece a true si hay un error
    } else {
        errorNombre.textContent = '';
    }

    if(apellido.value.trim() === '') {
        mensajesError.push('Ingresa tu apellido');
        errorApellido.textContent = 'Ingresa tu apellido';
        hayErrores = true; // Se establece a true si hay un error
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/.test(apellido.value)) {
        mensajesError.push('El apellido solo puede contener letras');
        errorApellido.textContent = 'El apellido solo puede contener letras';
        hayErrores = true; // Se establece a true si hay un error
    } else {
        errorApellido.textContent = '';
    }

    if(mail.value.trim() === '') {
        mensajesError.push('Ingresa tu mail');
        errorMail.textContent = 'Ingresa tu mail';
        hayErrores = true; // Se establece a true si hay un error
    } else if (!/\S+@\S+\.\S+/.test(mail.value)) {
        mensajesError.push('El correo electrónico debe tener un formato válido');
        errorMail.textContent = 'El correo electrónico debe tener un formato válido';
        hayErrores = true; // Se establece a true si hay un error
    } else {
        errorMail.textContent = '';
    }

    if(mensaje.value.trim() === '') {
        mensajesError.push('Ingresa un mensaje');
        errorMensaje.textContent = 'Ingresa un mensaje';
        hayErrores = true; // Se establece a true si hay un error
    } else {
        errorMensaje.textContent = '';
    }

    if (hayErrores) {
        return false; // Si hay errores, no se envía el formulario
    } else {
        return true; // Si no hay errores, se envía el formulario
    }
}