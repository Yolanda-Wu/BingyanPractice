let getPisaName = function() {
  var str = window.location.search;

  var items = str.length ? str.split('=') : [];
  var name = items[1];
  return name;
}