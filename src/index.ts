import { startFunction, stopFunction } from "./main";

const startbtn: HTMLButtonElement = document.querySelector("button#startbtn")!;
const stopbtn: HTMLButtonElement = document.querySelector("button#stopbtn")!;

startbtn?.addEventListener("click", startFunction);
stopbtn?.addEventListener("click", stopFunction);
