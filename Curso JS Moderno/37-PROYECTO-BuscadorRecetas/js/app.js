function iniciarApp() {

    const resultado = document.querySelector('#resultado');

    const selectCategorias = document.querySelector('#categorias');
    if(selectCategorias) {
        selectCategorias.addEventListener('change', seleccionarCategoria)
        obtenerCategorias();
    }
    const favoritosDiv = document.querySelector('.favoritos');
    if(favoritosDiv) {
        obtenerFavoritos();
    }
    const modal = new bootstrap.Modal('#modal', {});


    function obtenerCategorias(){
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarCategorias(resultado.categories))
    }

    function mostrarCategorias( categorias = [] ){
        //console.log(categorias);

        categorias.forEach(categoria => {

            const { strCategory } = categoria
            const option = document.createElement('OPTION')
            option.value = strCategory;
            option.textContent = strCategory
            selectCategories.appendChild(option)

        } )
    }

    function seleccionarCategoria(e){
        const categoria = e.target.value
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`

        fetch(url)
            .then( respuesta => respuesta.json() )
            // .then( resultado => console.log(resultado.meals))
            .then(resultado => mostrarRecetas(resultado.meals))
    }

    function mostrarRecetas( recetas = [] ){
        
        limpiarHtml(resultado)

        const heading = document.createElement('H2')
        heading.classList.add('text-center', 'text-black', 'my-5')
        heading.textContent = recetas.length ? 'Resultados' : 'No Hay Resultados'
        resultado.appendChild(heading)

        recetas.forEach( receta => {
            const { idMeal, strMeal, strMealThumb } = receta


            //console.log(receta);
            // Creamos todos los elementos de las cartas de las recetas
            const recetaContenedor = document.createElement('DIV')
            recetaContenedor.classList.add('col-md-4')

            const recetaCard = document.createElement('DIV')
            recetaCard.classList.add('card', 'mb-4')

            const recetaImg = document.createElement('IMG')
            recetaImg.classList.add('card-img-top')
            recetaImg.alt = `nombre de imagen ${strMeal}`
            recetaImg.src = strMealThumb ?? receta.thumb ; 

            const recetaCardBody = document.createElement('DIV')
            recetaCardBody.classList.add('card-body')

            const recetaHeading = document.createElement('H3')
            recetaHeading.classList.add('card-title', 'mb-3')
            recetaHeading.textContent = strMeal ?? receta.titulo

            const recetaButtom = document.createElement('BUTTON')
            recetaButtom.classList.add('btn', 'btn-danger', 'w-100')
            recetaButtom.textContent = 'Ver Receta';
            //recetaButtom.dataset.bsTarget = '#modal'
            //recetaButtom.dataset.bsToggle = 'modal'
            recetaButtom.onclick = function() {
                seleccionarReceta(idMeal)
            }



            //agregamos al html para mostrar en pantalla
            recetaCardBody.appendChild(recetaHeading)
            recetaCardBody.appendChild(recetaButtom)

            recetaCard.appendChild(recetaImg)
            recetaCard.appendChild(recetaCardBody)

            recetaContenedor.appendChild(recetaCard)
            resultado.appendChild(recetaContenedor)


            // console.log(recetaHeading);
        } )
    }

    function seleccionarReceta(id){
        console.log(id);
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarRecetaInfo(resultado.meals[0]))
    }

    function mostrarRecetaInfo(receta){

        //mostrar informacion en el modal 
        const {idMeal, strInstructions, strMeal, strMealThumb} = receta
        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');
        modalTitle.textContent = strMeal; 
        modalBody.innerHTML = `
            <img class="img-fluid" src="${strMealThumb}" alt="${strMeal}" />
            <h3 class="my-3"> Instrucciones </h3>
            <p>${strInstructions}</p> 
            <h4 class=" my-4 "> Ingredientes y cantidades </h3> 
        `;
        const listGroup = document.createElement('UL')
        listGroup.classList.add('list-group')
        //Mostrar los ingredientes y la cantidad de cada ingrediente
        for(let i = 1; i <= 20; i++){
            if ( receta[`strIngredient${i}`]){
                const ingrediente =  receta[`strIngredient${i}`];
                const cantidad = receta[`strMeasure${i}`];

                const ingredienteLi = document.createElement('LI')
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `${ingrediente} - ${cantidad}`

                listGroup.appendChild(ingredienteLi)
            }
        }
        modalBody.appendChild(listGroup)

        const modalFooter = document.querySelector('.modal-footer');
        limpiarHtml(modalFooter)
        // Botones de cerrar y favorito 
        const btnFavorito = document.createElement('BUTTON');
        btnFavorito.classList.add('btn', 'btn-danger', 'col');
        btnFavorito.textContent = localStorageExistente(idMeal) ? 'Eliminar Favorito' : 'Guardar Favorito';  

        //localstorage fav
        btnFavorito.onclick = function(){

            if (localStorageExistente(idMeal)) {
                eliminarFavoritos(idMeal)
                btnFavorito.textContent = 'Guardar Favorito';
                mostrarToast('Eliminado Correctamente'); 
                return; 
            }

            //console.log(localStorageExistente(idMeal));

            agregarFavorito({
                id: idMeal,
                titulo: strMeal,
                thumb: strMealThumb
            })
            btnFavorito.textContent = 'Eliminar Favorito'
            mostrarToast('Agregado Correctamente'); 

        }



        //Botton para cerrar el modal 
        const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn', 'btn-secondary', 'col');
        btnCerrarModal.textContent = 'Cerrar'; 
        btnCerrarModal.onclick = function() {
            modal.hide();
        }




        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnCerrarModal);

        modal.show()
    }

    function agregarFavorito(receta){
        console.log(receta);
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]))
    }

    function localStorageExistente(id){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some(favoritos => favoritos.id === id)
    }

    function eliminarFavoritos(id){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter(favorito => favorito.id === id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    }

    function limpiarHtml(selector){
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild)
        }
    }

    function obtenerFavoritos(){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? []; 
        if (favoritos.length) {
            mostrarRecetas(favoritos)
            return; 
        }

        const noFavoritos = document.createElement('P');
        noFavoritos.textContent = 'No hay favoritos aun...'
        noFavoritos.classList.add('fs-4', 'text-center', 'font-bold', 'mt-5')
        favoritosDiv.appendChild(noFavoritos)
    }

    function mostrarToast(mensaje){
        const toastDiv = document.querySelector('#toast');
        const toastBody = document.querySelector('.toast-body');
        const toast = new bootstrap.Toast(toastDiv); 
        toastBody.textContent = mensaje;
        toast.show();
    }
}


document.addEventListener('DOMContentLoaded', iniciarApp)