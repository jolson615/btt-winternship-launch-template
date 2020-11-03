/* 
global createCanvas, windowWidth, windowHeight, colorMode, HSL, random, background, fill, ellipse, mouseX, mouseY, collideCircleCircle, width, height, abs, noStroke, sqrt, PI
*/

let dots, myColor, myRadius, numberOfDots, colorOfDots 

// The setup function lets us control what we want to be true at the start of our project. 
function setup() {
  //// ==== YOUR DASHBOARD ==== ////
  numberOfDots = 20
  //colorOfDots = 
  
  //// ===== END DASHBOARD ==== ////
  
  
  
  // Let's also set up the canvas
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSL, 360, 100, 100);
  
  // This array and for loop let us create the objects we'll use in our sketch. 
  dots = [];
  for (let i = 0; i < numberOfDots; i++) {
    dots.push(new bouncyBall());
  }
  
  //
  myColor = random(360);
  myRadius = 15;
}

function draw() {
  background(220, 0, 80);
  dots.forEach(dot => {
    dot.display();
    dot.bounce();
    dot.move();
    dot.puff();
    dot.jitter(3);
    dot.cycleColor();
    dot.checkCollision();
  });
  
  fill(myColor, 80, 70);
  ellipse(mouseX, mouseY, myRadius * 2);
}

class bouncyBall {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = random(5, 12);
    this.maxR = 20;
    this.minR = 5;
    this.growthDirection = 1;
    this.growthRate = 0.1;
    this.color = random(360);
    this.masterXvelocity = random(0.5, 3);
    this.masterYvelocity = random(0.5, 3);
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
    if (random(-1, 1) > 0) {
      this.xVelocity = this.xVelocity * -1;
    }
    if (random(-1, 1) > 0) {
      this.yVelocity = this.yVelocity * -1;
    }
  }

  move() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
  
  bounce() {
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  display() {
    fill(this.color, 80, 70);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
  
  jitter(amount = 1) {
    this.x += random(-1 * amount, amount)
    this.y += random(-1 * amount, amount)
  }
  
  puff() {
    if (random(0, 1) < 0.05) {
      this.growthDirection = this.growthDirection * -1;
    }
    if (this.r > this.maxR) {
      this.growthDirection = -1 * abs(this.growthDirection);
    } else if (this.r < this.minR) {
      this.growthDirection = abs(this.growthDirection);
    }
    this.r += this.growthDirection * this.growthRate;
  }
  
  cycleColor() {
    this.color = (this.color + random(0, 1.2)) % 360;
  }

  checkCollision() {
    if (
      collideCircleCircle(
        this.x,
        this.y,
        this.r * 2,
        mouseX,
        mouseY,
        myRadius * 2
      )
    ) {
      // Code to sum AREA, not radii
      let myArea = myRadius ** 2 * PI;
      let smallArea = this.r ** 2 * PI;
      let newArea = myArea + smallArea;
      let newRadius = sqrt(newArea / PI);
      myRadius = newRadius;
      let averageColor = (myColor * myArea + this.color * smallArea) / newArea;
      myColor = averageColor;
      dots.splice(dots.indexOf(this), 1);
      console.log(myColor);
    }
  }
}
