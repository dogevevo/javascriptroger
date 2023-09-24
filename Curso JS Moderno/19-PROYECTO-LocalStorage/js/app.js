//variable -------------------------------------
const formulario = document.querySelector('#formulario');
const listTweets = document.querySelector('#lista-tweets');
let tweets = [];


//event listeners  ------------------------------
eventListeners()

function eventListeners() {
    //cuando el usuario mete datos
   formulario.addEventListener('submit', agregarTweets);

   //Cuando ya hay datos en la app
   document.addEventListener('DOMContentLoaded', () => {
    tweets =  JSON.parse(localStorage.getItem('tweets')) || []
    console.log(tweets);
    agregarHtml()
   })
}

//funciones -----------------------------------
function agregarTweets(e){
    e.preventDefault()
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if (tweet === '') {
        mostrarError('El campo no puede estar vacio');
        return;
    }
    console.log('agregando tweets...');

    
    // guardar el objeto en el arreglo tweets
    const tweetObj = {
        id: Date.now(),
        tweet,
    }
    tweets = [...tweets, tweetObj];
    console.log(tweets);
    
    //Crear el html de los tweets guardados en el arreglo
    agregarHtml()
    
    //reiniciar textarea
    formulario.reset()
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertar en el html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 1000 );
}

function agregarHtml(){
    LimpiarHtml()
    if(tweets.length > 0){
        tweets.forEach( tweet => {
            //Crear un boton para eliminar
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            btnEliminar.onclick = () => {
                borrarTweet( tweet.id );
            }

            //agregando un elemento html
            const li = document.createElement('li');
            //Asignar texto
            li.innerText = tweet.tweet;
            //asignar el boton
            li.appendChild(btnEliminar)
            //mostrar html 
            listTweets.appendChild(li);
        })
    }

    sincronizarStorage()
}

function sincronizarStorage(){
    localStorage.setItem('tweets',  JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id != id)
    agregarHtml(); 
    console.log('borrando', id);
}

function LimpiarHtml(){
    //Limpiar el text area
    while (listTweets.firstChild) {
        listTweets.removeChild(listTweets.firstChild)
    }
}