var nombre = document.getElementById('nombre');
var errorName = document.getElementById('errorName');

function validarForm() {
    var hayErrores = false;

    var menjsajeError = [];

    if(nombre.value.trim() === ''){
        menjsajeError.push('Ingresa tu nombre');
        errorName.textContent = 'Ingresa tu nombre';
        hayErrores = true;
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/.test(nombre.value)) {
        menjsajeError.push('El nombre solo puede contener letras');
        errorName.textContent = 'El nombre solo puede contener letras';
        hayErrores = true;
    } else{
        errorName.textContent= '';
    }
}