window.addEventListener('DOMContentLoaded', function () {

   let respuesta; //variable para guardar el archivo JSON
   let btnVolver = this.document.getElementById('btnVolver');
   let btnPersonajes = this.document.getElementById('btnPersonajes');

   const pagPrincipal = 'index.html';
   const pagPersonajes = 'personajes.html';

   const request = new XMLHttpRequest(); //Creo un objeto XMLHttpRequest
   request.open('GET', 'characters.json'); //Obtengo el archivo Json
   request.responseType = 'json'; //Indico que tipo de archivo esperar
   request.send(); // Envío la petición

   request.onload = function () {

      respuesta = request.response;
      //console.log(respuesta[0].images.main)
      mostrarFichas();
   }

   function volverIndex() {
      document.location.href = pagPrincipal;
   }

   function mostrarFichas() {
      for (let index = 0; index < respuesta.length; index++) {

         listaFichas.innerHTML += '<div class="ficha"><div class="image"><img src='
            + respuesta[index].images.headShot + ' alt="' + respuesta[index].name.last + '"></div><div id="descripcion"><h4>Nombre: '
            + respuesta[index].name.first + ' ' + respuesta[index].name.last +
            '</h4><button class="btnDetalle" value="' + respuesta[index].id + '">Detalle</button></div></div>'

      }
      const btnDetalle = this.document.querySelectorAll('.btnDetalle');

      // Itera sobre cada botón y agrega un controlador de eventos 'click'
      btnDetalle.forEach(boton => {
         boton.addEventListener('click', function () {

            // Captura el valor del botón específico al que se le hizo clic
            const valorBoton = this.value;
            console.log('Valor del boton: ', valorBoton);

            // Llama a la función mostrarDetalle y pasa el valor del botón como argumento          
            mostrarDetalle(valorBoton);

         });
      });



   }

   function mostrarDetalle(id) {

      //se resta 1 a el valor pq el id de cada personaje es el array del json - 1

      listaFichas.innerHTML = '<div class="detalle"><img src='
         + respuesta[id - 1].images.main + ' alt="' + respuesta[id - 1].name.last + '"></div> <div class="tabla"><h1>Detalles</h1><p>Nombre: '
         + respuesta[id - 1].name.first + ' ' + respuesta[id - 1].name.last + '</p><p> Género: '
         + respuesta[id - 1].gender + '</p><p>Especie: '
         + respuesta[id - 1].species + '</p><p>Planeta hogar: '
         + respuesta[id - 1].homePlanet + '</p><p>Ocupación: '
         + respuesta[id - 1].occupation + '</p><p>Edad: '
         + respuesta[id - 1].age + '</p>'
         + mostrarFrase(id - 1)+'</div>'

         
   }



   function mostrarFrase(idFrase) {

      let indiceFrase = Math.floor(Math.random() * respuesta[idFrase].sayings.length)
      let txt = '<p>Frase: '+respuesta[idFrase].sayings[indiceFrase]+'</p>';
      return txt;

   }

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



   function irPaginaPersonajes() {
      document.location.href = pagPersonajes;
   }

   btnPersonajes.addEventListener('click', irPaginaPersonajes);
   btnVolver.addEventListener('click', volverIndex);

});