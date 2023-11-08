//Roger
// variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul')


// eventos
eventListener();
function eventListener() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto );
     formulario.addEventListener('submit', agregarGastos)
}


//clases 
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante  = Number(presupuesto); 
        this.gastos = []; 
    }

    nuevoGasto( gasto ){
        this.gastos = [...this.gastos, gasto]
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0 );  
        this.restante = this.presupuesto - gastado; 

        console.log(this.restante);
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto => gasto.id !== id )
        this.calcularRestante(); 
        console.log(this.gastos);
    }
}

class UI{
    insertarPresupuesto( cantidad ){
        const {presupuesto, restante } = cantidad;
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante; 
    }

    imprimirAlerta(mensaje, tipo){
        //crear el div 
         const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            mensajeDiv.classList.add('alert-danger');
        }else{
            mensajeDiv.classList.add('alert-success'); 
        }

        //mensaje erorr
        mensajeDiv.textContent = mensaje

        //insertar en el html
        document.querySelector('.primario').insertBefore( mensajeDiv, formulario )

        //quitar despues de 3 seg
        setTimeout(() => {
            mensajeDiv.remove()
        }, 3000);
    }

    agregarGastosListados( gastos ){

        this.limpiarHTML(); 

        gastos.forEach( gasto => {
            console.log(gasto);
            const {cantidad, nombre, id } = gasto; 
            
            //crear UN LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'; 
            nuevoGasto.dataset.id = id
    
            //agragar el html del gasto 
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`             
    
            //boton de borrar 
            const btnBorrar = document.createElement('button'); 
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnBorrar.innerHTML = 'Borrar &times'
            btnBorrar.onclick = () => {
                eliminarGasto(id)
            }
            nuevoGasto.appendChild(btnBorrar); 

            //agregar al html
            gastoListado.appendChild(nuevoGasto)
        });

    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    autalizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj){
        const { presupuesto, restante } = presupuestoObj; 
        const restanteDiv = document.querySelector('.restante'); 

        // comprobar %25
        if( ( presupuesto / 4 ) > restante ){
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger'); 
        }else if( (presupuesto / 2 ) > restante ){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning'); 
        }else { 
            restanteDiv.classList.remove('alert-danger', 'alert-warning'); 
            restanteDiv.classList.add('alert-success'); 
        }


        //si el total e 0 o menor
        if(restante <= 0 ){
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error'); 
            formulario.querySelector('button ["submit"]').disabled = true; 
        }
    }
}

const ui = new UI(); 
let presupuesto;


//funciones
function preguntarPresupuesto(){
    const presupuestoToUsuario = prompt('Cual es tu presupuesto ? '); 
    // console.log( Number(presupuesto) );

    if (presupuestoToUsuario === "" || presupuestoToUsuario === null || isNaN(presupuestoToUsuario)) {
        window.location.reload();
    }

    //Pasando estas lineas el presupuestp esta valido
    presupuesto = new Presupuesto(presupuestoToUsuario); 
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto); 

}

function agregarGastos(e){ 
    e.preventDefault()

    //leer los datos del formulario
    const nombre = document.querySelector('#gasto').value; 
    const cantidad = Number(document.querySelector('#cantidad').value);

    //validar
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error')
        return; 
    }else if( cantidad <= 0 || isNaN(cantidad) ){
        ui.imprimirAlerta('Cantidad no valida', 'error'); 
        return; 
    }


    //generar un odjeto por gasto
    const gasto = {nombre, cantidad, id : Date.now()}
    
    //agregar nuevo gasto
    presupuesto.nuevoGasto( gasto  )
    //mensaje eviando
    ui.imprimirAlerta('Gasto Agregado Correctamente')

    //imprimir restante 
    const {gastos, restante} = presupuesto;
    ui.agregarGastosListados(gastos)

    ui.autalizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto)


    //Reiniciar Formulario
    formulario.reset()
}

function eliminarGasto(id ){
    presupuesto.eliminarGasto(id)
    const { gastos, restante } = presupuesto
    ui.agregarGastosListados(gastos)

    ui.autalizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto)
}