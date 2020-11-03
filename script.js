/* 
global createCanvas, stroke, noFill, windowWidth, windowHeight, colorMode, HSL, textSize, text, random, background, fill, ellipse, mouseX, mouseY, collideCircleCircle, width, height, color, abs, noStroke, sqrt, PI
*/

let myColor, myRadius, showPlayerDot, backgroundShade, message, showText, textColor, sizeOfText;
let dots, numberOfDots, colorOfDots, minRadius, maxRadius, minSpeed, maxSpeed;
let jitterAmplitude, colorCycleSpeed, rateOfInflation, lightness, saturation;

function dashboard() {
  // Background Settings
  backgroundShade = 80 // 0: black, 100: white
  // Settings for the dots
  numberOfDots = 1
  minRadius = 5
  maxRadius = 20
  minSpeed = 0.5 
  maxSpeed = 3
  // Advanced Settings for the dots
  jitterAmplitude = 2
  colorCycleSpeed = 0.8
  rateOfInflation = 0.1 
  saturation = 80
  lightness = 70
  // settings for the player
  myColor = random(360);
  myRadius = 15;
  showPlayerDot = false;
  // General Settings
  message = "Welcome to My Project"
  textColor = 120 // 0: red, 120: green, 240: blue, 360: red again
  sizeOfText = 30
  showText = true;
}

function takeAction(dot) {
  dot.display();
  dot.bounce();
  dot.move();
  // dot.puff();
  // dot.jitter();
  // dot.chameleon();
  // dot.getEatenIfNearMouse();
}


//// ===== Feel free to explore beyond this space, but please know ======
///        that changes below this line could code-breaking changes 


function setup() {
  dashboard()
  createCanvas(windowWidth, windowHeight - 20);
  colorMode(HSL, 360, 100, 100);
  dots = [];
  for (let i = 0; i < numberOfDots; i++) {
    dots.push(new bouncyBall());
  }
}

function draw() {
  background(220, 0, backgroundShade);
  dots.forEach(dot => {
    takeAction(dot)
  });
  if (showPlayerDot) {
    fill(myColor, saturation, lightness);
    ellipse(mouseX, mouseY, myRadius * 2);
  }
  if (showText) {
    textSize(sizeOfText)
    fill(textColor, saturation, lightness)
    text(message, 20, 20)
  } 
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
    // If you want to replace the dots with another shape, here's the place to do it. 
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
