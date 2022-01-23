const express = require("express");
const puppeteer = require("puppeteer-core");

const app = express();

app.get("/image", async (req, res) => {
  // This was puppeteer.launch()
  const browser = await puppeteer.connect({
    browserWSEndpoint: "ws://localhost:3000",
  });
  const page = await browser.newPage();

  await page.goto("https://www.boyner.com.tr/");
  const data = await page.screenshot();
  browser.close();

  return res.end(data, "binary");
});

app.get("/dataiki", async (req, res) => {
  async () => {
    const browser = await puppeteer.connect({
      browserWSEndpoint: "ws://localhost:3000",
    });

    const page = await browser.newPage();

    // go to the target web
    await page.goto("https://www.boyner.com.tr/", {
      waitUntil: "networkidle2",
    });

    const element = await page.waitForXPath(
      "/html/body/div[1]/header/div[2]/div[1]/div[2]/div/div[2]/form/div/input[2]"
    );

    await element.type("levis");
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    const element1 = await page.waitForXPath(
      "/html/body/div[1]/div[1]/div/section/div[2]/div[2]/div/div[2]/div[2]/div/div[2]/ul/li[1]/div/label/span[2]"
    );

    const getMsg = await page.evaluate((name) => name.innerText, element1);

    console.log(getMsg);
    await browser.close();
    res.send(getMsg);
  };
})();

app.listen(8080);
