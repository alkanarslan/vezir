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

  /*
  const browser = await puppeteer.connect({
    browserWSEndpoint: "ws://localhost:3000",
  });

  */
  const page = await browser.newPage();
  await page.setViewport({ width: 0, height: 0 });
  await page.goto("https://ebeyanname.gib.gov.tr/", {
    waitUntil: "networkidle2",
  });
  await page.$eval("#buton>img", (form) => form.click());

  const newPagePromise = new Promise((x) => page.once("popup", x));
  const newPage = await newPagePromise;
  await newPage.setViewport({ width: 0, height: 0 });

  const userCode = await newPage.waitForXPath(
    "/html/body/div/div/table[1]/tbody/tr[2]/td/div/form/table/tbody/tr[1]/td[3]/input"
  );

  await userCode.type("25903042");

  const password1 = await newPage.waitForXPath(
    "/html/body/div/div/table[1]/tbody/tr[2]/td/div/form/table/tbody/tr[2]/td[3]/input"
  );
  await password1.type("maliye");
  const password2 = await newPage.waitForXPath(
    "/html/body/div/div/table[1]/tbody/tr[2]/td/div/form/table/tbody/tr[3]/td[3]/input"
  );

  await password2.type("212121");

  await newPage.keyboard.press("Enter");
  await newPage.waitForTimeout(1000);

  await newPage.$eval(
    "#page>table>tbody>tr>td>div:nth-child(6)>div>table>tbody>tr>td:nth-child(7)>span",
    (form) => form.click()
  );

  await newPage.waitForTimeout(2000);
  await newPage.$eval("#sorgulaButon", (form) => form.click());
  await newPage.waitForTimeout(2000);

  const pageSize = await pageCalc(newPage);
  console.log(pageSize);
  await htmlTableToData(newPage);
  await newPage.waitForTimeout(2000);

  for (let i = 1; i < pageSize; i++) {
    await newPage.$eval(
      "#bynList0_content>form>center:nth-child(2)>table:nth-child(1)>tbody>tr:nth-child(2)>td:nth-child(4)>input[type=button]",
      (form) => form.click()
    );
    await htmlTableToData(newPage);
  }

  async function htmlTableToData(tablePage) {
    await tablePage.waitForTimeout(2000);
    console.log("Geldi");
    const data = await tablePage.evaluate(() => {
      const eTable = document.querySelectorAll(
        "#bynList0_content>form>center:nth-child(2)>table:nth-child(2)"
      );
      const tds = Array.from(eTable);
      return tds.map((item) => item.innerHTML);
    });

    const dom = htmlparser2.parseDocument(data);
    const $ = cheerio.load(dom);
    $("tr").each((index, element) => {
      if (index === 0) return true;
      const tds = $(element).find("td");
      // const firmName = $(tds[3]).attr("title");
      const gibDeclarationId = $(tds[0])
        .attr("id")
        .replace("checkboxTD", "")
        .trim();
      const gibDate = $(tds[7]).text().trim();
      const gibDeclarationType = $(tds[1]).text().trim();
      const gibTaxNo = $(tds[2]).text().trim();
      const gibApproval = $(tds[8]).text().trim();
      const gibPeriod = $(tds[5]).text().trim();
      gibAssessmentId = "yok";

      $(element)
        .find("img")
        .each((index, element) => {
          const bakbi = $(element).attr("title");
          if (bakbi != undefined) {
            if (bakbi.includes("Tahakkuku")) {
              gibAssessmentId = $(element)
                .attr("onclick")
                .replace("',false,false)", "")
                .replace("tahakkukGoruntule('", "")
                .replace(gibDeclarationId, "")
                .replace("'", "")
                .replace(",'", "")
                .trim();
            }
          }
        });

      if (gibDate.length > 0) {
        const tableRow = {
          gibDeclarationId,
          gibDate,
          gibDeclarationType,
          gibTaxNo,
          gibApproval,
          gibAssessmentId,
          gibPeriod,
        };
        scrapedData.push(tableRow);
      }
    });
    return "ok";
  }
  console.log(scrapedData);

  async function pageCalc(pagingItem) {
    const text = await pagingItem.$eval(
      "#bynList0_content>form>center:nth-child(2)>table:nth-child(1)>tbody>tr:nth-child(2)>td:nth-child(3)>b>font",
      (element) => element.textContent
    );
    var pageItem = text.split("/")[1];
    var result = Math.ceil(pageItem / 25);
    //console.log(result);
    return result;
  }

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
