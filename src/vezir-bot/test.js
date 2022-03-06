const puppeteer = require("puppeteer");
const htmlparser2 = require("htmlparser2");
const cheerio = require("cheerio");
const path = require("path");
const download = require("download");

const scrapedData = [];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 0, height: 0 });
  await page.goto("http://127.0.0.1/liste.html");
  await page.waitForTimeout(1000);

  await aaa().then((value) => {
    console.log(value);
  });

  async function aaa() {
    const data = await page.evaluate(() => {
      const eTable = document.querySelectorAll("body>table>tbody");
      const tds = Array.from(eTable);
      return tds.map((item) => item.innerHTML);
    });
    //console.log(data[7]);

    const dom = htmlparser2.parseDocument(data);

    //const dom1 = cheerio.load(dom);
    const $ = cheerio.load(dom);
    $("tr").each((index, element) => {
      if (index === 0) return true;
      const tds = $(element).find("td");
      const firmName = $(tds[3]).attr("title");
      const pdfId = $(tds[0]).attr("id").replace("checkboxTD", "").trim();
      const tarih = $(tds[7]).text().trim();
      const beyannmeTipi = $(tds[1]).text().trim();
      const vdNo = $(tds[2]).text().trim();
      const onay = $(tds[8]).text().trim();
      const donem = $(tds[5]).text().trim();
      tahakkukId = "yok";

      $(element)
        .find("img")
        .each((index, element) => {
          const bakbi = $(element).attr("title");
          if (bakbi != undefined) {
            if (bakbi.includes("Tahakkuku")) {
              tahakkukId = $(element)
                .attr("onclick")
                .replace("',false,false)", "")
                .replace("tahakkukGoruntule('", "")
                .replace(pdfId, "")
                .replace("'", "")
                .replace(",'", "")
                .trim();
            }
          }
        });
      //const tahakkukId = $(tds[8]).find("td")[2].children[1].attribs.onclick;

      if (tarih.length > 0) {
        const tableRow = {
          pdfId,
          firmName,
          tarih,
          beyannmeTipi,
          vdNo,
          onay,
          tahakkukId,
          donem,
        };
        scrapedData.push(tableRow);
      }
    });
    console.log(scrapedData);
    return "ok";
  }

  // Download the file
  (async () => {
    await download("http://127.0.0.1/oku.pdf", "./pdf");
  })();

  // for (let row of CSSselect.selectAll("td", dom)) {
  //   console.log(`${row.attribs.id} - ${row.attribs.title}  - ${row.ele}`);
  // }

  // const password2 = await page.waitForXPath("body>table");
  //   const data = await page.evaluate(() => {
  //     const tds = Array.from(document.querySelectorAll("table"));
  //     return tds.map((td) => td.innerText);
  //   });
  //   console.log(data);s
  // Get the "viewport" of the page, as reported by the page.

  //await browser.close();
})();
