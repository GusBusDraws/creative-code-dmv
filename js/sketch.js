const nPixelsRow = 500;
const nPixelsCol = 500;
const res = 100;
const nRows = nPixelsRow / res;
const nCols = nPixelsCol / res;
const nColors = getRandomInt(2, 7);
const colorRule = getRandomInt(1, nColors + 1);
const palette = generatePalette(nColors, colorRule);
let textMask = 'DC';
// let textMask = undefined;

function getRandomInt(min, max, allowZero = true) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  result = Math.floor(Math.random() * (max - min) + min); 
  if (!allowZero && result === 0) {
    result = getRandomInt(min, max, allowZero)
  }
  return result;
}

function generatePalette(
  nColors, colorRule, sRange = [50, 75], bRange = [75, 90]
) {
  let colors = new Array(nColors);
  let s = getRandomInt(sRange[0], sRange[1]);
  let b = getRandomInt(sRange[0], sRange[1]);
  let hOffset = getRandomInt(0, 360);
  for (let i = 0; i < nColors; i++) {
    // When there are more colors than the color rule, hue must be repeated with different saturation and brightness
    if (nColors > colorRule && i > colorRule) {
      // hIdx will be the index of the color which will have a repeated hue
      let hIdx = getRandomInt(0, colorRule);
      // sDelta is the change to the saturation. Either increase or decrease by 10, 20, or 30
      let sDelta = 20 * getRandomInt(-2, 3, false);
      // bDelta is the change to the saturation. Either increase or decrease by 10, 20, or 30
      let bDelta = 20 * getRandomInt(-2, 3, false);
      // 
      colors[i] = [colors[hIdx][0], s + sDelta, b + bDelta];
    } else {
      let h = (hOffset + i * Math.floor(360 / nColors)) % 360;
      colors[i] = [h, s, b];
    }
  }
  return colors;
}

function setup() {
  createCanvas(nPixelsCol, nPixelsRow);
  colorMode(HSB, 360, 100, 100);
  console.log(palette);
}

function draw() {
  noLoop();
  if (textMask) {
    textFont('Arial')
    textSize(0.7 * height);
    // fill.apply(null, palette[0]);
    textAlign(CENTER, CENTER);
    text(textMask, Math.floor(width / 2), Math.floor(height / 2));
    drawingContext.clip();
  }
  fill(180, 100, 100);
  rect(0, 0, width, height);
  // for (let y = 0; y < nRows; y++) {
  //   for (let x = 0; x < nCols; x++) {
  //     // Points around the tile moving clockwise starting at top left
  //     let tilePtsX = [x * res, x * res + res, x * res + res, x * res];
  //     let tilePtsY = [y * res, y * res, y * res + res, y * res + res]; 
  //     // Get color for tile square
  //     let color = palette[getRandomInt(0, nColors)];
  //     noStroke();
  //     fill(color);
  //     // Draw tile
  //     rect(tilePtsX[0], tilePtsY[0], res, res);
  //     // Get value that will decide if another shape is drawn on tile
  //     let caseVal = Math.random();
  //     // Choose color for additional shape
  //     let color2 = palette[getRandomInt(0, nColors)];
  //     fill(color2);
  //     if (caseVal < 0.2) {
  //       // Create array to hold triangle points (x & y)
  //       let triPts = [];
  //       // Pick a number that represents the tile corner to start the triangle (0 - 3 clockwise, 0 = top left) & determine the orientation of the triangle drawn
  //       let triStartPt = getRandomInt(0, 4);
  //       for (let i = 0; i < 3; i++) {
  //         // Modulus operator makes any number above 3 (max index of tilePtsX and tilePtsY) wrap back around to 0 for when triStartPt is not 0 or 1
  //         triPts.push(tilePtsX[(triStartPt + i) % 4]);
  //         triPts.push(tilePtsY[(triStartPt + i) % 4]);
  //       }
  //       triangle.apply(null, triPts);
  //     }
  //   }
  // }
}
