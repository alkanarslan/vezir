const { verifyPseudoArgs } = require("css-select/lib/pseudo-selectors/pseudos");

var eUrl =
  "https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=c444d8763b5e000a4e84699fee9c42c091d4ee350c05fb8f7fa1970f0f160def38bcd44e9ff63959607cfa5930831a6289edd91447ac280e8ab44efaadfd4f4c&beyannameOid=0zkztsqt7u1wfi&inline=true";

function downloadPathCreate(id, beyannameTipi, url) {
  var Url = new URL(url);

  var token = Url.searchParams.get("TOKEN");

  if (beyannameTipi == "MUHSGK") {
  }
  console.log(Url.searchParams.get("beyannameOid"));
  Url.searchParams.delete("beyannameOid");
  Url.searchParams.set("beyannameOid", "kamil");
  console.log(Url.searchParams.get("beyannameOid"));
}

/*
https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=TAHAKKUKGORUNTULE&TOKEN=2cff02c00ff9c739ff70187b17bd9fa735cd6adb1f2966ea5755fdad9ca3d01ec3740867a9cc1943aa1f65a897f4e942cde3e82431213548e9b21a5615b62dd7&beyannameOid=0zkztsqt7u1wfi&tahakkukOid=0zkztn30zq1hl3&inline=true
https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=2cff02c00ff9c739ff70187b17bd9fa735cd6adb1f2966ea5755fdad9ca3d01ec3740867a9cc1943aa1f65a897f4e942cde3e82431213548e9b21a5615b62dd7&beyannameOid=0zkztsqt7u1wfi&inline=true
https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=SGKTAHAKKUKGORUNTULE&TOKEN=2cff02c00ff9c739ff70187b17bd9fa735cd6adb1f2966ea5755fdad9ca3d01ec3740867a9cc1943aa1f65a897f4e942cde3e82431213548e9b21a5615b62dd7&beyannameOid=0zkztsqt7u1wfi&sgkTahakkukOid=1fkztx715h1a56&inline=true
https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=SGKHIZMETGORUNTULE&TOKEN=2cff02c00ff9c739ff70187b17bd9fa735cd6adb1f2966ea5755fdad9ca3d01ec3740867a9cc1943aa1f65a897f4e942cde3e82431213548e9b21a5615b62dd7&beyannameOid=0zkztsqt7u1wfi&sgkTahakkukOid=1fkztx715h1a56&inline=true


*/






beyan
https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=79a6f35672895cb9788add81a3681f9c55635f7fe72fdb51c2ae2b275363e07bd48abfb034bde1d51eb3c191ae704437b2e18a17fa37956b0b7464027c07327a&beyannameOid=0zkztsqt7u1wfi&inline=true


tahakkuk

https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=TAHAKKUKGORUNTULE&TOKEN=79a6f35672895cb9788add81a3681f9c55635f7fe72fdb51c2ae2b275363e07bd48abfb034bde1d51eb3c191ae704437b2e18a17fa37956b0b7464027c07327a&beyannameOid=0zkztsqt7u1wfi&tahakkukOid=0zkztn30zq1hl3&inline=true


sgk vergi


https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=79a6f35672895cb9788add81a3681f9c55635f7fe72fdb51c2ae2b275363e07bd48abfb034bde1d51eb3c191ae704437b2e18a17fa37956b0b7464027c07327a&beyannameOid=0zkztsqt7u1wfi&inline=true


sgk tahakkuk

https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=SGKTAHAKKUKGORUNTULE&TOKEN=79a6f35672895cb9788add81a3681f9c55635f7fe72fdb51c2ae2b275363e07bd48abfb034bde1d51eb3c191ae704437b2e18a17fa37956b0b7464027c07327a&beyannameOid=0zkztsqt7u1wfi&sgkTahakkukOid=1fkztx715h1a56&inline=true


sgk hizmet dökümanı

https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=SGKHIZMETGORUNTULE&TOKEN=79a6f35672895cb9788add81a3681f9c55635f7fe72fdb51c2ae2b275363e07bd48abfb034bde1d51eb3c191ae704437b2e18a17fa37956b0b7464027c07327a&beyannameOid=0zkztsqt7u1wfi&sgkTahakkukOid=1fkztx715h1a56&inline=true