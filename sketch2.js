/* 
global createCanvas, stroke, triangle, rect, noFill, windowWidth, windowHeight, colorMode, HSL, textSize, text, random, background, fill, ellipse, mouseX, mouseY, collideCircleCircle, width, height, color, abs, noStroke, sqrt, PI
*/
// List all p5 methods you plan to use in the global so that Glitch can recognize them.


function setup() {
  createCanvas(600, 500);
  noStroke();
}

function draw() {
  background(220)
 
  
  fill(200,0,0)
  rect(150, 200, 300, 300)
  triangle(150, 200, 450, 200, 300, 50)
  
  fill(220)
  rect(250, 350, 100, 150)
}

