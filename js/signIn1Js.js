window.onload = function () {
      let dots = document.getElementsByClassName('control-dot');
      let imgList = [{
        src: "../images/pisa4.jpg",
        introduction: "Pisa4"
      }, {
        src: "../images/main_picture.jpg",
        introduction: "Pisas"
      }, {
        src: "../images/pisa2.jpg",
        introduction: "Pisa2"
      }]

      let changeImages = function(index) {
        let img = document.getElementsByClassName('image')[0];
        for (let i = index; i < imgList.length; i++) {
          setTimeout(function() {
            img.src = imgList[i].src;
            console.log(i);
          }, 1000*30);
        }
      }

      changeImages(0);
    }