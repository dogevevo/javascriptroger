class Cliente{

    //Constructor
    constructor(nombre, saldo){
        this.nombre = nombre;
        this.saldo = saldo;
    }

    //metodos
    Showinfo() { 
        return `Cliente: ${this.nombre}, tiene un saldo de: ${this.saldo}`; 
    }

    //static methods
    static welcome(){
        return `biemvenido a mi sitio`
    }

}


class Empresa extends Cliente{
    constructor(nombre, saldo, telefono, categoria){
        super(nombre, saldo)
        this.telefono = telefono;
        this.categoria = categoria;
    }


    //static methods
    static welcome(){
        return `biemvenido al sitio de la empresa`
    }
}

const juan = new Cliente('Roger', 400);
console.log(juan.Showinfo());
console.log(juan);
console.log(Cliente.welcome());
console.log(Empresa.welcome());