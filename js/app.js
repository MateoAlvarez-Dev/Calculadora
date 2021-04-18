class Calculadora{
    constructor(display, keyClass){
        this.display = document.querySelector(display);
        this.toDisplay = "";
        this.toAdd = "";
        this.agregados = "";
        this.resultado = "";
        this.keys = document.querySelectorAll(keyClass);
    }


    
    // INICIADOR DE LA CALCULADORA 
    init(){
        this.addEvents(this.keys);
    }


    /**
     * Metodo creado para agregar los eventos de click junto
     * con la animacion de cada tecla
     */
    addEvents(arr){
        arr.forEach(el => {

            this.animation(el);
            el.addEventListener("click", (e) => {

                // AÑADIR CARACTERES
                var kyId = el.getAttribute("id");
                switch (kyId) {

                    case "sign":
                        var nwSign = this.cambiarSigno(this.limpiarOperacion(this.toAdd));
                        if(nwSign != ""){
                            this.toAdd = nwSign;
                            this.display.innerHTML = this.limpiarOperacion(nwSign);
                        }
                        else{
                            this.toAdd = nwSign;
                            this.display.innerHTML = "0";
                        }
                        break;

                    case "menos":
                        this.add("-")
                        this.agregarOperacion()
                        break;

                    case "mas":
                        this.add("+")
                        this.agregarOperacion()
                        break;

                    case "dividido":
                        this.add("/")
                        this.agregarOperacion()
                        break;

                    case "por":
                        this.add("*")
                        this.agregarOperacion()
                        break;

                    case "punto":
                        this.add(".")
                        break;

                    case "igual":
                        this.agregarOperacion()
                        this.show(this.calcular(this.agregados))
                        break;

                    case "on":
                        this.clean()
                        break;

                    default:
                        this.add(kyId);
                        break;
                }
            })
        })
    }



    /**
     * Metodo que se encarga de validar y agregar
     * los numeros de cada tecla presionada
     */
    add(num){
        var regExp = /[\+\-\/\*]/g;

        if(this.toDisplay.length > 8){
            this.toAdd = this.toAdd.slice(0, 8);
        }

        if(this.toAdd == "" && num == "0"){

            /**
             * Valida si el unico numero es 0 y si la tecla
             * presionada es 0 para unicamente dejar solo un 0
             */
            this.toAdd = "";
            this.display.innerHTML = "0";
        }

        else if(regExp.test(num) && this.toAdd == ""){

            /**
             * Valida si el unico numero puesto es el 0 y si 
             * la tecla presionada es alguna operacion para evitar
             * que la operacion sea (0 /+*- cualquier num)
             */
            this.toAdd = "";
            this.display.innerHTML = "0";
        }

        else if(num == "." && this.toAdd == ""){

            /**
             * Verifica si el unico numero existente es 0 y si
             * la tecla presionada es el . para agregar el 0.
             */

            this.toAdd += 0;
            this.toAdd += ".";
            this.toDisplay += 0 + num;
            this.display.innerHTML = this.limpiarOperacion(this.toAdd);

        }

        else{

            /**
             * Si ninguna condicion se cumple
             * el numero se agrega normal
             */
            this.toAdd += num;
            this.toDisplay += num;
            this.display.innerHTML = this.limpiarOperacion(this.toAdd);

        }
        
    }



    agregarOperacion(){
        this.agregados += this.limpiarOperacion(this.toAdd);
        console.log("Operacion " + this.agregados);
        this.toAdd = "";
        this.display.innerHTML = "";
        this.toDisplay = "";
    }
}