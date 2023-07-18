function cuentaAtras(fechaObjetivo) {
    var ahora = new Date().getTime();
    var distancia = fechaObjetivo - ahora;
  
    var dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    var horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((distancia % (1000 * 60)) / 1000);
  
    document.getElementById("cuentaAtras").innerHTML = dias + " días " + horas + " horas " + minutos + " minutos " + segundos + " segundos ";
  
    if (distancia < 0) {
      clearInterval(intervalo);
      document.getElementById("cuentaAtras").innerHTML = "¡SPACECON 2023 ha comenzado!";
    }
  }
  
  var fechaObjetivo = new Date("Dec 31, 2023 00:00:00").getTime();
  var intervalo = setInterval(function() { cuentaAtras(fechaObjetivo); }, 1000);