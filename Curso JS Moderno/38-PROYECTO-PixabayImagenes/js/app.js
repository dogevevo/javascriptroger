const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const pagainacionDiv = document.querySelector('#paginacion')
const pages = 40; 
let paginaActual = 1; 
let totalPaginas;
let iterador; 

window.onload  = () => {
    formulario.addEventListener('submit', validarformulario);
}

function validarformulario(e){
    e.preventDefault();
    const terminoBusqueda = document.querySelector('#termino').value
    if ( terminoBusqueda === '') {
        mostrarAlerta('Agrega un termino para la busqueda');
        return; 
    }

    buscarImagenes( )
}

function mostrarAlerta(message){

    const existAlert = document.querySelector('.bg-red-100');

    if (!existAlert) {
        const alerta = document.createElement('P'); 
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'max-auto', 'text-center', 'mt-6');
    
        alerta.innerHTML = `
            <strong class="font-bold"> Error! </strong>
            <span class="block sm:inline">${message} </span>     
        `; 
    
        formulario.appendChild(alerta); 
    
        setTimeout(() => {
            alerta.remove(); 
        }, 2000);
    }

}

function buscarImagenes(){

    const termino = document.querySelector('#termino').value
    const key = '43611000-50126c9e4e984f676ba84524f'; 
    const URl = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${pages}&page=${paginaActual}`;

    fetch(URl)
    .then( response => response.json() )
    .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);
            console.log(totalPaginas);
             mostrarResultado(resultado.hits)
            })
}

function *crearPaginador(total){
    console.log(total);
    for (let i = 1; i < total; i++) {
        console.log(i); 
        yield i;        
    }
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total/pages))
}

function mostrarResultado( imagenes ){


    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild); 
    }

    
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;
        resultado.innerHTML += `
            <div class="w-1/2   md:w-1/3 lg:1/4 p-1 mb-1" >
                <div class="bg-white w-350">
                    <img class=" w-full p-1" src="${previewURL}" >

                    <div class="p-4">
                        <p class="font-bold"> ${likes} <span class="font-light"> Me gusta </span> </p>
                        <p class="font-bold"> ${views} <span class="font-light"> Vistas </span> </p>

                        <a  class=" block w-full h-100 bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-3 p-1 " href="${largeImageURL}" target="_blank"> Ver imagen </a>
                    </div>
                </div>
            </div>
        `; 
    });

    while (pagainacionDiv.firstChild) {
        pagainacionDiv.removeChild(pagainacionDiv.firstChild)
    }
    imprimirIterador()
}

function imprimirIterador(){
    iterador = crearPaginador(totalPaginas);

    while (true) {
        const {value, done} = iterador.next();
        if (done)return
    
        const boton = document.createElement('A'); 
        boton.href = '#';
        boton.dataset.pagina = value; 
        boton.textContent = value; 
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-10', 'uppercase', 'rounded');
    
        boton.onclick = () => {
            buscarImagenes()

        }

        pagainacionDiv.appendChild(boton);
    }
}