const duck = document.querySelector("#pixel-duck");
const palette = {
  X: "#533e25",
  Y: "#ffd044",
  L: "#ffe687",
  S: "#efad29",
  W: "#fff1b1",
  O: "#f28a36",
  B: "#dd662c",
  E: "#332e25",
  C: "#f5a342",
};

const pixels = [
  "..................................",
  "................XXXXXXX...........",
  "..............XXYYYYYYYXX.........",
  ".............XYYLLLLLLYYYX........",
  "............XYYLLWWLLLYYYX........",
  "............XYLLWWLLLLYYYYX.......",
  "...........XYYLLLLLLLLYYYYYX......",
  "...........XYLLLLLLLLYYEEYYX......",
  "...........XYLLLLLLLLYYEWYYX......",
  "...........XYYLLLLLLLYYYYYYXXXXX..",
  "...........XYYYLLLLLYYCYYYYXOOOOX.",
  "............XYYYYYYYYCCYYYXOOOOOX.",
  "............XYYYYYYYYYYYYYXBBBBX..",
  "..XX........XYYYYYYYYYYYYXXXXXX...",
  ".XLYX......XYYYYYYYYYYYXX.........",
  ".XLLYX....XYYYYYYYYYYYYX..........",
  ".XYLLYXXXXYYYYYYYYYYYYYYX.........",
  ".XYYLLYYYYYYYYYYYYYYYYYYYX........",
  "..XYYLLLLYYYYYYYYYYYYYYYYX........",
  "..XYYYLLLLLYYYYYYYYYYYYYYX........",
  "...XYYYLLLLLYYXXXXXYYYYYYX........",
  "...XYYYYLLLYYXSSSSSXXYYYX........",
  "....XYYYYYYYYYXXSSSSSXYYX........",
  "....XYYYYYYYYYYYXXXXXYYYX........",
  ".....XYYYYYYYYYYYYYYYYYX.........",
  "......XSSYYYYYYYYYYYYXX..........",
  ".......XXSSSSYYYYSSXX............",
  ".........XXXXXXXXXX..............",
  "..................................",
  "..................................",
];

const fragment = document.createDocumentFragment();
pixels.forEach((row, y) => {
  [...row].forEach((pixel, x) => {
    if (!palette[pixel]) return;
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", 1);
    rect.setAttribute("height", 1);
    rect.setAttribute("fill", palette[pixel]);
    fragment.append(rect);
  });
});
duck.append(fragment);

const duckButton = document.querySelector(".duck-rise");
let audioContext;
let quackBuffer;
let quackOffset = 0;

async function loadQuack() {
  if (quackBuffer) return;
  audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
  const response = await fetch("quack.mp3");
  const arrayBuffer = await response.arrayBuffer();
  quackBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const samples = quackBuffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) {
    if (Math.abs(samples[i]) > 0.02) {
      quackOffset = i / quackBuffer.sampleRate;
      break;
    }
  }
}

function playQuack() {
  const source = audioContext.createBufferSource();
  source.buffer = quackBuffer;
  source.connect(audioContext.destination);
  source.start(0, quackOffset);
  source.onended = () => source.disconnect();
}

duckButton.addEventListener("click", async () => {
  if (duckButton.classList.contains("is-quacking")) return;

  duckButton.classList.add("is-quacking");
  window.setTimeout(() => duckButton.classList.remove("is-quacking"), 700);

  try {
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") await audioContext.resume();
    if (!quackBuffer) await loadQuack();
    playQuack();
  } catch {
    // Keep the visual quack available when browser audio is unavailable.
  }
});

loadQuack().catch(() => {});

document.querySelectorAll("h1 > span > span").forEach((letter, index) => {
  letter.style.setProperty("--letter", index);
});

document.querySelector("#year").textContent = new Date().getFullYear();
