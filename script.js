/* 
global createCanvas, windowWidth, windowHeight, colorMode, HSL, random, background, fill, ellipse, mouseX, mouseY, collideCircleCircle, width, height, color, abs, noStroke, sqrt, PI
*/

let myColor, myRadius, backgroundShade;
let dots, numberOfDots, colorOfDots, minRadius, maxRadius, minSpeed, maxSpeed;
let jitterAmplitude, colorCycleSpeed, rateOfInflation, lightness, saturation;


function setup() {
  //// ==== YOUR DASHBOARD ==== ////
  backgroundShade = 80 // 0: black, 100: white
  numberOfDots = 10
  minRadius = 5
  maxRadius = 20
  minSpeed = 0.5 
  maxSpeed = 3
  jitterAmplitude = 0
  colorCycleSpeed = 0.8
  rateOfInflation = 0.1 
  saturation = 80
  lightness = 70
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
  background(220, 0, backgroundShade);
  dots.forEach(dot => {
    dot.display();
    dot.bounce();
    dot.move();
    dot.puff();
    dot.jitter();
    dot.chameleon();
    // dot.getEatenIfNearMouse();
  });
  
  fill(myColor, 80, 70);
  ellipse(mouseX, mouseY, myRadius * 2);
}

class bouncyBall {
  constructor(color = random(360)) {
    // Core features
    this.x = random(width);
    this.y = random(height);
    this.r = random(minRadius, maxRadius);
    // For color
    this.color = color
    // For puff & deflate
    this.maxR = maxRadius;
    this.minR = minRadius;
    this.growthDirection = random([1, -1]);
    this.growthRate = rateOfInflation
    // To set constraints on speed
    this.masterXvelocity = random(0.5, 3);
    this.masterYvelocity = random(0.5, 3);
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
    // To randomize direction
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
  
  jitter() {
    this.x += random(-1 * jitterAmplitude, jitterAmplitude)
    this.y += random(-1 * jitterAmplitude, jitterAmplitude)
  }
  
  puff() {
    if (this.r > this.maxR) {
      this.growthDirection = -1 * abs(this.growthDirection);
    } else if (this.r < this.minR) {
      this.growthDirection = abs(this.growthDirection);
    }
    this.r += this.growthDirection * this.growthRate;
  }
  
  chameleon() {
    this.color = (this.color + colorCycleSpeed) % 360;
  }

  getEatenIfNearMouse() {
    let collision = collideCircleCircle(
        this.x,
        this.y,
        this.r * 2,
        mouseX,
        mouseY,
        myRadius * 2
      )
    if (collision) {
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
