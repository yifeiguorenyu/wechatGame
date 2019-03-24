import "./js/component/weapp-adapter.js";
import Audio from "./js/component/audio";
import Background from "./js/component/background.js";
import Plan from "./js/component/plan.js";
import Bullet from "./js/component/bullet";
import Enemy from "./js/component/enemy.js";
import Animation from "./js/component/animation";
import Score from "./js/component/score"

var ctx = canvas.getContext("2d");
var background = Background(ctx); //画背景
var width = window.innerWidth;
var height = window.innerHeight;

Audio(); //背景音乐
var plane = Plan(ctx); //画飞机
plane.move();
var bullet; //画子弹
var bulletArr = [];
var enemy = null; //画敌机
var enemyArr = [];

var animation = null; //画爆炸
var animationArr = [];

var boomimg = null; //爆炸图片
var boomarr = [];
for (var i = 1; i < 20; i++) {
  var src = "./images/explosion";
  boomimg = new Image();
  boomimg.src = src + i + ".png";
  boomarr.push(boomimg);
}


var score =0
var scoreObj =Score(ctx)

setInterval(function() {
  //500ms 画一颗子弹
  bullet = Bullet(ctx, plane.x, plane.y, plane.imgwidth);
  bulletArr.push(bullet);
}, 500);
setInterval(function() {
  //一秒画一个敌机
  enemy = Enemy(ctx);
  enemyArr.push(enemy);
}, 1000);

 render();
var top = 0;
function render() {
  top++;
  if (top == window.innerHeight) {
    top = 0;
  }
  requestAnimationFrame(function() {
    ctx.clearRect(0, 0, width, height);
    //绘制背景图
    background.move(top);
    //绘制子弹
    bulletArr = bulletArr.filter(function(item) {
      return item.isshow;
    });
    bulletArr.forEach(item => {
      item.drawBullet();
      if (!item.isshow) {
        bulletArr.rem;
      }
    });

    //绘制飞机
    plane.drawPlane();

    //绘制分数
    scoreObj.scoretext(score)
    //绘制敌机
    enemyArr = enemyArr.filter(function(item) {
      return item.isshow;
    });

    enemyArr.forEach(item => {
      plane.isBang(item);
      item.drawEnemy();
      for (var i = 0; i < bulletArr.length; i++) {
        var bulletbollean = item.isbang(bulletArr[i]);
        if (bulletbollean) {
            score++//分数加
          bulletArr[i].isshow = false; //子弹消失

          //收集当前需要爆炸的个数
          animation = Animation(ctx, bulletArr[i].x, bulletArr[i].y); //画爆炸
          animationArr.push(animation);
        }
      }
    });
    //画分数
 

    //循序爆炸
    animationArr = animationArr.filter(function(item) {
      return item.isshow;
    });
    animationArr.forEach(item => {
      item.drawboom(boomarr);
    });
    if(plane.isRender){
        render();
    }else{
        scoreObj.drawLast()
        scoreObj.lastText()
        scoreObj.lastNumber(score)
        scoreObj.button()
    }
   
  });
}
