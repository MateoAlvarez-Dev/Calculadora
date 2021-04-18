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



    cambiarSigno(n){

        if(n == ""){
            return "";
        }

        console.log("To Change: " + n);

        var operation = n;
        var numeros = operation.replace(/[\+\/\*]/g, "").split("");

        if(numeros[0] == "-"){
            for(var i = 0; i < numeros.length; i++){
                if(numeros[i] == "-"){
                    numeros[i] = "";
                }
            }
        }

        else if(RegExp(/[0-9]/g).test(numeros[0])) 
            numeros.splice(0, 0, "[NEGATIVO]|");
        


        var rebuild = "";
        for(var i = 0; i < numeros.length; i++){
          rebuild += numeros[i];
        }

        console.log(rebuild);

        return rebuild;
    }



    limpiarOperacion(n){
        var operation = n;
        var count = 0;
        var operador = operation.replace(/[0-9\.]+/g, "");
        var numeros = operation.replace(/[\+\/\*\-]/g, "").split("");
        var seCambio = false;


        var isNegativo = n.split("|")[0] == "[NEGATIVO]";
        if(isNegativo){
            var sp = n.split("|");
            var limpiado = "-" + sp[1];

            seCambio = true;
            numeros = limpiado.split("");
        }


        for (var i = 0; i < numeros.length; i++) {
            if(numeros[i] == "."){
                count++;
            }

            if(count > 1){
                if(numeros[i] == "."){
                  numeros[i] = "";
                }
            }
        }


        // Debido a que el numero queda en formato de Array se reconstruye a String normal
        var rebuild = "";
        for(var i = 0; i < numeros.length; i++){
            rebuild += numeros[i];
        }
      
        
        console.log("NegNumber: " + rebuild)
        if(seCambio){
            
            return rebuild;
        }
        else{
            return rebuild + operador;
        }

    }



    /**
     * Metodo que se encarga de realizar los calculos
     * con la funcion eval() perteneciente a javascript
     * la cual se encarga de evaluar el String que se le
     * pasa como parametro lo transforma a una operacion
     * de javascript
     * Ej:
     *  eval('setInterval(function() {...}, 1000 )')
     */
     calcular(op){
        try{
            var total = eval(op);

            if(total.length > 8){
                console.log("More SPACE");
                this.agregados = total.slice(0, 8);
                return total.slice(0, 8);
            }
            else{
                console.log("Mora SPACE");
                this.agregados = total;
                return total;
            }


        }
        catch (e){
            this.agregados = "";
            return "ERROR";
        }
    }



    animation(el){
        el.addEventListener("mousedown", () => {
            el.style.padding = "5px";
        });
        el.addEventListener("mouseup", () => {
            el.style.padding = "0px"
        })
    }

    
    /**
     * Este metodo se encarga finalmente de llevar el resultado
     * de la operacion realizada hacia el display de la calculadora
     */
    show(data){

        console.log("Total operation: " + data);
        this.toAdd = data;
        this.agregados = "";
        this.resultado = data;
        this.display.innerHTML = data;
        console.log(this.resultado);

    }


    /**
     * Metodo empleado para limpiar todos los datos guardados 
     */
    clean(){
        console.clear();
        this.display.innerHTML = "0";
        this.toDisplay = "";
        this.agregados = "";
        this.toAdd = "";
    }
}