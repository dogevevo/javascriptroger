function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year; 
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function() {
    /*  1 = americano 1.15
        2 = asiatico 1.05
        3 = Europeo 1/35
    */


    // canculando el seguro del auto por marca
    let cantidad;
    const base = 2000; 


    console.log(this.marca);

    switch(this.marca) { 

        case '1': 
            cantidad = base * 1.15
            break; 

        case '2': 
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;
        default:
            break; 
    }

    //Read Year 
    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= (( diferencia * 3 ) * cantidad) / 100; 


    if(this.cantidad === 'basico'){
        cantidad += 1.30;
    }else {
        cantidad += 1.50;
    }

    return cantidad; 

}

function UI() {}

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
    min = max-20; 

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option'); 
        option.value = i;  
        option.textContent = i;
        selectYear.appendChild(option);
    }
}


UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('error')
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10'); 
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout( () => {
        div.remove()
    }, 3000);

}



//instanciar

const ui = new UI();
console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
   ui.llenarOpciones() 
});


eventListener();

function eventListener(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e){
    e.preventDefault();

    

    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    


    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('todos los campos son obligatorios', 'error');
        return;
    }


    ui.mostrarMensaje('Cotizando...', 'exito')

    const seguro = new Seguro(marca, year, tipo); 
    seguro.cotizarSeguro()

    console.log(seguro);

}