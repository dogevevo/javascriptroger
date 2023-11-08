//weakset

const weakset = new WeakSet();

//los weakSet solo pueden agregar objetos

const cliente = {
    nombre: 'Roger',
    saldo: 100,
}

console.log(cliente);

console.log(weakset.has(cliente));
