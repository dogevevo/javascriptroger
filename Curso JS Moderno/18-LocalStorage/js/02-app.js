//getItem es para mostrar los elementos guardados
const nombre = localStorage.getItem('nombre')
console.log(nombre);

const ProductoJson = localStorage.getItem('product'); // el elemeto getItems regresa un objeto o arreglo dependiendo de la forma
console.log(JSON.parse( ProductoJson ));

const meses = localStorage.getItem('meses');
const mesesarrays = JSON.parse( meses )
console.log(mesesarrays);
