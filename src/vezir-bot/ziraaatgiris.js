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
  await page.waitForTimeout(10000);
  await page.$eval(
    "#menu>div.menu-wrap>div.MenuScrollEvent>div>div.top>ul>li:nth-child(4)>div>div>div>ul>li:nth-child(9)>div>a",
    (form) => form.click()
  );

  //table ayıkla

  /* Burası Download kısmı
  var Url = new URL(newPage.url());

  var token = Url.searchParams.get("TOKEN");

  var ikinciUrl = new URL(
    "https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=3705a6b168026b1c19ef38ba62c289a502f931971418a800aaebb2314a3f5171fab06ad44323d283864014f74b805248082dae7fc011bba92832dbcba33dd92e&beyannameOid=0zkztsqt7u1wfi&inline=true"
  );

  ikinciUrl.searchParams.delete("TOKEN");
  ikinciUrl.searchParams.set("TOKEN", token);

  (async () => {
    await download(ikinciUrl.href, "./pdf");
  })();

  /*




#bynList0_content > form > center:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(4) > input[type=button]
#bynList1_content > form > center:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(4) > input[type=button]
#bynList1_content > form > center:nth-child(2) > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(4) > input[type=button]






*/

  // const author = await page.$eval(
  //   "#bynList0_content>form>center:nth-child(2)>table:nth-child(2)",
  //   (el) => el.innerText
  // );

  // console.log(author);
  // await tableParser(newPage, {
  //   selector: "#bynList0_content>form>center:nth-child(2)>table:nth-child(2)",
  //   allowedColNames: {
  //     "Beyanname Türü": "car",
  //     "TC Kimlik Numarası / Vergi Kimlik Numarası": "hp",
  //     "Ad Soyad/Unvan(*)": "year",
  //   },
  // });

  // download urllerini çağıracak
  // await page.goto(
  //   "https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=c444d8763b5e000a4e84699fee9c42c091d4ee350c05fb8f7fa1970f0f160def38bcd44e9ff63959607cfa5930831a6289edd91447ac280e8ab44efaadfd4f4c&beyannameOid=0zkztsqt7u1wfi&inline=true"
  // );
  // await page._client.send("Page.setDownloadBehavior", {
  //   behavior: "allow",
  //   downloadPath: "/tmp",
  // });

  /*

Url den donen token ile  direk pdf indirme yapılabilir.
https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=c444d8763b5e000a4e84699fee9c42c091d4ee350c05fb8f7fa1970f0f160def38bcd44e9ff63959607cfa5930831a6289edd91447ac280e8ab44efaadfd4f4c&beyannameOid=0zkztsqt7u1wfi&inline=true
https://ebeyanname.gib.gov.tr/dispatch?cmd=LOGIN&TOKEN=c444d8763b5e000a4e84699fee9c42c091d4ee350c05fb8f7fa1970f0f160def38bcd44e9ff63959607cfa5930831a6289edd91447ac280e8ab44efaadfd4f4c&CHANGEPWD=TRUE
*/

  // const data = await newPage.evaluate(() =>
  //   Array.from(
  //     document.querySelectorAll('table[id="gvM"] > tbody > tr'),
  //     (row) =>
  //       Array.from(row.querySelectorAll("th, td"), (cell) => cell.innerText)
  //   )
  // );

  // await page._client.send(
  //   "Page.beyannameGoruntule('0zkztsqt7u1wfi',false,false)",
  //   {
  //     behavior: "allow",
  //     downloadPath: downloadPath,
  //   }
  // );
  // await page.click("._2vsJm ");

  //await newPage.waitForNavigation();
  // await browser.close();
})();

/*
await newPage.evaluate(() => {
    beyannameAraFormu();
  });
beyannameAraFormu()
taxReturnSearchFormPost()





https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=094ad6d206399e9172ff61d31f7e1ee5747198f2418a45af421f8ae5e391061deb5bfa94aaf05ea41c1a75f3913fdf57756094dfade3e76902a491125b91f9e7&beyannameOid=0zkztsqt7u1wfi&inline=true


<span onmouseover="makeUnderLine(this)" onmouseout="deleteUnderLine(this)" onclick="beyannameAraFormu()" style="cursor: pointer;">Beyanname Ara</span>
*/
//#page > table > tbody > tr > td > div:nth-child(6) > div > table > tbody > tr > td:nth-child(7) > span

//document.querySelector("#page > table > tbody > tr > td > div:nth-child(6) > div > table > tbody > tr > td:nth-child(7) > span")

//document.querySelector("#page > table > tbody > tr > td > div:nth-child(6) > div > table > tbody > tr > td:nth-child(7) > span")

// /html/body/div[1]/table[3]/tbody/tr/td[2]/div/form/center[1]/table[2]/tbody/tr[2]/td[10]/img
// /html/body/div[1]/table[3]/tbody/tr/td[2]/div/form/center[1]/table[2]/tbody/tr[3]/td[10]/img
// /html/body/div[1]/table[3]/tbody/tr/td[2]/div/form/center[1]/table[2]/tbody/tr[4]/td[10]/img
// /html/body/div[1]/table[3]/tbody/tr/td[2]/div/form/center[1]/table[2]/tbody/tr[4]/td[10]/img
