var url = new URL("https://ebeyanname.gib.gov.tr/dispatch");

var token =
  "3705a6b168026b1c19ef38ba62c289a502f931971418a800aaebb2314a3f5171fab06ad44323d283864014f74b805248082dae7fc011bba92832dbcba33dd92e";
var beyannameId = "0zkztsqt7u1wfi";

//Beyanname Pdf Download Url
url.searchParams.set("TOKEN", token);
url.searchParams.set("beyannameOid", beyannameId);
url.searchParams.set("inline", "true");
url.searchParams.set("subcmd", "BEYANNAMEGORUNTULE");
url.searchParams.set("cmd", "IMAJ");
console.log(url.href);

//Tahakkuk Pdf Download Url
var tahakkukId = "0zkztsqt7u1wfi";
url.searchParams.set("TOKEN", token);
url.searchParams.set("beyannameOid", beyannameId);
url.searchParams.set("tahakkukOid", tahakkukId);
url.searchParams.set("inline", "true");
url.searchParams.set("subcmd", "TAHAKKUKGORUNTULE");
url.searchParams.set("cmd", "IMAJ");
console.log(url.href);

// beyan
// https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=79a6f35672895cb9788add81a3681f9c55635f7fe72fdb51c2ae2b275363e07bd48abfb034bde1d51eb3c191ae704437b2e18a17fa37956b0b7464027c07327a&beyannameOid=0zkztsqt7u1wfi&inline=true

// tahakkuk

// https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=TAHAKKUKGORUNTULE&TOKEN=79a6f35672895cb9788add81a3681f9c55635f7fe72fdb51c2ae2b275363e07bd48abfb034bde1d51eb3c191ae704437b2e18a17fa37956b0b7464027c07327a&beyannameOid=0zkztsqt7u1wfi&tahakkukOid=0zkztn30zq1hl3&inline=true

// sgk vergi

// https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=BEYANNAMEGORUNTULE&TOKEN=79a6f35672895cb9788add81a3681f9c55635f7fe72fdb51c2ae2b275363e07bd48abfb034bde1d51eb3c191ae704437b2e18a17fa37956b0b7464027c07327a&beyannameOid=0zkztsqt7u1wfi&inline=true

// sgk tahakkuk

// https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=SGKTAHAKKUKGORUNTULE&TOKEN=79a6f35672895cb9788add81a3681f9c55635f7fe72fdb51c2ae2b275363e07bd48abfb034bde1d51eb3c191ae704437b2e18a17fa37956b0b7464027c07327a&beyannameOid=0zkztsqt7u1wfi&sgkTahakkukOid=1fkztx715h1a56&inline=true

// sgk hizmet dökümanı

// https://ebeyanname.gib.gov.tr/dispatch?cmd=IMAJ&subcmd=SGKHIZMETGORUNTULE&TOKEN=79a6f35672895cb9788add81a3681f9c55635f7fe72fdb51c2ae2b275363e07bd48abfb034bde1d51eb3c191ae704437b2e18a17fa37956b0b7464027c07327a&beyannameOid=0zkztsqt7u1wfi&sgkTahakkukOid=1fkztx715h1a56&inline=true
