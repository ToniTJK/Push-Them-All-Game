/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        $("#botonPositivoBeeps").click(mourePositiu);
        $("#botonNegativoBeeps").click(moureNegatiu);
        $("#botonReproducirBeeps").click(playSound);
        
        $("#botonEsquerra").click(moureEsquerra);
        $("#botonDreta").click(moureDreta);
        $("#botonGuardarDireccion").click(savePosition);
        
        $("#botonStart").click(start);
        $("#botonClean").click(clean);
        $("#botonChange").click(changeWarning);
        $("#creador").click(multiplica);
        $("#brujula").click(brujula);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var contador = 0;
//var value = $("#botonContador").attr("value");
//alert(value);

function mourePositiu(){
    if(contador<5){    
    $("#botonContador").animate({ "left": "+=50px" }, "slow" );
    contador = contador + 1;
    //alert(contador);
    $("#botonContador").html("Beeps: " + contador);
    } else {
        alert("No puedes avanzar mas de 5.");
    }
}

function moureNegatiu(){
    if(contador<=0){
        alert("No puedes retroceder mas de 0.");
    } else if (contador<=5) {
    $("#botonContador").animate({ "left": "-=50px" }, "slow" );
    contador = contador - 1;
    $("#botonContador").html("Beeps: " + contador);
    //alert(contador);
    }
}

function playSound(){
    if (contador === 0){
        alert("No se puede reproducir, intenta a incrementar el valor.");
    } else {
    navigator.notification.beep(contador);
    }
}
var valueRotate = 0;
var valorNegativo = -1;

function moureEsquerra(){
    valueRotate = valueRotate-10;
   $("#imgArrow").css("transform","rotate("+valueRotate+"deg)");
   //valueRotate = valueRotate * valorNegativo;
   //alert(valueRotate);
   if(positionSave === valueRotate){
        alert("Enhorabona! You won!");
    } 
}
function moureDreta(){
    valueRotate = valueRotate+10;
   $("#imgArrow").css("transform","rotate("+valueRotate+"deg)");
   //alert(valueRotate);
   if(positionSave === valueRotate){
        alert("Enhorabona! You won!");
    } 
}

var watchID = null;
var secondClickPosition = true;

function savePosition(){
    if(secondClickPosition === true){
    positionSave = valueRotate;
    valueRotate = 0;
    $("#imgArrow").css("transform","rotate(0deg)");
    watchID = navigator.compass.watchHeading(onSuccess, onError, options);
    //alert(positionSave + valueRotate);   
    secondClickPosition = false;
    } else {
    navigator.compass.clearWatch(watchID);
    $("#imgArrow").css("transform","rotate("+positionSave+"deg)");
    secondClickPosition = true;
    }
}

function hiddenButton(){    
    if (click === true){
    $("#botonStart").hide();
    click = false;
    } else {
     $("#botonStart").show();  
     click = true;
    }
}

function onSuccess(heading) { //modificar
    //var desviacio = heading.magneticHeading;
    //desviacio = 360-desviacio;
 console.log('Brujula: ' + heading.magneticHeading);
 console.log('SavePoint: ' + positionSave);
 //$("#bruixola").html("Graus: "+heading.magneticHeading);
 $("#imgArrow").css("transform","rotate("+heading.magneticHeading+"deg)");
 //guardarGrado = heading.magneticHeading;
 var value1 = Math.round(heading.magneticHeading);
 console.log('valueSave: ' + value1);
 
 if(value1 === positionSave){
        alert("Enhorabona! You won!");
    } 
    //setInterval(function(){ alert(heading.magneticHeading); }, 1000);
};

function onError(compassError) {
 alert('Compass error: ' + compassError.code);
};

var options = {
 frequency: 500
}; // Update every 2 seconds
   
var windowHeight = $( window ).height();
var windowWidth = $( window ).width();
var intervalBurbujas;
var intervalBombas;
var intervalEliminarBombas;
var countBubble = 0;
var nouScore;
var nouGameOver;
var nouDiv;
var time = 1000;
var dificultad1;
var dificultad2;
var nouBomb;

function start(){
   var color = "#ADD8E6";
   var nouDiv = $('<div></div>'); 
   
   nouDiv.attr("id","game");
   
   $('#tercerPanell1').append(nouDiv);
    
   nouDiv.css("background-color", color);
   nouDiv.css("height", windowHeight);
   nouDiv.css("width", windowWidth);
   
   var nouScore = $('<br> <p href="#" id="botonScore" class="a" value="0">Score: 0</p> <br>');
   $('#game').append(nouScore);
   
   var nouGameOver = $('<p href="#" id="botonDanger" class="e" value="0">Game Over: 0/10</p>');
   $('#game').append(nouGameOver);
    
   dificultad1 = setTimeout(function(){ 
       stopTimer();
       time = 500;
       
       intervalBurbujas = setInterval(function(){ crearImg(); }, time);
       intervalBombas = setInterval(function(){ crearBombas(); }, 1000);
       
   }, 5000); 
   
   dificultad2 = setTimeout(function(){ 
       stopTimer();
       time = 250;
       $("img.bomba").remove();
       intervalBurbujas = setInterval(function(){ crearImg(); }, time);
       intervalBombas = setInterval(function(){ crearBombas(); }, 3000);
   }, 10000);
   
   intervalBurbujas = setInterval(function(){ crearImg(); }, time);
   intervalBombas = setInterval(function(){ crearBombas(); }, 700);
   
   
   hiddenButton();
    
}

var nouImg;
//alert(windowWidth); 360
//alert(windowHeight  ); 568
        
function crearImg(){
    if(countBubble === 10){
    stopTimer();
    clearTimeout(dificultad2);
    alert("Game Over!");

    } else {   
        
       countBubble +=1;
       var randomNumber1 = Math.floor((Math.random() * (windowHeight-150)-1) + 1);
       var randomNumber2 = Math.floor((Math.random() * (windowWidth- 150)-1) + 1);
       
            //alert(countBubble);
       nouImg = $('<img id="fotos" class="fotos" src="img/burbuja.png"><');
      
       nouImg.css("position", "absolute");
       nouImg.css("height", 50);
       nouImg.css("width", 50);
       nouImg.css("margin-top", randomNumber1);
       nouImg.css("margin-left", randomNumber2);
       
       
       $('#game').append(nouImg);
       
       nouImg.click(borrarBurbuja);
       $("#botonDanger").html("Game Over: " + countBubble + "/10");
   }
}

var score = 0;

function borrarBurbuja(){
    //nouImg.remove();
    score +=1;
    $("#botonScore").html("Score: " + score);
    countBubble -=1;
    $("#botonDanger").html("Game Over: " + countBubble + "/10");
    this.remove();
}

function stopTimer(){
    clearInterval(intervalBurbujas);
    clearInterval(intervalBombas);
    clearTimeout(dificultad1);
     
}

function clean(){
    time = 1000;
    score = 0;
    countBubble = 0;
    $("#botonDanger").html("Game Over: " + countBubble + "/10");
    $("#botonScore").html("Score: " + score);
    $("img.fotos").remove();
    $("#game").remove();
    hiddenButton();
    stopTimer();
    clearTimeout(dificultad2);  
}

var click = true;
$("#botonClean").hide();
function hiddenButton(){    
    if (click === true){
    $("#botonStart").hide();
    $("#botonClean").show();
    click = false;
    } else {
     $("#botonStart").show();
     $("#botonClean").hide();
     click = true;
    }
}

function crearBombas(){ 
        
       var randomNumber1 = Math.floor((Math.random() * (windowHeight-150)-1) + 1);
       var randomNumber2 = Math.floor((Math.random() * (windowWidth- 150)-1) + 1);
       
            //alert(countBubble);
       nouBomb = $('<img id="bomba" class="bomba" src="img/Bomba.png"><');
      
       nouBomb.css("position", "absolute");
       nouBomb.css("height", 50);
       nouBomb.css("width", 50);
       nouBomb.css("margin-top", randomNumber1);
       nouBomb.css("margin-left", randomNumber2);
       
       $('#game').append(nouBomb);
       
       nouBomb.click(gameOverBombas);
       
}

function gameOverBombas(){
    stopTimer();
    time = 1000;
    score = 0;
    countBubble = 0;
    alert("B O O O M !");  
    clearTimeout(dificultad2);
}

function eliminarBombas(){
    $("img.game").remove(); 
}



function changeWarning(){
    var buttonWarning = $("#botonChange").hasClass("btn-warning");
    if(buttonWarning === true){
        $('#botonChange').addClass('btn-danger');
        navigator.vibrate(1500);
    }
 
 changeWarning2();
}

function changeWarning2(){
    var buttonWarning2 = $("#botonChange").hasClass("btn-danger");
    if(buttonWarning2 === true){
        $('#botonChange').addClass('btn-warning');
    }
}

var nuevobtn;
var vibrin = 0;
var numero = 1000;

function multiplica(){
    vibrin +=1000;
    numero +=1000;
    navigator.vibrate(vibrin);
    nuevobtn = $('<a href="#" id="newbtn" class="btn btn-primary">'+numero+'</a><br>');
    $('#quartPanell1').append(nuevobtn);
    
    nuevobtn.click(multiplica2);
    
}

function multiplica2(){
    vibrin +=1000;
    numero +=1000;
    navigator.vibrate(vibrin);
    nuevobtn = $('<a href="#" id="newbtn" class="btn btn-primary">'+numero+'</a><br>');
    $('#quartPanell1').append(nuevobtn);
    
    nuevobtn.click(multiplica2);
    
}
var watchID2 = null;
function brujula(){
    watchID2 = navigator.compass.watchHeading(onSuccess2, onError2, options2);
}

function onSuccess2(heading) { 

 console.log('Brujula: ' + heading.magneticHeading);
 
 $("#imgArrow").css("transform","rotate("+heading.magneticHeading+"deg)");

 var value1 = Math.round(heading.magneticHeading);
 console.log('valueSave: ' + value1);
 
 var SUD = 180;
 
 if(value1 === 180){
        alert("Estas en el SUD!");
    } 
    
};

function onError2(compassError) {
 alert('Compass error: ' + compassError.code);
};

var options2 = {
 frequency: 500
}; // Update every 2 seconds