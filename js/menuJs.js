let pisaButtons = document.getElementsByClassName('pisa-button');

for (let i = 0; i < pisaButtons.length; i++) {
  pisaButtons[i].addEventListener('click', function () {
    inNewPage(pisaButtons[i])
  });
}

function inNewPage(button) {
  let name = button.getElementsByClassName('name')[0].innerHTML;
  window.open('buyPisa.html?name=' + name);
}

window.onscroll = function() {
  let windowHeight = document.documentElement.clientHeight;
  let waterflow = document.getElementById('waterflow');
  let waterflowPosition = waterflow.getBoundingClientRect().top; 
  
  if (waterflowPosition == windowHeight) {
    loadCss();
    appendData();
    appendData();
    appendData();
    removeCss();
  }
}

let appendData = function() {
  let columns = document.getElementsByClassName('column');
  columns[0].appendChild(createData());
  columns[1].appendChild(createData());
}

let loadCss = function() {
  let spinner = (document.getElementsByClassName('spinner'))[0];
  let rects = spinner.children;
  for (let i = 0; i < rects.length; i++) {
    rects[i].className = "rect" + (i+1);
  }
}

let removeCss = function() {
  let spinner = (document.getElementsByClassName('spinner'))[0];
  let rects = spinner.children;
  for (let i = 0; i < rects.length; i++) {
    rects[i].className = "rect";
  }
}

let createData = function() {
  let pisaDiv = document.createElement('div');
  pisaDiv.className = 'pisa';
  let imgDiv = document.createElement('div');
  imgDiv.className = 'img-div';
  let img = document.createElement('img');
  img.className = 'img';
  img.src = '../images/pisa17.jpg';
  let p_name = document.createElement('p');
  p_name.className= 'name';
  p_name.innerHTML = 'Pisa17';
  let p_priceTag = document.createElement('p');
  p_priceTag.innerText = 'Start from';
  p_priceTag.className = 'priceTag';
  let span = document.createElement('span');
  span.className = 'min-price';
  span.innerHTML = '₹199';

  imgDiv.appendChild(img);
  p_priceTag.appendChild(span);
  pisaDiv.appendChild(imgDiv);
  pisaDiv.appendChild(p_name);
  pisaDiv.appendChild(p_priceTag);
  return pisaDiv;
}



let getScrollTop = function() {
  let scrollTop = document.documentElement.scrollTop;
  return scrollTop; 
}

let getElementTop = function (element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current != null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}