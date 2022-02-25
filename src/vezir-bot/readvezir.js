const fs = require("fs");
const pdf = require("pdf-parse");

let dataBuffer = fs.readFileSync("oku.pdf");

pdf(dataBuffer).then(function (data) {
  var contentData = data.text;
  console.log(contentData);
  var findToplamIndex = contentData.search("TOPLAM") + 6;
  var lastToplamIndex = contentData.search("İşlem Türü");
  console.log(contentData.substring(findToplamIndex, lastToplamIndex).trim());
});
