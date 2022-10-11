import {
  start,
  getTransport,
  Sequence,
  FMSynth,
  PolySynth,
  FeedbackDelay,
  Freeverb,
  Filter,
  FeedbackCombFilter,
  NoiseSynth,
  MembraneSynth,
  MonoSynth,
  Waveform,
  Destination
} from "tone";
import { Note } from "tone/build/esm/core/type/NoteUnits";
import { OmniOscillatorType } from "tone/build/esm/source/oscillator/OscillatorInterface";
const synthA = new PolySynth();
const synthB = new NoiseSynth().toDestination();
const synthC = new PolySynth();
const synthE = new FMSynth();
const synthD = new MonoSynth();
const synthF = new MonoSynth();
const synthG = new MonoSynth();

export const waveform = new Waveform();

const kick = new MembraneSynth().toDestination();
const kick2 = new MembraneSynth().toDestination();
const kick3 = new MembraneSynth().toDestination();
const kick4 = new MembraneSynth();
const kick5 = new MembraneSynth().toDestination();

const transport = getTransport();
const slider: HTMLInputElement = document.querySelector("input#sliderone")!;
let sliderValue: number = +slider.value;
const delay1 = new FeedbackDelay(0.2, 0.4);
const delay2 = new FeedbackDelay(0.2, 0.4);
const delay3 = new FeedbackDelay(0.2, 0.4);

const reverb = new Freeverb(0.8).toDestination();
const combFilter = new FeedbackCombFilter(0.2, 0.4).toDestination();
const filter1 = new Filter(500, "lowpass").toDestination();
const filter2 = new Filter(200, "lowpass");
const filter3 = new Filter(200, "lowpass").toDestination();
const filter4 = new Filter(200, "lowpass").toDestination();
const filter5 = new Filter(200, "highpass").toDestination();

document.querySelector("input#sliderone")?.addEventListener("input", () => {
  sliderValue = +slider.value;
  document.body.style.backgroundColor = "#00aa" + sliderValue;
});
transport.bpm.value = 90;
synthA.connect(delay1);
delay1.connect(filter1);
synthC.connect(filter1);
synthA.set({
  envelope: {
    attack: 0.01
  }
});
Destination.connect(waveform);
kick.set({
  envelope: {
    attack: 0.3
  }
});
kick5.set({
  envelope: {
    attack: 0.01
  }
});
kick4.set({ envelope: { attack: 0.3 } });
synthD.connect(filter2);
filter2.connect(reverb);
synthE.connect(delay2);
delay2.connect(filter3);
kick4.connect(delay3);
delay3.connect(combFilter);
synthF.connect(filter4);
synthG.connect(filter5);

new Sequence(
  (time, event: { note1: Note; note2: Note }) => {
    if (sliderValue > 50) {
      synthD.triggerAttackRelease(event["note2"], "8n", time);
      synthD.volume.value = -Math.floor(
        ((sliderValue - 0) / (100 - 0)) * (10 - 100) + 100
      );
    }
  },
  [
    [
      { note1: "C4", note2: "G4" },
      { note1: "D4", note2: "Eb4" },
      { note1: "Eb4", note2: "D4" },
      { note1: "G4", note2: "C4" }
    ],
    [
      { note1: "C5", note2: "G5" },
      { note1: "D5", note2: "Eb5" },
      { note1: "Eb5", note2: "D5" },
      { note1: "G5", note2: "C5" }
    ],
    [
      { note1: "C6", note2: "G4" },
      { note1: "D4", note2: "Eb4" },
      { note1: "Eb4", note2: "D4" },
      { note1: "G4", note2: "C6" }
    ],
    [
      { note1: "Bb3", note2: "G4" },
      { note1: "C4", note2: "F4" },
      { note1: "F4", note2: "C4" },
      { note1: "G4", note2: "Bb3" }
    ],
    [
      { note1: "G3", note2: "G4" },
      { note1: "Bb3", note2: "Eb4" },
      { note1: "Eb4", note2: "Bb3" },
      { note1: "G4", note2: "G3" }
    ],
    [
      { note1: "C5", note2: "G5" },
      { note1: "D5", note2: "Eb5" },
      { note1: "Eb5", note2: "D5" },
      { note1: "G5", note2: "C5" }
    ],
    [
      { note1: "C6", note2: "G4" },
      { note1: "D4", note2: "Eb4" },
      { note1: "Eb4", note2: "D4" },
      { note1: "G4", note2: "C6" }
    ],
    [
      { note1: "Bb3", note2: "G4" },
      { note1: "C4", note2: "F4" },
      { note1: "F4", note2: "C4" },
      { note1: "G4", note2: "Bb3" }
    ]
  ],
  "4n"
).start(0);

new Sequence(
  (time, event: { note1: Note; note2: Note }) => {
    if (sliderValue < 50) {
      delay1.delayTime.rampTo(
        [0.5, 0.333, 0.222, 0.167, 0.667, 0.5, 0.333, 0.222, 0.167, 0.667][
          Math.floor(sliderValue / 6)
        ],
        0.7
      );
      filter1.frequency.rampTo(sliderValue + 10 * 100, 0.5);
      synthA.triggerAttackRelease(event.note1, "16n", time);
      synthA.volume.value = -Math.floor(
        ((sliderValue - 0) / (100 - 0)) * (100 - 20) + 20
      );
      synthC.triggerAttackRelease(event.note2, "16n", time);
      synthC.volume.value = -Math.floor(
        ((sliderValue - 0) / (100 - 0)) * (100 - 20) + 20
      );
    }
  },
  [
    [
      { note1: "C4", note2: "G4" },
      { note1: "D4", note2: "Eb4" },
      { note1: "Eb4", note2: "D4" },
      { note1: "G4", note2: "C4" }
    ],
    [
      { note1: "C5", note2: "G5" },
      { note1: "D5", note2: "Eb5" },
      { note1: "Eb5", note2: "D5" },
      { note1: "G5", note2: "C5" }
    ],
    [
      { note1: "C6", note2: "G4" },
      { note1: "D4", note2: "Eb4" },
      { note1: "Eb4", note2: "D4" },
      { note1: "G4", note2: "C6" }
    ],
    [
      { note1: "Bb3", note2: "G4" },
      { note1: "C4", note2: "F4" },
      { note1: "F4", note2: "C4" },
      { note1: "G4", note2: "Bb3" }
    ],
    [
      { note1: "G3", note2: "G4" },
      { note1: "Bb3", note2: "Eb4" },
      { note1: "Eb4", note2: "Bb3" },
      { note1: "G4", note2: "G3" }
    ],
    [
      { note1: "C5", note2: "G5" },
      { note1: "D5", note2: "Eb5" },
      { note1: "Eb5", note2: "D5" },
      { note1: "G5", note2: "C5" }
    ],
    [
      { note1: "C6", note2: "G4" },
      { note1: "D4", note2: "Eb4" },
      { note1: "Eb4", note2: "D4" },
      { note1: "G4", note2: "C6" }
    ],
    [
      { note1: "Bb3", note2: "G4" },
      { note1: "C4", note2: "F4" },
      { note1: "F4", note2: "C4" },
      { note1: "G4", note2: "Bb3" }
    ]
  ],
  "4n"
).start(0);

new Sequence(
  (time, event) => {
    synthE.triggerAttackRelease(event, "4n", time);
    delay2.delayTime.rampTo(
      Math.abs(sliderValue / 100 + Math.random() - 1),
      0.9
    );
    synthE.volume.value = -Math.abs(
      Math.floor(((sliderValue - 0) / (100 - 0)) * (50 - -50) + -50)
    );
  },
  ["C2", "C4", "C5", "C3", ["Eb3", "Eb4", "Eb1"]],
  "4n"
).start(0);

new Sequence(
  (time, event) => {
    if (sliderValue < 50) {
      synthB.triggerAttackRelease("4n", time);
      synthB.volume.value = -Math.floor(
        ((sliderValue - 0) / (100 - 0)) * (100 - 30) + 30
      );
    }
  },
  [
    ["C2", "C2"],
    ["C2", "C2"],
    ["C2", "C2"],
    ["C2", "C2", "C1", "C1", "C3", "C3"],
    ["C2", "C2"],
    ["C2", "C2"],
    ["C2", "C2"],
    ["C2", "C2", "C2"]
  ],
  "4n"
).start(0);

new Sequence(
  (time, event) => {
    if (sliderValue >= 20 && sliderValue <= 70) {
      synthF.triggerAttackRelease(event, "8n", time);
      synthF.volume.value = -Math.abs(
        Math.floor(((sliderValue - 0) / (100 - 0)) * (50 - -50) + -50)
      );
      filter4.frequency.value =
        Math.floor(((sliderValue - 0) / (100 - 0)) * (50 - -50) + -50) + 200;
    }
  },
  [
    ["C4", "Eb4", "G4"],
    ["C4", "Eb4", "G4"],
    ["C4", "Eb4", "G4"],
    ["C4", "Eb4", "G4"],
    ["C4", "Eb4", "G4"],
    ["C4", "Eb4", "G4"],
    ["C4", "Eb4", "G4"],
    ["C4", "F4", "Ab4"],
    ["C4", "F4", "Ab4"],
    ["C4", "F4", "Ab4"],
    ["C4", "F4", "Ab4"],
    ["C4", "F4", "Ab4"],
    ["C4", "G4", "A4", ["C5", "G5", "C6"]]
  ],

  "8n"
).start(0);

new Sequence(
  (time, event) => {
    if (sliderValue >= 20 && sliderValue <= 70) {
      synthG.triggerAttackRelease(event, "8n", time);
      synthG.volume.value =
        -Math.abs(
          Math.floor(((sliderValue - 0) / (100 - 0)) * (50 - -50) + -50)
        ) > -35
          ? -35
          : -Math.abs(
              Math.floor(((sliderValue - 0) / (100 - 0)) * (50 - -50) + -50)
            );
      const oscType: OmniOscillatorType[] = ["fmtriangle5", "square22"];
      synthG.oscillator.type =
        oscType[Math.floor(Math.random() * (1 - 0 + 1) + 0)];

      synthG.oscillator.spread = Math.random() * 10;
      filter5.frequency.value =
        Math.floor(((sliderValue - 0) / (100 - 0)) * (50 - -50) + -50) + 1000;
    }
  },
  [
    [
      [
        "G5",
        "Eb4",
        "C4",
        "G4",
        "Eb3",
        "C3",
        "G3",
        "C2",
        "G2",
        "Eb1",
        "C1",
        "Eb4"
      ]
    ]
  ],

  "2n."
).start(0);

new Sequence(
  (time, event) => {
    if (sliderValue < 50) {
      kick.triggerAttackRelease(event, "8n", time);
      kick.volume.value = -Math.floor(
        ((sliderValue - 0) / (100 - 0)) * (100 - 10) + 10
      );
    }
  },
  [["C1", "C1"], ["C1", "C1", "C1"], ["C1", "C1"], "C1"],
  "4n"
).start(0);

new Sequence(
  (time, note) => {
    kick2.triggerAttack(note, time);
    kick2.volume.value = -Math.floor(
      ((sliderValue - 0) / (100 - 0)) * (10 - 100) + 100
    );
  },
  [
    ["C1", "C2", "C1", "C2"],
    ["C1", "C2", "C1", "C2", "B1", "B1"]
  ],
  "2n"
).start(0);

new Sequence(
  (time, note) => {
    kick3.triggerAttack(note, time);
    kick3.volume.value = -Math.floor(
      ((sliderValue - 0) / (100 - 0)) * (10 - 100) + 100
    );
  },
  [["C1", "C1", "C1"]],
  "2n"
).start(0);

new Sequence(
  (time, event) => {
    kick4.triggerAttack(event, time);
    combFilter.delayTime.value = Math.abs(sliderValue / 100);
    kick4.volume.value = -Math.abs(
      Math.floor(((sliderValue - 0) / (100 - 0)) * (50 - -50) + -50)
    );
  },
  ["C2", "C1", "C1", "C1"],
  "2n"
).start(0);

new Sequence(
  (time, event) => {
    if (sliderValue >= 10) {
      kick5.triggerAttackRelease(event, "8n", time);
      kick5.volume.value = -Math.abs(
        Math.floor(((sliderValue - 0) / (100 - 0)) * (50 - -50) + -50)
      );
    }
  },
  ["C1", "C1", "C1", "C1", "C1", "C1", "C1", ["C1", "C1", "C1"]],
  "8n"
).start(0);

export const startFunction = async () => {
  await start();
  transport.start();
};

export const stopFunction = () => {
  transport.stop();
};
