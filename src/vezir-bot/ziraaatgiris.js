const puppeteer = require("puppeteer");
const htmlparser2 = require("htmlparser2");
const cheerio = require("cheerio");
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
  await page.goto(
    "https://bireysel.ziraatbank.com.tr/Transactions/Login/FirstLogin.aspx?customertype=rtl",
    {
      waitUntil: "networkidle2",
    }
  );

  const username = await page.waitForXPath(
    "/html/body/form/div[3]/div[2]/div/div/div[1]/div/div[1]/div[2]/div[1]/div[1]/input[2]"
  );

  await username.type("60925152178");

  const userpass = await page.waitForXPath(
    "/html/body/form/div[3]/div[2]/div/div/div[1]/div/div[1]/div[2]/div[1]/div[3]/input[1]"
  );

  await userpass.type("379186");

  await page.keyboard.press("Enter");

  await page.waitForTimeout(5000);

  await page.waitForSelector("iframe");

  const elementHandle = await page.$('iframe[src="/NavigationController.aspx?page=Dashboard"]');
  const frame = await elementHandle.contentFrame();

  await page.waitForTimeout(1000);

  await frame.$eval(
      "#menu>div.menu-wrap>div.MenuScrollEvent>div>div.top>ul>li:nth-child(4)>div>div>div>ul>li:nth-child(9)>div>a",
      (form) => form.click()
  );
/*
  const text = await frame.$eval(
    "body>table>tbody>tr:nth-child(1)>th:nth-child(2)",
    (element) => element.textContent
  );
  console.log(text);
*/
})();
