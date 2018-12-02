var clickHistory = [];
var progress;

function setup() { //initialize everything
  fillFunctionButtons();
  fillStatusText();
  fillProgressBar();
  fillMatrix();
  _addEventListener('keydown', document, handleKeyboardEvent);
  setStatusText("Loaded succesfully!", "text-bold" );
}

function fillFunctionButtons() {
  var headDiv = document.getElementById("head");
  var funcBtnRow = createRow();
  // createButton(buttonText, styleClass, functionName);
  funcBtnRow.appendChild(createButton("All Mid All Random", "btn btn-primary btn-sm m-3", "f1()"));
  funcBtnRow.appendChild(createButton("Drop the beat", "btn btn-warning btn-sm m-3", "f2()"));
  funcBtnRow.appendChild(createButton("Defile", "btn btn-dark btn-sm m-3", "f3()"));
  funcBtnRow.appendChild(createButton("Puuurrrge!", "btn btn-light m-3", "f4()"));
  headDiv.appendChild(funcBtnRow);
}

function fillStatusText() {
  var headDiv = document.getElementById("head");
  var infoTextRow = createRow("ml-3");
  infoTextRow.id = "infoText"; //set id of this element so we can change it later
  headDiv.appendChild(infoTextRow);
}

function setStatusText(text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild(document.createTextNode(text));
  textDiv.innerHTML = "";
  textDiv.appendChild(newText);
}

function fillProgressBar() {
  var headDiv = document.getElementById("head");
  var progessRow = createRow("progress");
  progress = 0;
  //a green colored bar
  var bar = createProgressBar("bar", "bg-success", progress);
  progessRow.appendChild(bar);
  headDiv.appendChild(progessRow);
}

function fillMatrix() {
  var matrix = document.getElementById("grid");
  for (i = 0; i < 8; i++) {
    if(i == 7){
      var newRow = createRow("justify-content-md-center border border-top border border-warning mt-3");
    }
    else{
    var newRow = createRow("justify-content-md-center");
    }
    for (j = 0; j < 3; j++) {
      newRow.appendChild(createDefaultButton(i, j));
    }
    matrix.appendChild(newRow);
  }
}

function fillAllRandom() { //sample function 1
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, getRandomColor());
      setButtonText(i, j, getRandomNumber(1, 10));
    }
  }
}
////
/////
//////
///////





//MY CHANGES
function drop() { //sample function 2
  for (i = 7; i > 0; i--) {
    for (j = 0; j < 3; j++) {
      setButtonColor(i, j, getButtonColor(i-1, j));
    }
  }
  //for row 0
    for (j = 0; j < 3; j++) {
      setButtonColor(i, j, getRandomColor());
    }
}
function autoDrop() {
  var numOfRows = 1;
  rowsOfWhite(numOfRows);
  setTimeout(drop,500);

  setTimeout(autoDrop,1000);
}

function rowsOfWhite(num){
for(m = 0; m<num; m++){
 for (i = 7; i > 0; i--) {
    for (j = 0; j < 3; j++) {
      setButtonColor(i, j, getButtonColor(i-1, j));
    }
  }
  for (j = 0; j < 3; j++) {
      setButtonColor(i, j,"white");
    }
      //wirte three rows after 
}
}

function defile(number) { //sample function 3 (recursion and time)
  if (number < 0) return;
  for (n = 0; n < number; n++) {
    setTimeout(function(){
      var i = getRandomNumber(0, 7);
      var j = getRandomNumber(0, 7);
      setButtonColor(i, j, "black");
      setButtonText(i, j, "");
      setProgressBar("bar", "bg-danger", progress--);
    }, (number+1)*number - n*n);
  }
}

function purge() { //sample function 4
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, "white");
      setButtonText(i, j, "");
    }
  }
  progress = 0;
  clickHistory = [];
  setProgressBar("bar", "bg-success", progress);
}

function f1() {
  setStatusText("Fill with random colors");
  fillAllRandom();
}

function f2() {
  setStatusText("Drop everything by 1 row");
  //drop();
  autoDrop();
}

function f3() {
  setStatusText("BAM! BAM! BAM!");
  defile(32);
}

function f4() {
  setStatusText("Reset EVERYTHING");
  purge();
}

// helper functions below

function createRow(className) {
  var rowDiv = document.createElement("div");
  if (className == null) {
    rowDiv.className = "row";
  } else {
    rowDiv.className = "row " + className;
  }
  return rowDiv;
}

function createButton(buttonText, styleClass, functionName) {
  var button = document.createElement("button");
  button.className = styleClass;
  button.appendChild(document.createTextNode(buttonText));
  button.setAttribute("onclick", functionName);
  return button;
}

function createProgressBar(bar_id, color, value) {
  var bar = document.createElement("div");
  bar.id = bar_id;
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  return bar;
}

function setProgressBar(bar_id, color, value) {
  var bar = document.getElementById(bar_id);
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  bar.innerHTML = value + "%";
}

function createDefaultButton() {
  var button = document.createElement("div");
  button.className = "thumbnail";
 // button.setAttribute("onclick", "buttonClicked("+i+","+j+")");

  //the image part
  var img = document.createElement("img");
  img.id = "img_" + i + "_" + j;
  img.setAttribute("src", "images/white.jpg");
  img.setAttribute("alt", "white");
  img.setAttribute("class", "rounded-circle");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  //the text part
  var text = document.createElement("label");
  text.setAttribute("class", "caption unselectable");
  text.id = "text_" + i + "_" + j;

  button.appendChild(img);
  button.appendChild(text);
  return button;
}

function setButtonColor(i, j, color) {
  var button = document.getElementById("img_" + i + "_" + j);
  button.setAttribute("src", "images/" + color + ".jpg");
  button.setAttribute("alt", color);
}

function setButtonText(i, j, text) {
  var button = document.getElementById("text_" + i + "_" + j);
  button.innerHTML = text;
}

function getButtonColor(i, j) {
  var img = document.getElementById("img_" + i + "_" + j);
  return img.getAttribute("alt");
}

function getButtonText(i, j) {
  var text = document.getElementById("text_" + i + "_" + j);
  return text.innerHTML;
}

function getRandomColor() {
  //you might want to change this to get more colors
  var random = Math.floor(Math.random() * 2);
  if (random < 1) {
    return "white";
  } else  {
    return "green";
  } 
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

//console interaction functions
function logAllHistory() {
  if (clickHistory.length == 0) {
    console.log("History is empty");
    return;
  }
  for (i = 0; i < clickHistory.length; i++) {
    console.log(clickHistory[i]);
  }
}

function logLastClicked() {
  if (clickHistory.length == 0) {
    console.log("History is empty");
  } else {
    console.log(clickHistory[clickHistory.length - 1]);
  }
}

//this is what's triggered when any button in the matrix is pressed

function buttonClicked(i, j) { //this is where you should start
  setStatusText("Button [" + i + ", " + j + "] pressed");
  clickHistory.push(i*8 + j);
  //set this button to a random color
  setButtonColor(i, j, getRandomColor());
  var currentText = getButtonText(i, j);
  var textValue = 0;
  if (currentText != "") {
    textValue = parseInt(currentText, 10); //convert the text to base10 (decimal) number
  }
  setButtonText(i, j, textValue+1);
  //increase the progress bar a bit
  progress += textValue;
  setProgressBar("bar", "bg-success", progress);
}

var Key = {
  LEFT:   37,
  UP:     38,
  RIGHT:  39,
  DOWN:   40
};


function _addEventListener(evt, element, fn) {
  if (window.addEventListener) {
    element.addEventListener(evt, fn, false);
  }
  else {
    element.attachEvent('on'+evt, fn);
  }
}

function handleKeyboardEvent(evt) {
  if (!evt) {evt = window.event;} // for old IE compatible
  var keycode = evt.keyCode || evt.which; // also for cross-browser compatible

  
  switch (keycode) {
    case Key.LEFT:
      setButtonColor(6,0,"white");
      break;
    case Key.UP:
       setButtonColor(6,1,"white");
      break;
    case Key.RIGHT:
       setButtonColor(6,2,"white");
      break;
    default:
      info.innerHTML += "SOMEKEY ";
  }
}
