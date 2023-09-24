const footer = document.querySelector('.footer');
const btnFlotante = document.querySelector('.btn-flotante');

btnFlotante.addEventListener('click', mostrarOcultar)

function mostrarOcultar() {
    if(footer.classList.contains('activo')){
        footer.classList.remove('activo')
        btnFlotante.classList.add('activo');
    }else{
        footer.classList.add('activo');
        btnFlotante.classList.add('activo'); 
    }

    console.log(footer.classList);
}