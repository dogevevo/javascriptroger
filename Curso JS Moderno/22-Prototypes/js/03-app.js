
/// Objeto Cliente  
function Cliente(nombre, costo){
    this.nombre = nombre;
    this.costo = costo;
}
Cliente.prototype.TipoCliente = function(){
    let tipo; 

    if (this.saldo > 10000) {
        tipo = 'Gold'
    }else if(this.saldo = 50000){
        tipo = 'platinum'
    }else{
        tipo = 'Pobre'
    }

    return tipo
}
Cliente.prototype.nombreClienteSaldo = function () {
    return `nombre : ${this.nombre}, Saldo : ${this.saldo}, Tipo Cliente : ${this.TipoCliente() } `
}
Cliente.prototype.retiraSaldo = function(retira){
    this.saldo -= retira; 
}
const Roger = new Cliente('Roger', 10000); 



/// Objeto Persona 
function Persona(nombre, saldo, telefono) {
    //heredamos los campos de Cliente
    Cliente.call(this, nombre, saldo);
    this.telefono = telefono;
}

//heredamos las funciones de Cliente
Persona.prototype = Object.create(Cliente.prototype);
Persona.prototype.constructor = Cliente; 


const juan = new Persona('Roger', 54000, 66749255)
console.log(juan);
console.log(juan.nombreClienteSaldo());