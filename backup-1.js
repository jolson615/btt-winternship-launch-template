// Whenever you have working code, back it up by copying it here!

/* 
global createCanvas, stroke, triangle, rect, noFill, windowWidth, windowHeight, colorMode, HSL, textSize, text, random, background, fill, ellipse, mouseX, mouseY, collideCircleCircle, width, height, color, abs, noStroke, sqrt, PI
*/
// List all p5 methods you plan to use in the global so that Glitch can recognize them.


function setup() {
  createCanvas(600, 500); // Sizes the canvas, making width = 600 and height = 500
  noStroke(); // Setting to draw our shapes without outlines
}

function draw() {
  background(220); // Paints the canvas a nice, neutral grey
  
  // Blue-ish circle code
  fill(0, 190, 240)
  ellipse(50, 50, 50, 50)
  //      x    y   w   h
  
  // Purplish circle code
  fill(90, 0, 222)
  ellipse(550, 50, 50)
  //      x    y   w&h


}

