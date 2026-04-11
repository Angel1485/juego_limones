let canvas =  document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 30;
const ALTURA_PERSONAJE = 60;
const ANCHO_PERSONAJE = 40;
const ALTURA_LIMON = 20;
const ANCHO_LIMON = 20;

let personajeX = canvas.width/2;
let personajeY = canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX = canvas.width/2;
let limonY = 10;
let puntaje = 0;
let vidas = 3;
let velocidadCaida = 200;
let intervalo; // para reiniciar


function iniciar()
{
    intervalo = setInterval(bajarLimon,velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}

function dibujarSuelo()
{
    ctx.fillStyle = "blue";
    ctx.fillRect (0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje()
{
    ctx.fillStyle = "yellow";
    ctx.fillRect (personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda()
{
    personajeX =  personajeX - 10;
    actualizarPantalla();
    detectarAtrapado();
}

function moverDerecha()
{
    personajeX = personajeX + 10;
    actualizarPantalla();
    detectarAtrapado();
}

function actualizarPantalla()
{
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje(); 
    dibujarLimon();
}
function limpiarCanva()
{
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

function dibujarLimon()
{
    ctx.fillStyle = "green";
    ctx.fillRect (limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);
}

function bajarLimon()
{
    limonY = limonY + 10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado()
{
    if(limonX + ANCHO_LIMON > personajeX && 
       limonX <  personajeX + ANCHO_PERSONAJE &&
       limonY + ALTURA_LIMON > personajeY && 
       limonY < personajeY + ALTURA_PERSONAJE)
    {
        puntaje = puntaje + 1;
        document.getElementById("txtPuntaje").textContent = puntaje;;

         // Aumentar velocidad según puntaje
        if (puntaje === 3)
        {
            velocidadCaida = 150;
            reiniciarVelocidad();
        }
        else if (puntaje === 6)
        {
            velocidadCaida = 100;
            reiniciarVelocidad();
        }
        else if (puntaje === 10)
        {
            clearInterval(intervalo);
            alert("ERES EL GANADOR: Felicidades has agando un auto 0KM");
        }

        aparecerLimon();
    }
}

function detectarPiso()
{
    if(limonY + ALTURA_LIMON === canvas.height - ALTURA_SUELO)
    {
        aparecerLimon();
        vidas = vidas - 1;
        document.getElementById("txtVidas").textContent = vidas

        if (vidas === 0)
        { 
            clearInterval(intervalo);
            alert("GAME OVER");
        }
    }
}

function generarAleatorio(min, max)
{
    let random = Math.random();
    let numero = random * (max - min);
    let numeroEntero = parseInt(numero);
    numeroEntero = numeroEntero + min
    return numeroEntero;
}

function aparecerLimon()
{
    limonX = generarAleatorio(0,canvas.width-ANCHO_LIMON)
    limonY = 0;
    actualizarPantalla();
}

function reiniciarVelocidad()
{
    clearInterval(intervalo);
    intervalo = setInterval(bajarLimon, velocidadCaida);
}

function reiniciar()
{
    vidas = 3;
    puntaje = 0;

    document.getElementById("txtVidas").textContent = vidas;
    document.getElementById("txtPuntaje").textContent = puntaje;

    clearInterval(intervalo);

    iniciar();
}