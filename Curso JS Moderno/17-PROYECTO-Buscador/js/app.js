const marca = document.querySelector('#marca')
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision= document.querySelector('#transmision')
const color = document.querySelector('#color')

const resultado = document.querySelector('#resultado');

//Crear las fechas de los autos sin pasarce del año actual
const max = new Date().getFullYear();
const min = max - 10; 


// objeto para que se guarden los datos selecionandos
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}


document.addEventListener('DOMContentLoaded', () => {
    //mostrar la lista de los autos
    mostrarAutos(autos);

    //llenar las opciones
    llenarSelect( )
});


//funciones para llenar el odjeto de autos
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto()
    
})

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    filtrarAuto()
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto()
})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto()
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
})




//Funcion para mostrar los autos de la api
function mostrarAutos(autos) {
    
    limpiarHtml()

    // Construir el HTML de los autos
    autos.forEach(auto => {

        const {marca, modelo, year, puertas, transmision, precio, color} = auto
        const autoHTML = document.createElement('p');
        autoHTML.innerHTML = `
            ${marca} ${modelo} - ${year} - ${puertas} puertas - transmision: ${transmision} - precio: ${precio} - color: ${color}
            `;
        resultado.appendChild(autoHTML);
    })
}

function limpiarHtml() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

//Funcion para llenar los Select de los autos y comenzar la busqueda

function llenarSelect() {
        for(let i = max; i >= min; i--){
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            year.appendChild(option); // agrega los años a las opciones del campo
        }
}

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrartransmision).filter(filtrarColor);

    if (resultado.length) {
        mostrarAutos(resultado); 
    }else{
        MostrarMensaje()
    }
}

function MostrarMensaje(){
    limpiarHtml()

    const element = document.createElement('div');
    element.classList.add('error', 'alerta');
    element.appendChild(document.createTextNode('NO HAY RESULTADOS'))
    document.querySelector('#resultado').appendChild(element)
}

function filtrarMarca( auto ){
    const {marca} = datosBusqueda;

    if(marca){
        return auto.marca === marca;
    }
    return auto; 
}

function filtrarYear ( auto ){
    const {year} = datosBusqueda;

    if(year){
        return auto.year === parseInt(year);
    }
    return auto; 
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;

    if(minimo){
        return auto.precio >= minimo;
    }
    return auto; 
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;

    if(maximo){
        return auto.precio <= maximo;
    }
    return auto; 
}
 
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;

    if(puertas){
        return auto.puertas === parseInt(puertas);
    }
    return auto; 
}

function filtrartransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto; 
}