class Calculadora{
    constructor(display, keyClass){
        this.display = document.querySelector(display);
        this.toDisplay = "";
        this.toAdd = "";
        this.agregados = "";
        this.resultado = "";
        this.keys = document.querySelectorAll(keyClass);
    }
}