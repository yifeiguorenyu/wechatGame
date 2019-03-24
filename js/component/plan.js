export default function(ctx) {
  var obj = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    x: 0,
    y: 0,
    isMove: false,
    imgwidth: 80,
    imgheight: 80,
    planeImage: new Image(),
    isRender:true,
    drawPlane: function() {
      ctx.drawImage(
        this.planeImage,
        0,
        0,
        this.planeImage.width,
        this.planeImage.height,
        this.x,
        this.y,
        this.imgwidth,
        this.imgheight
      );
    },
    move: function() {
      canvas.addEventListener("touchstart", function(e) {
        var clientX = e.changedTouches[0].clientX;
        var clientY = e.changedTouches[0].clientY;
        if (
          clientX > obj.x &&
          clientX < obj.x + obj.imgwidth &&
          clientY > obj.y &&
          clientY < obj.y + obj.imgheight
        ) {
          obj.isMove = true;
        }
      });
      canvas.addEventListener("touchmove", function(e) {
          e.preventDefault();
          
        var clientX = e.changedTouches[0].clientX;
        var clientY = e.changedTouches[0].clientY;
        if(obj.isMove){ //范围检测
            obj.x = clientX;
            obj.y = clientY;
            if (obj.x - obj.imgwidth / 2 < 0) {
              obj.x = 0;
            } else if (obj.x - obj.imgwidth / 2 > obj.screenWidth - obj.imgwidth) {
              obj.x = obj.screenWidth - obj.imgwidth;
            } else {
              obj.x = obj.x - obj.imgwidth / 2;
            }
            if (obj.y - obj.imgheight / 2 < 0) {
              obj.y = 0;
            } else if (
              obj.y - obj.imgheight / 2 >
              obj.screenHeight - obj.imgheight
            ) {
              obj.y = obj.screenHeight - obj.imgheight;
            } else {
              obj.y = obj.y - obj.imgheight / 2;
            }
        }
       
      });
      canvas.addEventListener("touchend", function() {
        obj.isMove = false;
      });
    },
    isBang:function(enemy){
       var centerx =enemy.x+enemy.imgWidth/2
       var centery = enemy.y+enemy.imgHeight/2
       if(centerx>obj.x&&centerx<(obj.x+obj.imgwidth)&&centery>obj.y&&centery<(obj.y+obj.imgwidth)){
         this.isRender = false
       }
    }
  };
  obj.planeImage.src = "./images/hero.png";
  obj.planeImage.width = 186;
  obj.planeImage.height = 130;

  obj.x = obj.screenWidth / 2 - obj.imgwidth / 2;
  obj.y = obj.screenHeight - obj.imgheight - 30;
  return obj;
}
