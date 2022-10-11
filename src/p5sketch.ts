import { Renderer } from "p5";
import P5 from "p5";
import { waveform } from "./main";
let cnv: Renderer;

const parent: HTMLDivElement = document.querySelector("div#p5canvas")!;
const sketch = (p5: P5) => {
  p5.setup = () => {
    cnv = p5.createCanvas(parent.offsetWidth, 100);
    p5.frameRate(30);
  };
  p5.draw = () => {
    p5.strokeWeight(0);
    p5.stroke(255, 20, 200);
    p5.strokeWeight(2);
    p5.background(0, 0, 0, 80);
    p5.beginShape(p5.LINES);
    for (let i = 0; i < p5.width; i++) {
      let currIndex = Math.floor(((i - 0) / (p5.width - 0)) * (1024 - 0) + 0);
      let currVal = p5.map(
        waveform.getValue()[currIndex] * 1.2,
        -1,
        1,
        0,
        p5.height
      );
      p5.vertex(i, currVal);
    }
    p5.endShape();
  };
};

const p5 = new P5(sketch, parent);
