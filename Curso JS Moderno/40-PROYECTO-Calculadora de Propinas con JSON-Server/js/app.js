let cliente = {
    mesa : '',
    hora : '',
    pedido : []
}

const categorias = {
    1 : 'comida',
    2 : 'bebidas',
    3 : 'postres'
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener( 'click', guardarCliente )

function guardarCliente() {
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    const camposVacios = [mesa, hora ].some( campos => campos === '' );

    if( camposVacios  ){
        const existeAlerta = document.querySelector('.invalid-feedback')

        if (!existeAlerta) {
            const alerta = document.createElement('DIV');
            alerta.classList.add( 'invalid-feedback', 'd-block', 'text-center' ); 
            alerta.textContent = 'Todos los valores son obligatorios'; 
            document.querySelector('.modal-body form').appendChild(alerta)


            setTimeout(() => {
                alerta.remove()
            }, 3000);
        }

        return; 

    }
        
    
    cliente = { ...cliente, mesa, hora }; 
    // console.log(cliente);
    //modal 
    const modalFormulario = document.querySelector('#formulario'); 
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide(); 
    
    mostrarSecciones();  

    obtenerPlatillos();
}

function mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'))
}

function obtenerPlatillos() {
    const url = 'http://localhost:4000/platillos';
    
    fetch(url)
        .then( respuesta => respuesta.json())
        .then( resultado => mostrarPlatillos(resultado))
        .catch(error => console.log(error))
}

function mostrarPlatillos(platillos){
    const contenido = document.querySelector(' #platillos .contenido '); 

    platillos.forEach(platillo => {
        const row = document.createElement('DIV'); 
        row.classList.add( 'row', 'py-3', 'border-top' );

        const precio = document.createElement('DIV');
        precio.classList.add('col-md-3' , 'fw-bold');
        precio.textContent = `$${ platillo.precio }`

        const nombre = document.createElement( 'DIV' );
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre; 

        const categoria = document.createElement('DIV');
        categoria.classList.add('col-md-3');
        categoria.textContent =  categorias [ platillo.categoria ];
        
        const inputCantidad = document.createElement('INPUT');
        inputCantidad.type =  'number'; 
        inputCantidad.min = 0;
        inputCantidad.value = 0; 
        inputCantidad.id = `producto-${platillo.id}`; 
        inputCantidad.classList.add( 'form-control' );
        // obtener el platillo y la cantidad 
        inputCantidad.onchange = function(){
            const cantidad = parseInt( inputCantidad.value )
            agregarPlatillo({ ...platillo, cantidad })
        }

        const agregar = document.createElement('DIV');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);

        row.appendChild(nombre); 
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar); 
        contenido.appendChild( row )
    })
}

function agregarPlatillo( producto ){
    //extrer pedido actual
    let {pedido} = cliente;

    //revisar que la cantidad sea mayor a 0 
    if (producto.cantidad > 0){

        if( pedido.some( articulo => articulo.id === producto.id)){
            //el articulo ya existe se actualiza la cantidad
            const pedidoactualizado = pedido.map( articulo => {
                if (articulo.id === producto.id) {
                    articulo.cantidad = producto.cantidad; 
                }
                return articulo ; 
            }) 

            cliente.pedido = [...pedidoactualizado]; 

        }else {
            // el articulo no existe
            cliente.pedido = [...pedido, producto]
        }

    } else {
        const resultado = pedido.filter( articulo => articulo.id !== producto.id )
        cliente.pedido = [...resultado]; 
        console.log(resultado);
    }

    // console.log(cliente.pedido);
    limpiarHtml();

    if(cliente.pedido.length){
        ActualizarResumen();
    }else{
        mensajePedidoVacio();
    }

}

function ActualizarResumen(){
    const contenido = document.querySelector('#resumen .contenido');

    const resument = document.createElement('DIV');
    resument.classList.add('col-md-6', 'card', 'py-2', 'px-3', 'shadow');


    // informacion de la mesa 
    const mesa = document.createElement('P');
    mesa.textContent = 'Mesa: ';
    mesa.classList.add('fw-bold');

    const mesaSpan = document.createElement('SPAN');
    mesaSpan.textContent = cliente.mesa;
    mesaSpan.classList.add('fw-normal');

    // informacion de la hora 
    const Hora = document.createElement('P');
    Hora.textContent = 'Hora: ';
    Hora.classList.add('fw-bold');

    const horaSpan = document.createElement('SPAN');
    horaSpan.textContent = cliente.hora;
    horaSpan.classList.add('fw-normal');

    //titulo secction

    const heading = document.createElement('H3')
    heading.textContent = 'PLATILLOS CONSUMIDOS';
    heading.classList.add('my-4', 'text-center'); 


    //iterar los pedidos
    const grupo = document.createElement('UL');
    grupo.classList.add('list-group');

    const {pedido} = cliente
    pedido.forEach( articulo => {
        console.log(articulo);
        const { nombre, precio, cantidad, id } = articulo; 

        const lista = document.createElement('LI');
        lista.classList.add('list-group-item');

        const nombreEL = document.createElement('H4');
        nombreEL.classList.add('my-4');
        nombreEL.textContent = nombre; 

        //cantidad del articulo
        const cantidadEl = document.createElement('P');
        cantidadEl.classList.add('fw-bold');
        cantidadEl.textContent = 'Cantidad: ';

        const cantidadValor = document.createElement('SPAN');
        cantidadValor.classList.add('fw-normal');
        cantidadValor.textContent = cantidad; 

        //Precio del articulo
        const precioEl = document.createElement('P');
        precioEl.classList.add('fw-bold');
        precioEl.textContent = 'Precio: ';

        const precioValor = document.createElement('SPAN');
        precioValor.classList.add('fw-normal');
        precioValor.textContent = `$${precio}`; 

        //subtotal del articulo
        const subtotalEl = document.createElement('P');
        subtotalEl.classList.add('fw-bold');
        subtotalEl.textContent = 'Subtotal: ';

        const subtotalValor = document.createElement('SPAN');
        subtotalValor.classList.add('fw-normal');
        subtotalValor.textContent =  calcularSubtotal( precio, cantidad); 

        //agregat boton de aliminar 
        const btnDelate = document.createElement('BUTTON')
        btnDelate.classList.add('btn', 'btn-danger');
        btnDelate.textContent = 'Eliminar'
        btnDelate.onclick = function(){
            eliminarProducto(id)
        }

        //agregar valores a sus contenedores
        cantidadEl.appendChild( cantidadValor )
        precioEl.appendChild( precioValor )
        subtotalEl.appendChild( subtotalValor )

        //Agregar elementos a la lista
        lista.appendChild(nombreEL)
        lista.appendChild(cantidadEl)
        lista.appendChild(precioEl)
        lista.appendChild( subtotalEl )
        lista.appendChild(btnDelate)

        //agregar elementos al ul
        grupo.appendChild(lista)

    });

    //agregar al padre
    mesa.appendChild(mesaSpan);
    Hora.appendChild(horaSpan);

    //agregar al contenido 
    resument.appendChild(heading);
    resument.appendChild(mesa); 
    resument.appendChild(Hora);
    resument.appendChild(grupo)
    contenido.appendChild(resument); 


    mostrarFormulario()
}

function limpiarHtml(){
    const contenido = document.querySelector('#resumen .contenido');

    while( contenido.firstChild ){
        contenido.removeChild( contenido.firstChild )
    }
}

function calcularSubtotal( num1, num2 ){
    return ` $ ${ num1 * num2 } `; 
}

function eliminarProducto(id) {
    const {pedido} = cliente; 

    const resultado = pedido.filter( articulo => articulo.id !== id )
    cliente.pedido = [...resultado]; 
    //console.log(resultado);

    // console.log(cliente.pedido);

    limpiarHtml()

    if(cliente.pedido.length){
        ActualizarResumen();
    }else{
        mensajePedidoVacio();
    }
    
    //setear los inputs 
    const producoEliminar = `#producto-${id}`;
    const eliminar = document.querySelector(producoEliminar);
    eliminar.value = 0;
    
}

function mensajePedidoVacio() {
    const contenido = document.querySelector('#resumen .contenido'); 
    const texto = document.createElement( 'P' );
    texto.classList.add('text-center');
    texto.textContent = 'Añade los elementos del pedido';

    contenido.appendChild(texto)


}

function mostrarFormulario(){

    // creando el lugar del formulario 
    const contenido = document.querySelector('#resumen .contenido');
    const formulario = document.createElement('DIV');
    formulario.classList.add('col-md-6', 'formulario');

    const divFormulario = document.createElement('DIV');
    divFormulario.classList.add( 'card', 'px-3', 'py-2', 'shadow');

    const heading = document.createElement('H3');
    heading.classList.add('my-4', 'text-center');
    heading.textContent = 'PROPINAS'

    //creando el formulario
    //creando el 10%
    const radio10 = document.createElement('INPUT')
    radio10.type = 'radio';
    radio10.name = 'propina';
    radio10.value = '10',
    radio10.classList.add('form-check-input');
    radio10.onclick = calcularPropina; 

    const radio10Label = document.createElement('LABEL');
    radio10Label.textContent = '10%';
    radio10Label.classList.add('form-check-label');

    const radio10div = document.createElement('DIV');
    radio10div.classList.add('form-check');

    radio10div.appendChild(radio10)
    radio10div.appendChild(radio10Label);

    //radio25
    const radio25 = document.createElement('INPUT')
    radio25.type = 'radio';
    radio25.name = 'propina';
    radio25.value = '25',
    radio25.classList.add('form-check-input');
    radio25.onclick = calcularPropina; 


    const radio25Label = document.createElement('LABEL');
    radio25Label.textContent = '25%';
    radio25Label.classList.add('form-check-label');

    const radio25div = document.createElement('DIV');
    radio25div.classList.add('form-check');
    

    radio25div.appendChild(radio25)
    radio25div.appendChild(radio25Label);


    //redio 50
    const radio50 = document.createElement('INPUT')
    radio50.type = 'radio';
    radio50.name = 'propina';
    radio50.value = '50',
    radio50.classList.add('form-check-input');
    radio50.onclick = calcularPropina; 


    const radio50Label = document.createElement('LABEL');
    radio50Label.textContent = '50%';
    radio50Label.classList.add('form-check-label');

    const radio50div = document.createElement('DIV');
    radio50div.classList.add('form-check');
    

    radio50div.appendChild(radio50)
    radio50div.appendChild(radio50Label);


    divFormulario.appendChild(heading);
    divFormulario.appendChild(radio10div);
    divFormulario.appendChild(radio25div);
    divFormulario.appendChild(radio50div);
    formulario.appendChild(divFormulario);
    contenido.appendChild(formulario)
}

function calcularPropina(){

    const { pedido } = cliente; 
    let subtotal = 0; 

    pedido.forEach( articulo => {
        subtotal += articulo.cantidad * articulo.precio
    } )

    //seleccionar propina
    const propinaSeleccionada = document.querySelector('[name="propina"]:checked').value; 
    //console.log(propinaSeleccionada);

    //calcular propina
    const propina = (( subtotal * parseInt(propinaSeleccionada )) / 100 ); 
    console.log(propina);

    //calcular el total a pagar 
    const total = subtotal  + propina;   
    console.log(total);

    mostrarTotalHTML( subtotal, propina, total )
}

function mostrarTotalHTML( subtotal, propina, total ){

    const divTotales = document.createElement('DIV');
    divTotales.classList.add('total-pagar')

    //subtotal
    const subtotalParrafo = document.createElement('P');
    subtotalParrafo.classList.add('fs-3', 'fw-bold', 'mt-5');
    subtotalParrafo.textContent = 'Subtotal a pagar: '; 

    const subtotalSpan = document.createElement('SPAN');
    subtotalSpan.classList.add('fw.normal');
    subtotalSpan.textContent = `$${subtotal}`;

    subtotalParrafo.appendChild(subtotalSpan);

    //propina 
    const propinaParrafo = document.createElement('P');
    propinaParrafo.classList.add('fs-3', 'fw-bold', 'mt-5');
    propinaParrafo.textContent = 'Propina: '; 

    const propinaSpan = document.createElement('SPAN');
    propinaSpan.classList.add('fw.normal');
    propinaSpan.textContent = `$${propina}`;

    propinaParrafo.appendChild(propinaSpan);


    //total
    const totalParrafo = document.createElement('P');
    totalParrafo.classList.add('fs-3', 'fw-bold', 'mt-5');
    totalParrafo.textContent = 'Total: '; 

    const totalSpan = document.createElement('SPAN');
    totalSpan.classList.add('fw.normal');
    totalSpan.textContent = `$${total}`;

    totalParrafo.appendChild(totalSpan);

    const divExiste = document.querySelector('.total-pagar');
    if (divExiste) {
        divExiste.remove();
    }


    divTotales.appendChild(subtotalParrafo); 
    divTotales.appendChild(propinaParrafo);
    divTotales.appendChild(totalParrafo); 

    const formulario = document.querySelector('.formulario > div '); 
    formulario.appendChild(divTotales)
}

