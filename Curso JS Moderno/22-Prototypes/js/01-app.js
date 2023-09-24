const cliente = {
    nombre: 'Roger',
    saldo: 500
}

console.log(cliente);
console.log(typeof cliente);

function Cliente (nombre, saldo){
    this.nombre = nombre;
    this.saldo = saldo;
}

const Roger = new Cliente('Roger', 500);
console.log(Roger);