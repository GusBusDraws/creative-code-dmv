const nPixelsRow = 500;
const nPixelsCol = 1500;
const res = 100;
const nRows = nPixelsRow / res;
const nCols = nPixelsCol / res;
const nColors = getRandomInt(2, 7);
const colorRule = getRandomInt(1, nColors + 1);
const palette = generatePalette(nColors, colorRule);

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
  for (let color of palette) {
    console.log(color);
  }
}

function draw() {
  noLoop();
  background(220);
  for (let y = 0; y < nRows; y++) {
    for (let x = 0; x < nCols; x++) {
      let tilePts = [
        x * res, y * res, x * res + res, y * res + res
      ] 
      let color = palette[getRandomInt(0, nColors)];
      noStroke();
      fill(color);
      rect(tilePts[0], tilePts[1], res, res);
      // let val = Math.randow();
      // let color2 = palette[getRandomInt(0, nColors)];
      // fill(color2);
      // switch (true) {
      //   // Fill square with upper left triangle
      //   case val < 0.2:

      // }
    }
  }
}