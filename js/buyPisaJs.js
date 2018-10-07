let getPisaName = function() {
  let str = window.location.search;

  let items = str.length ? str.split('=') : [];
  let id = items[1];
  return id;
}

let dataObj;
let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        let data = xhr.responseText;
        dataObj = JSON.parse(data);
        load();
      } else {
        console.log("Request was unsuccessful: " + xhr.status);
  }
    }
  }
xhr.open("get","http://localhost:8080/OrderSystems/dataObj.json",true);
xhr.send(null);

let load = function() {
  let pisaName =document.getElementsByClassName('pisa-name')[0];
  let sizePrice = document.getElementsByClassName('size-price')[0];
  let sizes = sizePrice.getElementsByClassName('size');
  let prices = sizePrice.getElementsByClassName('price');

  let pisaData = dataObj[getPisaName()];
  console.log(pisaData["name"]);

  pisaName.innerHTML = pisaData["name"];
  for (let i = 0; i < sizes.length; i++) {
    prices[i].innerHTML = '₹' + pisaData["size_price"][`${sizes[i].innerHTML}`];
  }
}
 
let Buttons = document.getElementsByClassName('size-price');
let sizeButtons = Buttons[0].children;
let crustButtons = Buttons[1].children;
let toppingButtons = Buttons[2].children;
let sizeSelectedNum = 0;
let crustSelectedNum = 0;
let toppingSelectedNum = 0;

for (let i = 0; i < sizeButtons.length; i++) {
  sizeButtons[i].addEventListener('click', function() {
    sizeButtons[sizeSelectedNum].className = 'sp_button'; 
    sizeSelectedNum = i;
    sizeButtons[i].className = 'selected';
  })
}

for (let i = 0; i < crustButtons.length; i++) {
  crustButtons[i].addEventListener('click', function() {
    crustButtons[crustSelectedNum].className = 'sp_button'; 
    crustSelectedNum = i;
    crustButtons[i].className = 'selected';
  })
}

for (let i = 0; i < toppingButtons.length; i++) {
  toppingButtons[i].addEventListener('click', function() {
    toppingButtons[toppingSelectedNum].className = 'sp_button'; 
    toppingSelectedNum = i;
    toppingButtons[i].className = 'selected';
  })
}

//点赞变色
let collectButton = document.getElementsByClassName('collect')[0];
collectButton.addEventListener('click', function() {
  console.log(collectButton.className);
  if (collectButton.className == 'collect') {
    collectButton.className = 'collected'
  } else {
    collectButton.className = 'collect';
  }
})