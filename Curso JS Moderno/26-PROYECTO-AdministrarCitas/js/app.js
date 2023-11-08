//Roger
//variables input formulario
 const mascotaInput = document.querySelector('#mascota');
 const propietarioInput = document.querySelector('#propietario');
 const telefonoInput = document.querySelector('#telefono');
 const fechaInput = document.querySelector('#fecha');
 const horaInput = document.querySelector('#hora');
 const sintomasInput = document.querySelector('#sintomas');

 //UI
const formulario = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas'); 

let editando; 

//Clases
class Citas{
    constructor(){
        this.citas = [];
    }


    agregarCitas(cita){
        this.citas = [...this.citas, cita]

    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

    editarCita(citaActualizada ){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }

}

class UI{

    imprimirAlerta(mensaje, tipo){
        //Crear div
        const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //agregar clase en base el tipo de error
        if(tipo === 'error'){
            mensajeDiv.classList.add('alert-danger');
        }else{
            mensajeDiv.classList.add('alert-success');
        }

        //agregar mensaje
        mensajeDiv.textContent = mensaje;

        //agregar al dom
        document.querySelector('#contenido').insertBefore(mensajeDiv, document.querySelector('.agregar-cita'));

        //quitar despues de 3 segundos
        setTimeout(() => {
            mensajeDiv.remove(); 
        }, 3000);
    }   

    imprimirCitas({citas}){

        this.limpiarHtml()
        
        citas.forEach( cita=> {
            
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id

            //scrpting de los elementos de cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-tittle', 'font-weight-border');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class=" font-weight-bolder"> propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class=" font-weight-bolder"> Telefono: </span> ${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class=" font-weight-bolder"> fecha: </span> ${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class=" font-weight-bolder"> Hora: </span> ${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class=" font-weight-bolder"> Sintomas: </span> ${sintomas}`;

            //Boton para eliminar una cita 
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';
            btnEliminar.onclick = () => eliminarCita(id); 


            //Boton para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>'
            btnEditar.onclick = () => EditarCita(cita);

            // agregar los parrafos a la cita
            divCita.appendChild(mascotaParrafo); 
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar);

            //agragar al contenedor del html
            contenedorCitas.appendChild(divCita)
            
        });
    }

    limpiarHtml(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild( contenedorCitas.firstChild)
        }
    }

}

//instanciar clases
const ui = new UI();
const administradorCitas = new Citas();



//Eventos 
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita)
}

//Objetos
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}


//agrega datos a la cita 
function datosCita(e){
    citaObj[e.target.name] = e.target.value;
    
}


//validar la informacion del objeto de cita
function nuevaCita(e){
    e.preventDefault();

    //extraer todos los datos del objeto Distructuing
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj; 

    //validar que no esten vacios
    if( mascota === '' || propietario === '' || telefono === '' || fecha ==='' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error'); 
        return; 
    }

    if(editando = true){
        ui.imprimirAlerta('Editado Correctamente');

        //pasar el objeto de la cita a edicion
        administradorCitas.editarCita({...citaObj}); 



        formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

        editando = false; 
    }else{
       //generando un id unico
        citaObj.id = Date.now(); 

        //creando una nueva cita
        administradorCitas.agregarCitas({...citaObj});
        
        
        //mensaje
        ui.imprimirAlerta('se agrego correctament');

    }


    //generando un id unico
    citaObj.id = Date.now(); 

    //creando una nueva cita
    administradorCitas.agregarCitas({...citaObj}); 

    //llamar funcion de reinicio de objeto
    reiniciarObjeto()

    //reiniciar formulario
    formulario.reset();
     

    //imprmir citas en el html 
    ui.imprimirCitas(administradorCitas); 

}

function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}


//Eliminar 
function eliminarCita(id){
    
    //Eliminar citas
    administradorCitas.eliminarCita(id)

    //Mostrar mensaje de eliminado 
    ui.imprimirAlerta('La cita se elimino correctamente')

    //refrescar citas
    ui.imprimirCitas(administradorCitas)
}


// cargar cita y editar
function EditarCita(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita; 


    //llenar inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas; 
    
    //llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;




    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true; 
} 
