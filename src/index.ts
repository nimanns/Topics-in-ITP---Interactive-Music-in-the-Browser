import { startFunction, stopFunction } from "./main";
import P5 from "p5";
import { sketch } from "./p5sketch";
const startbtn: HTMLButtonElement = document.querySelector("button#startbtn")!;
const stopbtn: HTMLButtonElement = document.querySelector("button#stopbtn")!;

startbtn?.addEventListener("click", startFunction);
stopbtn?.addEventListener("click", stopFunction);

const parent: HTMLDivElement = document.querySelector("div#p5canvas")!;

const p5 = new P5(sketch, parent);
