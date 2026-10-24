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

document.querySelectorAll("h1 > span > span").forEach((letter, index) => {
  letter.style.setProperty("--letter", index);
});

document.querySelector("#year").textContent = new Date().getFullYear();
