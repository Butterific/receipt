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

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textStyle(p.BOLD);
  p.textAlign(p.LEFT, p.TOP);
  p.textSize(11);
  p.text("BUTTERLABS / ORBITAL SYSTEMS", margin, 24);
  p.textAlign(p.RIGHT, p.TOP);
  p.text("REC-067", w - margin, 24);

  p.textStyle(p.NORMAL);
  p.textSize(9);
  p.textAlign(p.LEFT, p.TOP);
  p.text("FIELD RECEIPT", margin, 48);
  p.textAlign(p.RIGHT, p.TOP);
  p.text("STATUS: TRANSMISSION ACQUIRED", w - margin, 48);

  dashedLine(p, margin, 70, w - margin, 70, 5, 4);
  drawTelemetry(p, margin, 88, w - margin * 2);
  drawMissionWindow(p, margin, 166, w - margin * 2, 650);
  drawSignalStrip(p, margin, 840, w - margin * 2);

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

function drawTelemetry(p, x, y, width) {
  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textSize(8);
  p.textAlign(p.LEFT, p.TOP);
  p.text("ORIGIN", x, y);
  p.text("EARTH / 37.7749 N", x, y + 15);
  p.text("VECTOR", x + width * 0.43, y);
  p.text("OUTBOUND / 01.00", x + width * 0.43, y + 15);
  p.textAlign(p.RIGHT, p.TOP);
  p.text("SEED", x + width, y);
  p.text("000067", x + width, y + 15);
  p.text("INK / THERMAL", x + width, y + 30);
  p.textAlign(p.LEFT, p.TOP);
  p.text("DESTINATION  UNKNOWN", x, y + 30);
}

function drawMissionWindow(p, x, y, width, height) {
  p.push();
  p.noFill();
  p.stroke(0);
  p.strokeWeight(2);
  p.rect(x, y, width, height);
  p.strokeWeight(1);
  p.rect(x + 8, y + 8, width - 16, height - 16);

  // Tiny instrument ticks make the large empty field feel like a real scope.
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
  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textSize(8);
  p.textAlign(p.LEFT, p.TOP);
  p.text("SCOPE 01", x + 18, y + 18);
  p.textAlign(p.RIGHT, p.TOP);
  p.text("LIVE", x + width - 18, y + 18);
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

  p.fill(255);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textSize(9);
  p.text("DEEP SPACE / SIGNAL FOUND", centerX, y + height - 22);
  p.pop();
}

function drawSignalStrip(p, x, y, width) {
  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textStyle(p.BOLD);
  p.textSize(9);
  p.textAlign(p.LEFT, p.TOP);
  p.text("SIGNAL STRENGTH", x, y);
  p.textAlign(p.RIGHT, p.TOP);
  p.text("98.7%", x + width, y);

  p.stroke(0);
  p.strokeWeight(2);
  for (let i = 0; i < 32; i += 1) {
    const barHeight = i % 5 === 0 ? 13 : i % 3 === 0 ? 9 : 5;
    p.line(x + i * (width / 32), y + 24, x + i * (width / 32), y + 24 - barHeight);
  }
  p.noStroke();
  p.textStyle(p.NORMAL);
  p.textSize(8);
  p.textAlign(p.LEFT, p.TOP);
  p.text("THE VOID RESPONDED", x, y + 42);
  p.textAlign(p.RIGHT, p.TOP);
  p.text("THANK YOU FOR LOOKING UP", x + width, y + 42);
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
  // Draw directly on p5's canvas: p.image expects a p5 image wrapper, while
  // JsBarcode returns a regular browser canvas.
  p.drawingContext.drawImage(barcodeCanvas, Math.floor(centerX - barcodeCanvas.width / 2), y);
}

function dashedLine(p, x1, y1, x2, y2, dash, gap) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = x1; x < x2; x += dash + gap) {
    p.line(x, y1, Math.min(x + dash, x2), y2);
  }
}
