const carrito = new Set();


//agragar nuevo elemento
carrito.add('camisa');
carrito.add('Disco1');
carrito.add('Disco2');
carrito.add('Disco3');

console.log(carrito.delete('camisa'));


// ver la dimencion del arreglo o el objeto 
console.log(carrito.size);

//se puede iterar
carrito.forEach( producto => {
    console.log(producto);
} );

// del siguiente arreglo eliminar los duplicaddos
const numero = [10,20,30, 40, 50, 10, 20];
const noDuplicados = new Set(numero);
console.log(noDuplicados); 
