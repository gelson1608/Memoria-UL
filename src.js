var arrayjugadas = [];
var arrayjugadores = [];
var pos = 0;
var turnocomp = 1;
var segundos = 0;
var creacionArr = 0;

var jugador = {
  nombre: "",
  turnos: 1,
  tiempo: ""
}

var guardarNombre = function(){
  localStorage.setItem('name',JSON.stringify(document.getElementById('caja_nombre').value));
}

var cronometro = function(){
  segundos = segundos + 1;
  document.getElementById('segunditos').innerHTML="Tiempo: "+segundos+" segundos";
}

var cronometrar = function(){
  control = setInterval(cronometro,1000);
}

var seleccionarCelda = function(){
  var target = event.target;
  console.log(target.id);
  target.className="selected_on";
  var posicionjugada = target.id;

  setTimeout(function () {
    if(target.className=="selected_on"){
      target.className="selected_off";
    }
  }, 1000);

  if(jugador.turnos==turnocomp){
    if(arrayjugadas[0]==null){
      cronometrar();
    }
    arrayjugadas.push(posicionjugada);
    jugador.turnos = jugador.turnos + 1;
    document.getElementById('turnitos').innerHTML="Turno: "+jugador.turnos;
    pos = 0;
    turnocomp = 1;
  }
  else {
    if(posicionjugada != arrayjugadas[pos]){
      document.getElementById('mensaje_fin').innerHTML='Fin del juego';
      document.getElementById('boton_reiniciar').className='btn btn-success';
      clearInterval(control);
      jugador.tiempo = segundos;
      pos=0;
      turnocomp = 1;
      guardarDatos();
      document.getElementById('1_1').removeEventListener("click", seleccionarCelda);
      document.getElementById('1_2').removeEventListener("click", seleccionarCelda);
      document.getElementById('1_3').removeEventListener("click", seleccionarCelda);
      document.getElementById('2_1').removeEventListener("click", seleccionarCelda);
      document.getElementById('2_2').removeEventListener("click", seleccionarCelda);
      document.getElementById('2_3').removeEventListener("click", seleccionarCelda);
    }
    else{
      pos=pos+1;
      turnocomp = turnocomp + 1;
    }
  }

}

var guardarDatos = function (){
  if(creacionArr==0){
    localStorage.setItem(arrayjugadores, JSON.stringify(arrayjugadores));
    creacionArr = 1;
  }
  var tablasc = JSON.parse(localStorage.getItem('arrayjugadores'));
  jugador.nombre = JSON.parse(localStorage.getItem('name'));
  tablasc.push(jugador);
  localStorage.setItem('arrayjugadores',JSON.stringify(tablasc));
}

var actualizarSB = function(){
  tablasc = JSON.parse(localStorage.getItem('arrayjugadores'));
  for(var i = 0; i < 5; i++){
    if(tablasc[i]!=null){
    document.getElementById('sc'+(i+2)+'_1').innerHTML = tablasc[i].nombre;
    document.getElementById('sc'+(i+2)+'_2').innerHTML = tablasc[i].tiempo;
    document.getElementById('sc'+(i+2)+'_3').innerHTML = tablasc[i].turnos;
    }
  }
  localStorage.setItem('arrayjugadores', JSON.stringify(tablasc));
}

var main = function(){
  if(document.getElementById('sc2_1')!= null){
    actualizarSB();
  }
  if(document.getElementById('1_1')!= null){
    document.getElementById('1_1').addEventListener("click", seleccionarCelda);
    document.getElementById('1_2').addEventListener("click", seleccionarCelda);
    document.getElementById('1_3').addEventListener("click", seleccionarCelda);
    document.getElementById('2_1').addEventListener("click", seleccionarCelda);
    document.getElementById('2_2').addEventListener("click", seleccionarCelda);
    document.getElementById('2_3').addEventListener("click", seleccionarCelda);
  }
}
window.onload = main;
