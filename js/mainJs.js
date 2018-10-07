window.onload = function() {
  let list = document.getElementsByClassName('nav-list')[0];
  let listChildren = list.children;
  let selected = document.getElementById('selected');
  for (let i = 0; i < listChildren.length; i++) {
    if (listChildren[i].className == 'list') {
      listChildren[i].addEventListener('click', function() {
        selected.id = '';
        listChildren[i].id = 'selected';
        selected = listChildren[i];
        showList();
      })
    } else {
      listChildren[i].addEventListener('click', function() {
        selected.id = '';
        listChildren[i].id = 'selected';
        selected = listChildren[i];
        removeList();
      })
    }
  }
}

let showList = function () {
  let div = document.getElementsByClassName('mylist')[0];
  div.id = '';
};

let removeList = function () {
  let div = document.getElementsByClassName('mylist')[0];
  div.id = 'disapear';
}