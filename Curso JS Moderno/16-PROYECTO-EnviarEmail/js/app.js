document.addEventListener('DOMContentLoaded', function() {


    
    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto'); 
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner');



 
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', EnviarEmail); 

    btnReset.addEventListener('click', function (e) {
        e.preventDefault();

        //reiniciar objeto cuando se le de al boton de reiniciar 
        email.email = '',
        email.asunto = '',
        email.mensaje = '',

        formulario.reset();
        ComprovarEmail(); 
    })


    function EnviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
    }


    function validar(e) {
        
        if (e.target.value.trim() === '') {
            MostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            ComprovarEmail();
            return; 
        }

        //Validamos que el email sea verdadero
        if(e.target.id === 'email' && !ValidarEmail(e.target.value)) {
            MostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = ''; 
            ComprovarEmail();
            return;
        }
        
        //Limpiamos la alerta depues de validar los campos
        LimpiarAlert(e.target.parentElement);


        //ASIGNAMOS VALORES A EL OBJETO EMAIL
        email[e.target.name] = e.target.value.trim().toLowerCase();
        ComprovarEmail()
    }

    function MostrarAlerta(mensaje, referencia) {
        //Compravar si se generan multiples alertas
        LimpiarAlert(referencia)

        const error = document.createElement('P'); 
        error.textContent = mensaje; 
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center'); 
       

        referencia.appendChild(error); 
    }

    function LimpiarAlert(referencia){
        const alert = referencia.querySelector('.bg-red-600');
        if (alert) {
            alert.remove()
        }
    }

    function ValidarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function ComprovarEmail(){
        console.log(email);
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disable = true
            return; 
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disable = false; 
    }


});

 