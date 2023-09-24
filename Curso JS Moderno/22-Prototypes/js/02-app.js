function Cliente(nombre, costo){
    this.nombre = nombre,
    this.costo = costo
}
Cliente.prototype.tipoCliente = function(){
    console.log('desde el prototype');
}
const pedro = new Cliente('Roger', 1000)
pedro.tipoCliente();
console.log(pedro);


 


function Empresa(nombre, costo, categoria) {
    this.nombre = nombre;
    this.costo = costo;
    this.categoria = categoria
}

Empresa.prototype.TipoEmpresa = function(){
    console.log('esto es una empresa');
}
const foxart = new Empresa('fowart', 4000, 'marketing');
foxart.TipoEmpresa()
console.log(foxart);