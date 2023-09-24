// Evento con el mause

const nav = document.querySelector('.navegacion');

nav.addEventListener('mouseout', () => {
    console.log('saliende de la navegacion ');

    nav.style.backgroundColor = 'red'; 
})


// eveto para escribir

const tipe = document.querySelector('.busqueda');

tipe.addEventListener('input', (e) => {
    if (e.target.value == '' ) {
        console.log('No hay nada');
    }else{
        console.log(e.target.value);
    }
})