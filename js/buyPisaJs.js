let getPisaName = function() {
  var str = window.location.search;

  var items = str.length ? str.split('=') : [];
  var name = items[1];
  return name;
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