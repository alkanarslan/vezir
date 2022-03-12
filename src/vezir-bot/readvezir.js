const fs = require("fs");
const pdf = require("pdf-parse");
const bwipjs = require("bwip-js");
let dataBuffer = fs.readFileSync("oku.pdf");

pdf(dataBuffer).then(function (data) {
  var contentData = data.text;
  //console.log(contentData);
  var findToplamIndex = contentData.search("TOPLAM") + 6;
  var lastToplamIndex = contentData.search("İşlem Türü");
  var tahakkukNo = contentData.search("VADESİ");
  console.log(contentData.substring(tahakkukNo, tahakkukNo - 22));
  console.log(contentData.substring(findToplamIndex, lastToplamIndex).trim());
});

bwipjs.toBuffer(
  {
    bcid: "code128", // Barcode type
    text: "2022021901GX20000113", // Text to encode
    scale: 3, // 3x scaling factor
    height: 10, // Bar height, in millimeters
    includetext: true, // Show human-readable text
    textxalign: "center", // Always good to set this
  },
  function (err, png) {
    if (err) {
      // `err` may be a string or Error object
    } else {
      fs.writeFileSync("barcode.png", png);
      // `png` is a Buffer
      // png.length           : PNG file length
      // png.readUInt32BE(16) : PNG image width
      // png.readUInt32BE(20) : PNG image height
    }
  }
);
