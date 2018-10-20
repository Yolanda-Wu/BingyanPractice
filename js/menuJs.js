
let dataArr;
let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        let data = xhr.responseText;
        dataArr = JSON.parse(data);
        load();
      } else {
        console.log("Request was unsuccessful: " + xhr.status);
      }
    }
  }
xhr.open("get","http://localhost:8080/OrderSystems/dataArr.json",true);
xhr.send(null);
let index = 0;

let load = function() {
  for (let i = 0; i < 4; i++) {
    if (index == dataArr.length) {
      break;
    }
    appendData();
  }
}

 
window.onscroll = function() {
  let windowHeight = document.documentElement.clientHeight;
  let waterflow = document.getElementById('waterflow');
  let waterflowPosition = waterflow.getBoundingClientRect().top; 
  
  if (waterflowPosition == windowHeight) {
    loadCss();
    for (let i = 0; i < 4; i++) {
      if (index == dataArr.length) {
        break;
      }
      appendData();
    }
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
  let pisaA = document.createElement('a');
  pisaA.className = 'pisa-a';
  pisaA.id = dataArr[index]["id"];
  let img = document.createElement('img');
  img.className = 'img';
  img.id = dataArr[index]["id"];
  img.src = dataArr[index]["url"];
  let p_name = document.createElement('p');
  p_name.className= 'name';
  p_name.innerHTML = dataArr[index]["name"];
  let p_priceTag = document.createElement('p');
  p_priceTag.innerText = 'Start from';
  p_priceTag.className = 'priceTag';
  let span = document.createElement('span');
  span.className = 'min-price';
  span.innerHTML = dataArr[index]["size_price"]["Small"];
  index++;

  imgDiv.appendChild(img);
  pisaA.appendChild(imgDiv);
  pisaA.appendChild(p_name);
  pisaA.appendChild(p_priceTag);
  p_priceTag.appendChild(span);
  pisaDiv.appendChild(pisaA);

  pisaA.addEventListener('click', function () {
    inNewPage(pisaA);
  });

function inNewPage(a) {
  let id = a.id;
  window.open('buyPisa.html?pisa_id=' + id, '_top');
}

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