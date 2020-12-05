var canvas = document.querySelector('canvas');

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 25;
const maxBalls = 400;
var circleArray = [];

const colorArray = [
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

const circle = function(x, y, dx, dy, radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  this.update = function(){
    if(this.x + this.radius > innerWidth || this.x - this.radius <0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius <0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interação
    if(mouse.x - this.x <50 && mouse.x - this.x >-50 && mouse.y - this.y <50 && mouse.y - this.y>-50){
      if(this.radius < maxRadius){
      this.radius +=1;
      }
    } else if(this.radius > this.minRadius){
      this.radius -=1;
    }


    this.draw();
  }
}



const initCircles = function(){
  circleArray = [];
  for(var i = 0; i < maxBalls; i++){
    var radius = Math.random() * 3 + 1;;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius ;
    var dx = (Math.random()-0.5);
    var dy = (Math.random()-0.5);
    circleArray.push(new circle(x, y, dx, dy, radius));
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
