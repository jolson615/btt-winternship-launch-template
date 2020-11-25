/* 
global createCanvas, round, stroke, triangle, rect, noFill, windowWidth, windowHeight, colorMode, HSL, textSize, text, random, background, fill, ellipse, mouseX, mouseY, collideCircleCircle, width, height, color, abs, noStroke, sqrt, PI
*/
// List all p5 methods you plan to use in the global so that Glitch can recognize them.

// Group 2 member names: 

function setup() {
  createCanvas(600, 500); // Sizes the canvas, making width = 600 and height = 500
  noStroke(); // Setting to draw our shapes without outlines
}

function draw() {
  background(220); // Paints the canvas a nice, neutral grey
  // Shows mouse position, just to be helpful.
  fill(0, 0, 0) // Change color to black for text
  text(`x: ${round(mouseX)}, y: ${round(mouseY)}`, 10, 10) 
  
  // Blue-ish circle code
  fill(0, 190, 240)
  ellipse(50, 50, 50, 50)
  
  // Purplish circle code
  fill(90, 0, 222)
  ellipse(550, 50, 50)
}

