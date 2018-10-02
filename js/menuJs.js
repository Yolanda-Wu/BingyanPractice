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