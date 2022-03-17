const puppeteer = require("puppeteer");
const htmlparser2 = require("htmlparser2");
const cheerio = require("cheerio");
const download = require("download");

const scrapedData = [];
(async () => {
  const browser = await puppeteer.launch({
    args: ["--disable-features=site-per-process"],
    headless: false,
    executablePath:
      "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 0, height: 0 });
  await page.goto("http://127.0.0.1/bos.html", {
    waitUntil: "networkidle2",
  });

  console.log("waiting for iframe with form to be ready.");
  await page.waitForSelector("iframe");
  console.log("iframe is ready. Loading iframe content");

  const elementHandle = await page.$('iframe[src="liste.html"]');
  const frame = await elementHandle.contentFrame();

  const text = await frame.$eval(
    "body>table>tbody>tr:nth-child(1)>th:nth-child(2)",
    (element) => element.textContent
  );
  console.log(text);
})();
