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

const juan = new Cliente('Roger', 400);
console.log(juan.Showinfo());
console.log(juan);
console.log(Cliente.welcome());