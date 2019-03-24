export default function(ctx) {
  var obj = {
    img: new Image(),
    x: 0,
    y: -60,
    imgWidth: 60,
    imgHeight: 60,
    isshow: true,
    drawEnemy: function() {
      this.y += 5;
      if (this.y > window.innerHeight) {
        this.isshow = false;
      }
      ctx.drawImage(
        obj.img,
        0,
        0,
        this.img.width,
        this.img.height,
        this.x,
        this.y,
        this.imgWidth,
        this.imgHeight
      );
    },
    isbang:function(bullet){
        var centerx =bullet.x+bullet.imgWidth/2
        var centery = bullet.y+bullet.imgHeight/2
        if(centerx>this.x&&(centerx<this.x+this.imgWidth)&&centery>this.y&&centery<(this.y+this.imgHeight)&&this.y>30){
           this.isshow =false
           return true
        }
    }
  };
  obj.img.src = "images/enemy.png";
  obj.img.width = 120;
  obj.img.height = 79;
  obj.x = Math.random() * (window.innerWidth - obj.imgWidth);
  return obj;
}
