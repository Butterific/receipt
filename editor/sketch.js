// RECEIPT!
// This is the file to edit. p5.js reference: https://p5js.org/reference/
import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080, // 240–2000 px. Width is fixed by the printer.
  seed: 67,
};

// everything here is editable. play around or rm -rf and see what you come up with!
export function drawReceipt(p) {
  const { width: w, height: h } = p;
  const margin = 24;

  drawButterLabsMark(p, margin, 17);
  dashedLine(p, margin, 64, w - margin, 64, 5, 4);
  drawMissionWindow(p, margin, 80, w - margin * 2, 760);
  drawSignalStrip(p, margin, 856, w - margin * 2);

  dashedLine(p, margin, 918, w - margin, 918, 5, 4);

  const barcodeValue = "receipt.hackclub.com";
  drawBarcode(p, barcodeValue, w / 2, 944);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(10);
  p.text(barcodeValue, w / 2, 1008);
}

function drawButterLabsMark(p, x, y) {
  p.push();
  p.noStroke();
  p.textFont("Arial Rounded MT Bold");
  p.textStyle(p.BOLD);
  p.textAlign(p.LEFT, p.TOP);
  p.textSize(27);
  p.fill(0);
  p.text("ButterLabs", x, y);

  const wordWidth = p.textWidth("ButterLabs");
  p.noFill();
  p.stroke(0);
  p.strokeWeight(1);
  for (let ring = 0; ring < 3; ring += 1) {
    const ringX = x + wordWidth - 18 + ring * 3;
    const ringY = y + 16;
    p.ellipse(ringX, ringY, 30 + ring * 7, 19 + ring * 5);
  }
  p.pop();
}

function drawMissionWindow(p, x, y, width, height) {
  p.push();
  p.noFill();
  p.stroke(0);
  p.strokeWeight(2);
  p.rect(x, y, width, height);
  p.strokeWeight(1);
  p.rect(x + 8, y + 8, width - 16, height - 16);

  for (let tick = 0; tick <= 12; tick += 1) {
    const tickX = x + 22 + (width - 44) * (tick / 12);
    p.line(tickX, y + 8, tickX, y + 16);
    p.line(tickX, y + height - 16, tickX, y + height - 8);
  }
  for (let tick = 0; tick <= 8; tick += 1) {
    const tickY = y + 22 + (height - 44) * (tick / 8);
    p.line(x + 8, tickY, x + 16, tickY);
    p.line(x + width - 16, tickY, x + width - 8, tickY);
  }

  drawGalaxy(p, x + 18, y + 24, width - 36, height - 48);
  p.pop();
}

function drawGalaxy(p, x, y, width, height) {
  p.push();
  p.noStroke();

  for (let i = 0; i < 250; i += 1) {
    const starX = p.random(x, x + width);
    const starY = p.random(y, y + height);
    const size = p.random([1, 1, 1, 2, 2, 3]);
    if (p.random() > 0.91) {
      p.rect(starX - 3, starY, 7, 1);
      p.rect(starX, starY - 3, 1, 7);
    } else {
      p.rect(starX, starY, size, size);
    }
  }

  const centerX = x + width / 2;
  const centerY = y + height * 0.47;
  const radius = Math.min(width * 0.39, height * 0.32);

  p.fill(0);
  for (let arm = 0; arm < 4; arm += 1) {
    const armOffset = (p.TWO_PI * arm) / 4;
    for (let i = 0; i < 220; i += 1) {
      const distance = p.random(24, radius);
      const angle = armOffset + distance * 0.026 + p.randomGaussian() * 0.14;
      const spread = p.randomGaussian() * (5 + distance * 0.045);
      const starX = centerX + Math.cos(angle) * distance + Math.cos(angle + p.HALF_PI) * spread;
      const starY = centerY + Math.sin(angle) * distance + Math.sin(angle + p.HALF_PI) * spread;
      const size = p.random() > 0.9 ? 3 : p.random() > 0.45 ? 2 : 1;
      p.rect(starX, starY, size, size);
    }
  }

  p.noFill();
  p.stroke(0);
  p.strokeWeight(1.5);
  p.ellipse(centerX, centerY, radius * 1.45, radius * 0.46);
  p.ellipse(centerX, centerY, radius * 1.8, radius * 0.72);
  p.ellipse(centerX, centerY, radius * 2.1, radius * 0.98);

  p.noStroke();
  p.fill(255);
  p.ellipse(centerX, centerY, radius * 0.34, radius * 0.2);
  p.fill(0);
  p.ellipse(centerX, centerY, radius * 0.12, radius * 0.12);

  p.pop();
}

function drawSignalStrip(p, x, y, width) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let i = 0; i < 32; i += 1) {
    const barHeight = i % 5 === 0 ? 13 : i % 3 === 0 ? 9 : 5;
    p.line(x + i * (width / 32), y + 13, x + i * (width / 32), y + 13 - barHeight);
  }
}

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1,
    height: 52,
    displayValue: false,
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });
  p.drawingContext.drawImage(barcodeCanvas, Math.floor(centerX - barcodeCanvas.width / 2), y);
}

function dashedLine(p, x1, y1, x2, y2, dash, gap) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = x1; x < x2; x += dash + gap) {
    p.line(x, y1, Math.min(x + dash, x2), y2);
  }
}
