export default function(ctx) {
  var obj = {
    img: new Image(),
    scoretext: function(score) {
      ctx.fillStyle = "#fff";
      ctx.font = "40px arial";
      ctx.fillText(score + "", 10, 40);
    },
    drawLast:function(){
        ctx.drawImage(this.img, 0, 0, 119, 108,window.innerWidth/2-150,window.innerHeight/2-150,300,300);
    },
    lastText :function(){
        ctx.font ="20px arial"
        ctx.fillText("游戏结束",window.innerWidth/2-40,window.innerHeight/2-100)
    },
    lastNumber :function(score){
        ctx.font ="20px arial"
        ctx.fillText('得分'+score,window.innerWidth/2-40,window.innerHeight/2-30);
    },
    button:function(){
        ctx.drawImage(this.img, 120, 6, 39, 24,window.innerWidth/2-60,window.innerHeight/2,120,40);
        ctx.fillText("重新开始",window.innerWidth/2-42,window.innerHeight/2+23)
    }
  };
  obj.img.src = "images/Common.png";

  return obj;
}
