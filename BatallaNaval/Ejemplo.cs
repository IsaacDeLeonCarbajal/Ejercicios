using System;

namespace BatallaNaval
{
    class Program
    {
        const int tamanoTablero = 15;
        const int cantBarcos = 5;

        //Caracteres para mostrar como tablero
        const char noAtacado = '~';
        const char atacado = 'O';
        const char destruido = 'X';

        string nombre1;
        string nombre2;
        string ganador = "";
        //Cuando alguien gane, se guardará su nombre

        Posicion[] posBarcos1 = null;
        //Guardara la posicion de los barcos del jugador 1
        Posicion[] posBarcos2 = null;
        //Guardara la posicion de los barcos del jugador 2

        int puntos1 = 0;
        //Barcos destruidos por el jugador 1
        int puntos2 = 0;
        //Barcos destruidos por el jugador 2

        static void Main(string[] args)
        {
            (new Program()).jugar();
        }

        public void jugar()
        {
            //Crear los tableros
            char[, ] tablero1 = crearTablero(tamanoTablero);
            char[, ] tablero2 = crearTablero(tamanoTablero);

            //Pedir los nombres de los jugadores
            Console.Write("BATALLA NAVAL\n\nIngrese el nombre del jugador 1: ");
            nombre1 = Console.ReadLine();
            
            Console.Write("Ingrese el nombre del jugador 2: ");
            nombre2 = Console.ReadLine();
            
            Console.Write("\n\n"); //Separador

            //Ingresar los barcos
            Console.WriteLine("Ingresar los barcos de " + nombre1 + "\n");
            mostrarTablero(tablero1);
            posBarcos1 = pedirPosiciones(cantBarcos);

            Console.WriteLine("\n\n"); //Separador

            Console.WriteLine("Ingresar los barcos de " + nombre2 + "\n");
            mostrarTablero(tablero2);
            posBarcos2 = pedirPosiciones(cantBarcos);

            Console.WriteLine("\n\n\n\n"); //Separador

            //Jugar
            while (ganador == "") {
                Console.WriteLine("Tablero de " + nombre1 + ":");
                mostrarTablero(tablero1);

                Console.WriteLine("\nTablero de " + nombre2 + ":");
                mostrarTablero(tablero2);
                
                //Turno del jugador 1
                if (realizarTurno(nombre1, tablero1, posBarcos2)) {
                    puntos1++;
                }
                
                Console.WriteLine("\n"); //Separador

                //Turno del jugador 2
                if (realizarTurno(nombre2, tablero2, posBarcos1)) {
                    puntos2++;
                }

                if (puntos1 == cantBarcos && puntos2 == cantBarcos) {
                    ganador = "empate";
                } else if (puntos1 == cantBarcos) {
                    ganador = nombre1;
                } else if (puntos2 == cantBarcos) {
                    ganador = nombre2;
                }

                Console.WriteLine("\n\n --- >>> Fin del turno <<< ---\n\n");
            }

            if (ganador == "empate") {
                Console.WriteLine("\n\n--->>>Empate. Ambos jugadores terminaron con los barcos del otro en el mismo turno\n");
            } else {
                Console.WriteLine("\n\n--->>>El ganador es " + ganador + "\n");
            }

            Console.WriteLine("Tablero de " + nombre1 + ":");
            mostrarTablero(tablero1);

            Console.WriteLine("\nTablero de " + nombre2 + ":");
            mostrarTablero(tablero2);
            
            while (true) {
                Console.ReadKey();
            }
        }

        private Posicion[] pedirPosiciones(int cantBarcos)
        {
            Posicion[] posiciones = new Posicion[cantBarcos];
            int cont = 0;
            bool error;

            while (cont < cantBarcos) {
                error = false;

                Console.WriteLine("Barco " + (cont + 1));
                Posicion pos = Posicion.pedirPosicion(tamanoTablero);

                if (pos != null) {
                    for (int i = 0; i < cont; i++) {
                        if (posiciones[i].equals(pos)) { //Si la posicion ya esta ocupada
                            Console.WriteLine("    La posicion " + pos.ToString() + " ya esta ocupada");
                            error = true;
                            break; //Salir del for
                        }
                    }
                    
                    if (!error) {
                        posiciones[cont] = pos;
                        cont++;
                    }
                } else {
                    Console.WriteLine("    Volver a pedir la posicion del barco");
                }
            }

            return posiciones;
        }

        private bool realizarTurno(string nombre, char[, ] tablero, Posicion[] posEnemigo)
        {
            Console.WriteLine("--->>> Es turno de " + nombre);
            Console.WriteLine(nombre + ", que casilla quieres atacar?");

            Posicion ataque;

            do {
                ataque = Posicion.pedirPosicion(tamanoTablero);

                if (ataque == null) {
                    Console.WriteLine("    Posicion invalida");
                }
            } while (ataque == null);

            if (tablero[ataque.getX(), ataque.getY()] == atacado || tablero[ataque.getX(), ataque.getY()] == destruido) {
                Console.WriteLine("    Esa posicion ya habia sido atacada");
                return false;
            } else {
                for (int i = 0; i < posEnemigo.Length; i++) {
                    if (posEnemigo[i].equals(ataque)) {
                        Console.WriteLine("    El ataque fue exitoso");
                        tablero[ataque.getX(), ataque.getY()] = destruido;
                        return true;
                    }
                }

                //Si se llega aqui, significa que el ataque no fue correcto
                Console.WriteLine("    El ataque no alcanzo nigun objetivo");
                tablero[ataque.getX(), ataque.getY()] = atacado;
                return false;
            }
        }

        private char[, ] crearTablero(int tamano)
        {
            char[, ] tablero = new char[tamano, tamano];

            for (int x = 0; x < tamano; x++) {
                for (int y = 0; y < tamano; y++) {
                    tablero[x, y] = noAtacado;
                }
            }

            return tablero;
        }

        private void mostrarTablero(char[, ] tablero)
        {
            string texto = "   ";

            for (int x = 0; x < tablero.GetLength(0); x++) {
                texto += "[" + ((char)(x + 65)) + "]";
            }

            texto += "\n\n";

            for (int y = 0; y < tablero.GetLength(0); y++) {
                texto += (y + 1) + "  ";

                for (int x = 0; x < tablero.GetLength(0); x++) {
                    texto += "[" + tablero[x, y] + "]";
                }

                texto += "\n";
            }

            Console.WriteLine(texto);
        }

        public static int pedirNumeroEntero()
        {
            int num = 0;
            bool esNumero = false;

            while (!esNumero) {
                esNumero = true;
                Console.Write("Ingrese un numero: ");

                try {
                    string texto = Console.ReadLine();

                    if (texto.Length == 0) {
                        esNumero = false;
                    } else {
                        num = int.Parse(texto);
                    }
                } catch (FormatException ex) {
                    esNumero = false;
                }

                if (!esNumero) {
                    Console.WriteLine("    El valor ingresado no es valido");
                }
            }

            return num;
        }

        //Basado en un posicionamiento desde 0, y para x, 'A' vale 0
        public class Posicion
        {
            private int x = 0;
            private int y = 0;

            public static Posicion pedirPosicion(int maxPos)
            {
                Console.Write("Ingrese la posicion: ");
                string pos = Console.ReadLine();

                int code = ((int)(Convert.ToChar(pos.Substring(0, 1)))) - 64;
                int num = 0;

                try {
                    num = int.Parse(pos.Substring(1));
                } catch (FormatException ex) {
                    Console.WriteLine("La posición debe ser una letra mayuscula seguida de un numero");
                    return null;
                }

                if (code < 1 || code > maxPos) { //Si el numero ingresado esta fuera del rango
                    Console.WriteLine("    La letra debe estar entre A y " + ((char)(maxPos + 64)) + " (mayuscula)");
                    return null;
                }

                if (num < 1 || num > maxPos) { //Si el numero ingresado esta fuera del rango
                    Console.WriteLine("    El numero debe estar entre 1 y " + maxPos);
                    return null;
                }

                return new Posicion(code - 1, num - 1);
            }

            public Posicion(int x, int y)
            {
                this.x = x;
                this.y = y;
            }

            public Posicion(char x, int y)
            {
                int code = (int)x;

                if (code < 65 || code > 90) {
                    throw new ArgumentException("El argumento \'x\' debe ser una letra mayúscula");
                }

                this.x = code - 65;
                this.y = y;
            }

            public int getX()
            {
                return x;
            }

            public int getY()
            {
                return y;
            }

            public string ToString()
            {
                return "(" + ((char)(this.x + 65)) + ", " + (this.y + 1) + ")";
            }

            public bool equals(Posicion pos)
            {
                return ((this.x == pos.x) && (this.y == pos.y));
            }
        }
    }
}
