localStorage.setItem('nombre', 1); // el metodo setItem del localstorage es para guardar

const persona = {
    nombre: 'roger',
    edad: '19',
}

const personaString = JSON.stringify(persona);
localStorage.setItem('product', personaString); 
console.log(personaString);

const meses = ['enero', 'febrero', 'marzo'];
localStorage.setItem('meses', JSON.stringify(meses)); 
console.log(meses);