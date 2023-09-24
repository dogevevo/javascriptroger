const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const listaCurso = document.querySelector('#lista-cursos');
const vaciar = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {

    listaCurso.addEventListener('click', agregarCursos);
    carrito.addEventListener('click', eliminarCursos); 
    vaciar.addEventListener('click', () => {
        articulosCarrito = [ ];
        carritoHtml(); 
    })

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

        carritoHtml();
    });

}

function agregarCursos(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {

        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosDelCurso(cursoSeleccionado);
    }
}


//Leer datos del html de los card de los cursos
function leerDatosDelCurso(curso) {
    //console.log(curso);
    
    //Crear un objeto del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id:     curso.querySelector('a').getAttribute('data-id'),
        cantidad:1,
    }

    //revisamos si el mismo curso ya existe o se repite dos veces
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        //actualiza la cantidad 
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // actualiza la cantidad de los cursos duplicados
            }else{
                return curso; // agrega la cantidad de cursos que se añaden
            } 
        });
        articulosCarrito = [...cursos];

    }else{
        //agrega al carrito
        articulosCarrito=[...articulosCarrito, infoCurso];
    }



    console.log(articulosCarrito);

    carritoHtml();
}

function carritoHtml() {

    //Limpiar el html
    limpiar()
    
    articulosCarrito.forEach( curso => {
        const {imagen, nombre, precio, id, cantidad} = curso; 
         const row = document.createElement('tr');
         row.innerHTML = `
            <td><img src='${imagen}' width = '100' ></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"  > X </a>   </td>
            
         `;
        
        // agregar los articulos seleccionados a la lista del carrito
        listaCarrito.appendChild(row)
    });

    sincronizarStorage();
}


function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

// Eliminar un curso
function eliminarCursos(e){
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId); 
        carritoHtml()   // itera sobre los elementos html
    }
}


//Elimina los cursos de la lista
function limpiar() {
    //Forma lenta de eliminar el duplicado de los objetos
    //listaCarrito.innerHTML = ''

    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild); 
    }
}
