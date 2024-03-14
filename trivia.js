window.addEventListener('DOMContentLoaded', function () {

    let preguntas; //variable para guardar el archivo JSON
    let btnVolver = this.document.getElementById('btnVolver');
    let btnCtrlJuego = this.document.getElementById('btnEmpezar');
    let contenedorPregunta = this.document.getElementById('contenedorPregunta');
    let contenedorRespuestas = this.document.getElementById('contenedorRespuestas');
    let contenedorEstadisticas = this.document.getElementById('contenedorEstadisticas')
    let puntuacion = 0;
    let preguntaSalida = [];
    let vidas = 5;

    //Variable que guarda la referencia a la página principal para volver
    const pagPrincipal = 'index.html';

    //Tratamiento del archivo json.
    const request = new XMLHttpRequest(); //Creo un objeto XMLHttpRequest
    request.open('GET', 'questionsE.json'); //Obtengo el archivo Json
    request.responseType = 'json'; //Indico que tipo de archivo esperar
    request.send(); // Envío la petición

    request.onload = function () {

        preguntas = request.response;
    }

    // Verificar si el botón existe
    if (btnCtrlJuego) {
        // Agregar evento click al botón
        btnCtrlJuego.addEventListener('click', function () {
            // Acciones a realizar cuando se hace clic en el botón
            console.log('Botón clickeado');
            iniciarJuego();
        });

    } else {
        console.error('El botón no fue encontrado en el DOM.');
    }

    function iniciarJuego() {

        //Si el juego se ha iniciado:
        contenedorEstadisticas.innerHTML = '<div>Tu puntuación es: '+puntuacion+'</div><div>Vidas : '+pintarVida(vidas)+'</div>';

        let indice = generarAleatorio(preguntaSalida) //Genera aleatorio de la pregunta
        preguntaSalida.push(indice);
        console.log(preguntaSalida);
        //muestra la pregunta pasando las variables indice "aleatorio" y preguntas del json.
        mostrarPregunta(indice, preguntas);
        //muestra las respuestas pasando las variables indice "aleatorio" y preguntas del json.
        mostrarRespuestas(indice, preguntas);

    }

    //Esta función recibe los botones para ver si han sido pulsados y cambia en contenido del 
    //contenedor según sea el resultado de la respuesta elegida.
    function verificaRespuestaClickada(id, btnR1, btnR2, btnR3, btnR4) {

        console.log('La respuesta correcta es ', preguntas[id].correctAnswer);

        // Verificar si el botón existe
        if (btnR1) {
            // Agregar evento click al botón
            btnR1.addEventListener('click', function () {
                // Acciones a realizar cuando se hace clic en el botón
                console.log('Botón 1 clickeado y tiene valor', btnR1.value);

                //Verificar si el valor del botón coincide con la respuesta correcta
                compararRespuesta(btnR1, id);
                // btnR1.disabled = true;
                // btnR1.style.display = 'none';


            });

        } else {
            console.error('El botón no fue encontrado en el DOM.');
        }

        // Verificar si el botón existe
        if (btnR2) {
            // Agregar evento click al botón
            btnR2.addEventListener('click', function () {
                // Acciones a realizar cuando se hace clic en el botón
                console.log('Botón 2 clickeado y tiene valor', btnR2.value);

                //Verificar si el valor del botón coincide con la respuesta correcta
                compararRespuesta(btnR2, id);

            });

        } else {
            console.error('El botón no fue encontrado en el DOM.');
        }

        // Verificar si el botón existe
        if (btnR3) {
            // Agregar evento click al botón
            btnR3.addEventListener('click', function () {
                // Acciones a realizar cuando se hace clic en el botón
                console.log('Botón 3 clickeado y tiene valor', btnR3.value);

                //Verificar si el valor del botón coincide con la respuesta correcta
                compararRespuesta(btnR3, id);

            });

        } else {
            console.error('El botón no fue encontrado en el DOM.');
        }

        // Verificar si el botón existe
        if (btnR4) {
            // Agregar evento click al botón
            btnR4.addEventListener('click', function () {
                // Acciones a realizar cuando se hace clic en el botón
                console.log('Botón 4 clickeado y tiene valor', btnR4.value);

                //Verificar si el valor del botón coincide con la respuesta correcta
                compararRespuesta(btnR4, id);

            });

        } else {
            console.error('El botón no fue encontrado en el DOM.');
        }



    }

    
    function compararRespuesta(valorBoton, id) {
        let indice = valorBoton.value;
        console.log(preguntas[id].correctAnswer);
        console.log(preguntas[id].possibleAnswers[indice]);

        if (preguntas[id].possibleAnswers[indice] === preguntas[id].correctAnswer) {
            contenedorRespuestas.innerHTML = '<div><h1>Correcto</h1></div>';
            estadisticas(true);

        } else {

            contenedorRespuestas.innerHTML = '<div><h1>Incorrecto</h1></div>';
            estadisticas(false);
        }
    }

    function estadisticas(esAcierto) {
        
        if (esAcierto) {
            puntuacion++;

        } else {
            vidas--;
        }


        comprobarFin();
    }

    function pintarVida(vida) {
        let txt = '';

        for (let index = 0; index < vida; index++) {
            txt += '<span> &#128420 </span>';
        }

        return txt;
    }
    function comprobarFin() {
        if (vidas == 0) {
            contenedorPregunta.innerHTML = '<div></div>';
            contenedorRespuestas.innerHTML = '<div><h1>¡Has perdido!</h1></div>';
            vidas = 5;
            puntuacion = 0;
            preguntaSalida = [];

        }else{

            if (puntuacion == 10) {
                contenedorPregunta.innerHTML = '<div></div>';
                contenedorRespuestas.innerHTML = '<div><h1>¡Has ganado!</h1></div>';
                vidas = 5;
                puntuacion = 0;
                preguntaSalida = [];
    
            }
        }
    }

    function volverIndex() {
        document.location.href = pagPrincipal;
    }

    //Esta función genera un número aleatorio para elegir la pregunta
    function generarAleatorio(arrayPreguntasSalidas) {

        //Genero un número aleatorio
        let numeroElegido = Math.floor(Math.random() * 57); //por 57 pq son 57 posiciones en el array

        //Busco en el array de preguntas para asegurarme que no haya salido ya la pregunta, en caso contrario
        //Genero un nuevo número aleatorio
        for (let index = 0; index < arrayPreguntasSalidas.length; index++) {
            
            if (numeroElegido == arrayPreguntasSalidas[index]) {
                numeroElegido = Math.floor(Math.random() * 57);
                console.log(arrayPreguntasSalidas[index]);
                console.log('coincidencia encontrada');
            }
        }
        //console.log(numeroElegido);
        return numeroElegido;

    }

    // Esta función toma el índice y el json de preguntas para mostrar una pregunta aleatoriamente
    function mostrarPregunta(indice, preguntas) {

        //variable local que almacena la pregunta
        let pregunta = preguntas[indice].question; //asigno a la variable la pregunta utilizando el indice
        let id = preguntas[indice].id;
        //asigno a la variable contenedorPregunta, la pregunta seleccionada
        contenedorPregunta.innerHTML = '<h1>' + pregunta + '</h1>';
    }



    function mostrarRespuestas(id, respuestas) {

        contenedorRespuestas.innerHTML = ''; //Inicio la lista de botones

        for (let index = 0; index < respuestas[id].possibleAnswers.length; index++) {
            //console.log(respuestas[id].possibleAnswers[index]);

            contenedorRespuestas.innerHTML +=
                '<button id="respuesta' + index + '" value="' + index + '">' + respuestas[id].possibleAnswers[index] + '</button>';

        }

        //variables que guardan el boton con la respuesta
        let btnRespuesta1 = this.document.getElementById('respuesta0')
        let btnRespuesta2 = this.document.getElementById('respuesta1')
        let btnRespuesta3 = this.document.getElementById('respuesta2')
        let btnRespuesta4 = this.document.getElementById('respuesta3')

        // Verificar si la respuesta clickada es correcta o no.
        verificaRespuestaClickada(id, btnRespuesta1, btnRespuesta2, btnRespuesta3, btnRespuesta4);

    }

    btnVolver.addEventListener('click', volverIndex);

    // Al hacer click en el boton jugar, mostrar el botón empezar
    // si le han echo click al boton empezar
    // mostrar la pregunta y sus opciones
    // para mostrar las preguntas y opciones hay que generar el aleatorio

});