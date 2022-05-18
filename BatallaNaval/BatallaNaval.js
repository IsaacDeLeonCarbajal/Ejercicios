class Posicion {
    x = 0;
    y = 0;

    /**
     * Pedir una posición para colocar en el tablero.
     * @param {number} maxPos La posición máxima que se puede elegir (El tamaño del tablero).
     * @returns Un objeto Posicion con la posición ingresada.
     */
    static pedirPosicion(maxPos) {
        let pos = prompt("Ingrese la posicion"); //Posicion pedida por el usuario

        let code = pos.charCodeAt(0) - 64; //Codigo de la letra deseada (eje x de la posicion)
        let num = 0;

        num = parseInt(pos.substring(1)); //Obtener el numero (eje y de la posicion)

        if (isNaN(num)) { //Si 'num' no es un numero
            alert("La posición debe ser una letra mayuscula seguida de un numero");
            return null; //No devolver una posición
        }

        if (code < 1 || code > maxPos) { //Si el numero ingresado esta fuera del rango
            alert("    La letra debe estar entre A y " + (String.fromCharCode(maxPos + 64)) + " (mayuscula)");
            return null; //No devolver una posición
        }

        if (num < 1 || num > maxPos) { //Si el numero ingresado esta fuera del rango
            alert("    El numero debe estar entre 1 y " + maxPos);
            return null; //No devolver una posición
        }

        //Si todo está correcto
        return new Posicion(code - 1, num - 1); //Devolver la posicion (basada en cero)
    }

    /**
     * Construir una posicion a partir de dos numeros enteros.
     * 
     * Se utiliza un sistema basado en cero.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Obtener los valores de la posición.
     * 
     * @returns Una string con los valores de la posición.
     */
    toString() {
        return "(" + String.fromCharCode(this.x + 65) + ", " + (this.y + 1) + ")";
    }

    /**
     * Comparar dos posiciones y saber apuntan a la misma casilla.
     * @param {Posicion} pos La posición a comparar.
     * @returns true si los valores de ambas posiciones son iguales, false si no.
     */
    equals(pos) {
        return ((this.x == pos.x) && (this.y == pos.y));
    }
}

const tamanoTablero = 10;
const cantBarcos = 3;

//Caracteres para mostrar como tablero
const noAtacado = '~';
const atacado = 'O';
const destruido = 'X';

 //Nombre de los jugadores
let nombre1;
let nombre2;
let ganador = "";
//Cuando alguien gane, se guardará su nombre

//Posiciones de los barcos de los jugadores
let posBarcos1 = null;
let posBarcos2 = null;

//Cantidad de barcos destruidos por los jugadores
let puntos1 = 0;
let puntos2 = 0;

//!Juego

//*Crear los tableros
let tablero1 = crearTablero(tamanoTablero);
let tablero2 = crearTablero(tamanoTablero);

//*Pedir los nombres de los jugadores
console.log("BATALLA NAVAL");

nombre1 = prompt("Ingrese el nombre del jugador 1");
nombre2 = prompt("Ingrese el nombre del jugador 2");

console.log("Jugadores: \n" + nombre1 + "\n" + nombre2);
console.log("\n\n"); //Separador

//*Ingresar los barcos
alert("Ingresar los barcos de " + nombre1 + "\n");
posBarcos1 = pedirPosiciones(cantBarcos);
console.log("El jugador " + nombre1 + " ha ingresado sus barcos");
mostrarTablero(tablero1);

console.log("\n\n"); //Separador

alert("Ingresar los barcos de " + nombre2 + "\n");
posBarcos2 = pedirPosiciones(cantBarcos);
console.log("El jugador " + nombre2 + " ha ingresado sus barcos");
mostrarTablero(tablero2);

console.log("\n\n\n\n"); //Separador

//*Jugar
while (ganador == "") { //Mientras no haya un ganador
    console.log("Tablero de " + nombre1 + ":");
    mostrarTablero(tablero1);

    console.log("\nTablero de " + nombre2 + ":");
    mostrarTablero(tablero2);
    
    //Turno del jugador 1
    if (realizarTurno(nombre1, tablero1, posBarcos2)) { //Si el jugador atina el ataque
        puntos1++; //Sumarle un punto
    }
    
    console.log("\n"); //Separador

    //Turno del jugador 2
    if (realizarTurno(nombre2, tablero2, posBarcos1)) { //Si el jugador atina el ataque
        puntos2++; //Sumarle un punto
    }

    if (puntos1 == cantBarcos && puntos2 == cantBarcos) { //Si ambos jugadores terminaron los barcos del otro en el mismo turno
        ganador = "empate";
    } else if (puntos1 == cantBarcos) { //si el jugador 1 alcanzó los puntos necesarios
        ganador = nombre1;
    } else if (puntos2 == cantBarcos) { //si el jugador 2 alcanzó los puntos necesarios
        ganador = nombre2;
    }

    alert("\n\n --- >>> Fin del turno <<< ---\n\n");
    console.log("\n\n --- >>> Fin del turno <<< ---\n\n");
}

if (ganador == "empate") {
    alert("\n\n--->>>Empate. Ambos jugadores terminaron con los barcos del otro en el mismo turno\n");
    console.log("\n\n--->>>Empate. Ambos jugadores terminaron con los barcos del otro en el mismo turno\n");
} else {
    alert("\n\n--->>>El ganador es " + ganador + "\n");
    console.log("\n\n--->>>El ganador es " + ganador + "\n");
}

console.log("Tablero de " + nombre1 + ":");
mostrarTablero(tablero1);

console.log("\nTablero de " + nombre2 + ":");
mostrarTablero(tablero2);

//! Funciones

/**
 * Pedir cantBarcos posiciones para poner los baros del jugador y guardarlas en un arreglo.
 * 
 * @param {number} cantBarcos Cantidad de barcos que se deben ingresar.
 * @returns Un arreglo con las posiciones de los barcos.
 */
function pedirPosiciones(cantBarcos) {
    let posiciones = []; //Posiciones de cada uno de los barcos
    let cont = 0; //Cantidad de barcos ingresados
    let error;

    while (cont < cantBarcos) {
        error = false; //Inicializar variable

        alert("Barco " + (cont + 1));
        let pos = Posicion.pedirPosicion(tamanoTablero); //Pedir la posicion del barco

        if (pos != null) { //Si la posicion es valida
            for (let i = 0; i < cont; i++) { //Revisar el resto de posiciones
                if (posiciones[i].equals(pos)) { //Si la posicion ya esta ocupada
                    alert("La posicion " + pos.toString() + " ya esta ocupada");
                    error = true;
                    break; //Salir del for
                }
            }
            
            if (!error) { //si la posicion es valida
                posiciones.push(pos); //Guardar la posicion
                cont++;
            }
        } else { //Si la posicion es invalida
            alert("Volver a pedir la posicion del barco");
        }
    }

    return posiciones;
}

/**
 * Pedir a un jugador que realice su turno.
 * Se le pide atacar a una posicion, y se le indica si el ataque alcanzó a un objetivo o no.
 * 
 * @param {String} nombre Nombre del jugador que va a atacar
 * @param {array} tablero Arreglo bidimensional con el estado del tablero
 * @param {array} posEnemigo Coleccion de las posiciones de los barcos del enemigo
 * @returns true si el ataque fue exitoso, false si no
 */
function realizarTurno(nombre, tablero, posEnemigo) {
    alert("Es turno de " + nombre);
    alert(nombre + ", que casilla quieres atacar?");

    let ataque; //Posicion en la que se va a atacar

    do { //Pedir una posicion valida
        ataque = Posicion.pedirPosicion(tamanoTablero); //Pedir la posicion

        if (ataque == null) {
            alert("    Posicion invalida");
        }
    } while (ataque == null);

    if (tablero[ataque.x][ataque.y] == atacado || tablero[ataque.x][ataque.y] == destruido) {
        alert("    Esa posicion ya habia sido atacada");
        return false; //Indicar que el ataque no alcanzó objetivo
    } else { //Si la posicion no habia sido atacada
        for (let i = 0; i < posEnemigo.length; i++) {
            if (posEnemigo[i].equals(ataque)) { //Si el enemigo tiene un barco en la posicion atacada
                alert("    El ataque fue exitoso");
                tablero[ataque.x][ataque.y] = destruido; //Actualizar el tablero
                return true; //Indicar que el ataque fue exitoso
            }
        }

        //Si se llega aqui, significa que el ataque no fue correcto
        alert("    El ataque no alcanzo nigun objetivo");
        tablero[ataque.x][ataque.y] = atacado;
        return false; //Indicar que el ataque no alcanzó objetivo
    }
}

function mostrarTablero(tablero) {
    let texto = "   ";

    for (let x = 0; x < tablero[0].length; x++) {
        texto += "[" + (String.fromCharCode(x + 65)) + "]"; //Mostrar las letras del eje x
    }

    texto += "\n";

    for (let y = 0; y < tablero[0].length; y++) {
        texto += (y + 1) + "  "; //Mostrar los numero del eje y

        for (let x = 0; x < tablero[0].length; x++) {
            texto += "[" + tablero[x][y] + "]"; //Mostrar cada una de las casillas
        }

        texto += "\n";
    }

    console.log(texto);
}

/**
 * Crear un arreglo bidimensional que representa un tablero
 * 
 * @param {number} tamano Tamano del tablero
 * @returns Un arreglo bidimensional que representa el tablero inicial
 */
function crearTablero(tamano) {
    let tablero = [];

    for (let x = 0; x < tamano; x++) {
        let aux = [];

        for (let y = 0; y < tamano; y++) {
            aux.push(noAtacado);
        }

        tablero.push(aux);
    }

    return tablero;
}

/*
function pedirNumeroEntero() {
    let num = 0;
    let esNumero;

    do {
        esNumero = true; //Inicializar la variable

        let texto = prompt("Ingrese un numero");

        if (texto.length == 0) { //Si no se ingresó nada
            esNumero = false;
        } else {
            num = parseInt(texto); //Intentar convertir a número
        }

        esNumero = isNaN(num);

        if (!esNumero) {
            alert("    El valor ingresado no es valido");
        }
    } while (!esNumero)

    return num;
}
*/
