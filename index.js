window.addEventListener('DOMContentLoaded', function () {

    let respuesta; //En esta variable guardo la respuesta del json
    const request = new XMLHttpRequest();
    const pagPersonajes = 'personajes.html';
    const pagTrivia = 'trivia.html';
    let btnPersonajes = this.document.getElementById('btnPersonajes');
    let btnTrivia = this.document.getElementById('btnTrivia');

    request.open('GET', 'info.json'); //Abrimos la petición con método get y url del archivo json

    request.responseType = 'json'; //Esperamos un archivo json

    request.send(); //Enviamos la petición

    request.onload = function () {
        respuesta = request.response;
        console.log(respuesta); //Pruebo que se ha almacenado el array
        // console.log(respuesta[0].descripcion) //Pruebo acceder a un elemento concreto
    }

    function irPaginaPersonajes() {
        document.location.href = pagPersonajes;
    }

    function irPaginaTrivia() {
        document.location.href = pagTrivia;
    }
    
    btnPersonajes.addEventListener('click', irPaginaPersonajes);
    btnTrivia.addEventListener('click', irPaginaTrivia);


})