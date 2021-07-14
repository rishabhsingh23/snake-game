var canvas=document.getElementById("snake");
var ctx=canvas.getContext("2d");

//console.log(canvas);
const grid_size=32;
var g=document.getElementById("img");

const foodImg=new Image();
foodImg.src="beer1.jpg";

let snake=[];
 snake[0]={
  x : 9*grid_size,
  y : 10*grid_size
 };

 let beer = {
   x: Math.floor(Math.random()*17+1)*grid_size,
   y: Math.floor(Math.random()*15+1)*grid_size,
 }
 let delta;
 document.addEventListener("keydown", (e)=>{
  console.log(e);
   let k=e.keyCode;
   if(k==37 && delta!="right")
   delta="left";
   else if(k==38 && delta!="down")
   delta="up";
   else if(k==39 && delta!="left")
   delta="right";
   else if(k==40 && delta!="up")
   delta="down";
   console.log(delta);
 })

 function collision(head,array){
   for(var i=0;i<array.length;i++){
     if(head.x==array[i].x && head.y==array[i].y)
     return true;
   }
   return false;
 }

  function draw() {
    ctx.drawImage(g,0,0);
    for(i=0;i<snake.length;i++){
      ctx.fillStyle = (i==0)? "green" : "yellow";
      ctx.fillRect(snake[i].x,snake[i].y,grid_size,grid_size);
      ctx.strokeStyle= "white";
      ctx.strokeRect(snake[i].x,snake[i].y,grid_size,grid_size);

    }

    ctx.drawImage(foodImg,beer.x,beer.y);
    let snakex=snake[0].x;
    let snakey=snake[0].y;
    if(delta=="left")snakex-=grid_size;
    if(delta=="up")snakey-=grid_size;
    if(delta=="right")snakex+=grid_size;
    if(delta=="down")snakey+=grid_size;

   if(snakex==beer.x && snakey==beer.y){
     beer = {
       x: Math.floor(Math.random()*17+1)*grid_size,
       y: Math.floor(Math.random()*15+1)*grid_size,
     }
   }
   else {
     snake.pop();
   }

   let newpos={
     x:snakex,
     y:snakey
   };

   if(snakex<grid_size || snakex>17*grid_size || snakey<grid_size || snakey>15*grid_size || collision(newpos,snake)){
     clearInterval(game);
   }

   snake.unshift(newpos);
  }

  var game=setInterval(draw,100);
