/*
Un programa en el lenguaje que quisiera para un estacionamiento, el cual debe de preguntar las horas que estuvo, y si hizo alguna compra o no.

Eso se va a seguir ejecutando hasta que el usuario diga que no, por cada cliente debe de generar su respectivo ticket y al finalizar el ciclo debe de mostrar todos los tickets.

Si se queda 1 hora = $5 xh
Si se queda 3 horas = $10 xh
Si se queda de 4 horas a más = $15 xh
*/

console.log("Estacionamiento\n");
document.write("Estacionamiento<br>");

let compra = false; //Indica si se realizo una compra o no
let error = false;

do {
    let horas; //Horas que se uso el estacionamiento
    let placas = prompt("Ingrese las placas de su vehiculo");
    
    do {
        error = false; //Inicializar la variable

        horas = parseInt(prompt("Cuantas horas utilizo el estacionamiento?"));

        if (isNaN(horas)) { //Si no se ingreso un numero
            alert("Por favor ingrese un numero");
            error = true;
        } else if (horas < 0) { //si se ingreso un numero negativo
            alert("Se debe ingresar un numero positivo");
            error = true;
        }
    } while (error);

    do {
        let aux = prompt("Realizo alguna compra? (S/N)");

        error = !(aux == "S" || aux == "s" || aux == "N" || aux == "n"); //Revisar que se haya ingresado una respuesta valida

        if (error) { //Si la respuesta no es valida
            alert("Entrada no valida, debe ser 'S' o 'N'");
        } else { //Si la respuesta es valida
            compra = (aux == "S" || aux == "s");
        }
    } while (error);

    let precio = (horas <= 1)? 5 : (horas <= 3)? 10 : 15; //Definir el precio por hora

    alert("El total a pagar es de " + (precio * horas));

    //Imprimir cada uno de los tickets
    let ticket = "\n\n-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/\n\n"
        + "Ticket para el vehiculo " + placas + "\n\n"
        + "Horas de uso:     " + horas + "\n"
        + "Precio por hora:  " + precio + "\n\n"
        + "Total a pagar:    " + (precio * horas) + "\n";

    document.write(ticket.replaceAll("\n", "<br>")); //Se mostrarán todos al final
    console.log(ticket); //Se mostrará despuás de cada iteración
} while (compra);
