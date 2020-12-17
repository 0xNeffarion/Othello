var canvas = document.querySelector('canvas');

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var maxRaio = 25;
const maxBalls = 800;
var circleArray = [];

const corArray = [
  '#594157',
  '#726DA8',
  '#7D8CC4',
  '#A0D2DB',
  '#BEE7E8',
];

const initCircleEvents = function(){
  window.addEventListener('mousemove', function(event){ mouse.x = event.x; mouse.y = event.y; });

  window.addEventListener('resize', function(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      initCircles();
  });
}

const circle = function(x, y, dx, dy, raio){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.raio = raio;
  this.minRaio = raio;
  this.cor = corArray[Math.floor(Math.random() * corArray.length)];

  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.raio, 0, Math.PI * 2, false);
    c.fillStyle = this.cor;
    c.fill();
  }
  this.update = function(){
    if(this.x + this.raio > innerWidth || this.x - this.raio <0){
      this.dx = -this.dx;
    }
    if(this.y + this.raio > innerHeight || this.y - this.raio <0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interação
    if(mouse.x - this.x <50 && mouse.x - this.x >-50 && mouse.y - this.y <50 && mouse.y - this.y>-50){
      if(this.raio < maxRaio){
      this.raio +=1;
      }
    } else if(this.raio > this.minRaio){
      this.raio -=1;
    }


    this.draw();
  }
}



const initCircles = function(){
  circleArray = [];
  for(var i = 0; i < maxBalls; i++){
    var raio = Math.random() * 3 + 1;;
    var x = Math.random() * (innerWidth - raio * 2) + raio;
    var y = Math.random() * (innerHeight - raio * 2) + raio ;
    var dx = (Math.random()-0.5);
    var dy = (Math.random()-0.5);
    circleArray.push(new circle(x, y, dx, dy, raio));
  }
}


const animate = function(){
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, innerHeight);

  for(var i=0; i < circleArray.length; i++){
    circleArray[i].update();
  }

}

const loadCircles = function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  initCircles();
  animate();
  initCircleEvents();
}
