window.onload = function () {
  let dots = document.getElementsByClassName('control-dot');
  let imgList = [{
    src: "../images/pisa3.jpg",
    introduction: "Pisa4"
  }, {
    src: "../images/pisa4.jpg",
    introduction: "Pisas"
  }, {
    src: "../images/pisa6.jpeg",
    introduction: "Pisa2"
  }]

  let timer;
  let count = 2;
  timer = setInterval(function () {
    changeImages(count);
    if (count == 0) {
      count = 2;
    } else {
      count--;
    }
  }, 1000);

  //给圆点添加点击事件
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function () {
      clearInterval(timer);
      for (let i = 0; i < dots.length; i++) {
        dots[i].id = '';
      }
      dots[i].id = 'selected';
      count = i;
      timer = setInterval(function () {
        changeImages(count);
        if (count == 0) {
          count = 2;
        } else {
          count--;
        }
      }, 1000);
    })
  }

  let changeImages = function (index) {
    let imgsUl = document.getElementsByClassName('pictures-list')[0];
    let imglis = imgsUl.children;
    let newImgs = [];
    for (let i = 0; i < imglis.length; i++) {
      newImgs.push(imglis[i].children[0]);
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].id = '';
    }
    dots[index].id = 'selected';

    if (index + 2 >= imgList.length) {
      newImgs[0].src = imgList[index + 2 - imgList.length].src;
    } else {
      newImgs[0].src = imgList[index + 2].src;
    }
    newImgs[1].src = imgList[index].src;
    if (index + 1 >= imgList.length) {
      newImgs[2].src = imgList[index + 1 - imgList.length].src;
    } else {
      newImgs[2].src = imgList[index + 1].src;
    }

  }


}