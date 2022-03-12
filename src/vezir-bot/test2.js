const puppeteer = require("puppeteer");
const htmlparser2 = require("htmlparser2");
const cheerio = require("cheerio");
const path = require("path");
const download = require("download");
const axios = require("axios");

const scrapedData = [
  {
    gibDeclarationId: "11l06ove871neu",
    gibDate: "28.02.2022 - 15:47:26",
    gibDeclarationType: "KDV1",
    gibTaxNo: "7630183663",
    gibApproval: "Onaylandı",
    gibAssessmentId: "11l06nendt195a",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l06t3ynp1p1n",
    gibDate: "28.02.2022 - 17:48:09",
    gibDeclarationType: "KDV1",
    gibTaxNo: "6120731517",
    gibApproval: "Onaylandı",
    gibAssessmentId: "12l06se5nk164a",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l06tl1jv1s1q",
    gibDate: "28.02.2022 - 18:02:11",
    gibDeclarationType: "KDV1",
    gibTaxNo: "3950839657",
    gibApproval: "Onaylandı",
    gibAssessmentId: "12l06se5nk18nj",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l06vl7lk1jlp",
    gibDate: "28.02.2022 - 18:59:14",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "0091098723",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l06vl7lk1jod",
    gibDate: "28.02.2022 - 18:59:14",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "0091098723",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "13l06w1jog1301",
    gibDate: "28.02.2022 - 19:02:48",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "0300511340",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "13l06w1jog1325",
    gibDate: "28.02.2022 - 19:02:48",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "0300511340",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "0zl06vx2of1ucn",
    gibDate: "28.02.2022 - 19:06:50",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "0890535809",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "0zl06vx2of1uef",
    gibDate: "28.02.2022 - 19:06:50",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "0890535809",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "0zl06w71hy1q4q",
    gibDate: "28.02.2022 - 19:19:16",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "1980855625",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "0zl06w71hy1q5x",
    gibDate: "28.02.2022 - 19:19:16",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "1980855625",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l06w8zpg1uf2",
    gibDate: "28.02.2022 - 19:24:38",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "15260883812",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l06w8zpg1ugk",
    gibDate: "28.02.2022 - 19:24:38",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "15260883812",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "13l06wpps61lp4",
    gibDate: "28.02.2022 - 19:31:56",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "2980362691",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "13l06wpps61lsj",
    gibDate: "28.02.2022 - 19:31:56",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "2980362691",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l06x619d147r",
    gibDate: "28.02.2022 - 19:35:45",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "3130631894",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l06x619d149g",
    gibDate: "28.02.2022 - 19:35:45",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "3130631894",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l06x20gw1g69",
    gibDate: "28.02.2022 - 19:39:34",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "3660655218",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l06x20gw1g72",
    gibDate: "28.02.2022 - 19:39:34",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "3660655218",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l06x619d1u99",
    gibDate: "28.02.2022 - 19:52:03",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "54076063438",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l06x619d1u9q",
    gibDate: "28.02.2022 - 19:52:03",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "54076063438",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "10l06xiao61uq7",
    gibDate: "28.02.2022 - 19:56:28",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "37948597316",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "10l06xiao61ur9",
    gibDate: "28.02.2022 - 19:56:28",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "37948597316",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l06y2fzd16qh",
    gibDate: "28.02.2022 - 20:02:54",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "12839434284",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l06y2fzd16qv",
    gibDate: "28.02.2022 - 20:02:54",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "12839434284",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "10l06y6ppr1a2c",
    gibDate: "28.02.2022 - 20:08:12",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "5380460749",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "10l06y6ppr1a2m",
    gibDate: "28.02.2022 - 20:08:12",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "5380460749",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l06yaga51b7t",
    gibDate: "28.02.2022 - 20:12:22",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "5890854671",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l06yaga51b8h",
    gibDate: "28.02.2022 - 20:12:22",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "5890854671",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l06y2fzd1qq7",
    gibDate: "28.02.2022 - 20:16:06",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "13760882274",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l06y2fzd1qqg",
    gibDate: "28.02.2022 - 20:16:06",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "13760882274",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "13l06y0g211yk4",
    gibDate: "28.02.2022 - 20:19:21",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "19906711408",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "13l06y0g211ykn",
    gibDate: "28.02.2022 - 20:19:21",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "19906711408",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l06yqrmh1qox",
    gibDate: "28.02.2022 - 20:32:45",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "7630183663",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l06yqrmh1qpa",
    gibDate: "28.02.2022 - 20:32:45",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "7630183663",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "10l06yi4651s9m",
    gibDate: "28.02.2022 - 20:37:50",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "6120731517",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "10l06yi4651s9t",
    gibDate: "28.02.2022 - 20:37:50",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "6120731517",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "10l06z3eux1fr1",
    gibDate: "28.02.2022 - 20:38:25",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "9811353999",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "10l06z3eux1fr8",
    gibDate: "28.02.2022 - 20:38:25",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "9811353999",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "10l06zb73r1i60",
    gibDate: "28.02.2022 - 20:45:21",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "8220573868",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "10l06zb73r1i6n",
    gibDate: "28.02.2022 - 20:45:21",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "8220573868",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "0zl0708obp16u4",
    gibDate: "28.02.2022 - 21:03:43",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "3950839657",
    gibApproval: "Hatalı",
    gibAssessmentId: "yok",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "0zl0708obp16u7",
    gibDate: "28.02.2022 - 21:03:43",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "3950839657",
    gibApproval: "Hatalı",
    gibAssessmentId: "yok",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "0zl0708obp19h0",
    gibDate: "28.02.2022 - 21:05:52",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "3950839657",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "0zl0708obp19he",
    gibDate: "28.02.2022 - 21:05:52",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "3950839657",
    gibApproval: "Hatalı",
    gibAssessmentId: "yok",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "0zl0708obp1bcj",
    gibDate: "28.02.2022 - 21:07:23",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "3950839657",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l071qmck1jfa",
    gibDate: "28.02.2022 - 22:03:15",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "0690416388",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l071qmck1jfg",
    gibDate: "28.02.2022 - 22:03:15",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "0690416388",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l071m9di1pu1",
    gibDate: "28.02.2022 - 22:14:30",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "0690461882",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "11l071m9di1pu8",
    gibDate: "28.02.2022 - 22:14:30",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "0690461882",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l071qmck1s30",
    gibDate: "28.02.2022 - 22:19:21",
    gibDeclarationType: "FORMBS",
    gibTaxNo: "3640305077",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "12l071qmck1s37",
    gibDate: "28.02.2022 - 22:19:21",
    gibDeclarationType: "FORMBA",
    gibTaxNo: "3640305077",
    gibApproval: "Onaylandı",
    gibAssessmentId: "",
    gibPeriod: "01/2022-01/2022",
  },
  {
    gibDeclarationId: "1wl0802cxd14gk",
    gibDate: "01.03.2022 - 13:55:06",
    gibDeclarationType: "GELIR",
    gibTaxNo: "17584632770",
    gibApproval: "Hatalı",
    gibAssessmentId: "yok",
    gibPeriod: "01/2021-12/2021",
  },
  {
    gibDeclarationId: "1wl0802cxd17oo",
    gibDate: "01.03.2022 - 14:04:34",
    gibDeclarationType: "GELIR",
    gibTaxNo: "17584632770",
    gibApproval: "Hatalı",
    gibAssessmentId: "yok",
    gibPeriod: "01/2021-12/2021",
  },
  {
    gibDeclarationId: "1xl07zsnci1fvd",
    gibDate: "01.03.2022 - 14:11:26",
    gibDeclarationType: "GELIR",
    gibTaxNo: "17584632770",
    gibApproval: "Hatalı",
    gibAssessmentId: "yok",
    gibPeriod: "01/2021-12/2021",
  },
  {
    gibDeclarationId: "1wl0802cxd1aok",
    gibDate: "01.03.2022 - 14:12:29",
    gibDeclarationType: "GELIR",
    gibTaxNo: "17584632770",
    gibApproval: "Hatalı",
    gibAssessmentId: "yok",
    gibPeriod: "01/2021-12/2021",
  },
  {
    gibDeclarationId: "1wl09m9g101a4a",
    gibDate: "02.03.2022 - 17:01:38",
    gibDeclarationType: "GELIR",
    gibTaxNo: "17584632770",
    gibApproval: "İptal",
    gibAssessmentId: "yok",
    gibPeriod: "01/2021-12/2021",
  },
  {
    gibDeclarationId: "1wl09m9g101gg3",
    gibDate: "02.03.2022 - 17:07:54",
    gibDeclarationType: "GELIR",
    gibTaxNo: "17584632770",
    gibApproval: "Onaylandı",
    gibAssessmentId: "1ul09mexur1fi9",
    gibPeriod: "01/2021-12/2021",
  },
  {
    gibDeclarationId: "12l0ca1ecn1ser",
    gibDate: "04.03.2022 - 15:25:02",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "6120731517",
    gibApproval: "Onaylandı",
    gibAssessmentId: "12l0axgvft1suj",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "0zl0cw3ytd1qy9",
    gibDate: "05.03.2022 - 13:12:28",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "37948597316",
    gibApproval: "Onaylandı",
    gibAssessmentId: "0zl0cfef7g1erk",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "13l0djl1q61o53",
    gibDate: "05.03.2022 - 13:27:23",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "1980855625",
    gibApproval: "Onaylandı",
    gibAssessmentId: "13l0ce5ao51glb",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "13l0dlkuim1m99",
    gibDate: "05.03.2022 - 13:55:51",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "3660655218",
    gibApproval: "Onaylandı",
    gibAssessmentId: "13l0cem9zm1ilh",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "10l0dj4axe1ue9",
    gibDate: "05.03.2022 - 14:07:59",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "8220573868",
    gibApproval: "İptal",
    gibAssessmentId: "yok",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "10l0dj4axe1ugj",
    gibDate: "05.03.2022 - 14:08:42",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "8220573868",
    gibApproval: "Hatalı",
    gibAssessmentId: "yok",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "11l0doohy818df",
    gibDate: "05.03.2022 - 14:25:31",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "8220573868",
    gibApproval: "Onaylandı",
    gibAssessmentId: "11l0ce4pdt1imz",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "11l0doohy8195v",
    gibDate: "05.03.2022 - 14:37:19",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "5890854671",
    gibApproval: "Onaylandı",
    gibAssessmentId: "10l0cfz65f1g8y",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "11l0doohy81bcu",
    gibDate: "05.03.2022 - 14:51:01",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "0890535809",
    gibApproval: "Onaylandı",
    gibAssessmentId: "11l0ce4pdt1jag",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "13l0dmuelf1pfw",
    gibDate: "05.03.2022 - 15:13:14",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "54076063438",
    gibApproval: "Onaylandı",
    gibAssessmentId: "13l0cgdksy1hcw",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "10l0dt5nju10fn",
    gibDate: "05.03.2022 - 15:22:55",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "0091098723",
    gibApproval: "Onaylandı",
    gibAssessmentId: "10l0cfz65f1gxx",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "13l0dlkuim1zeb",
    gibDate: "05.03.2022 - 15:32:15",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "2980362691",
    gibApproval: "Onaylandı",
    gibAssessmentId: "13l0cem9zm1l3x",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "11l0dsjknj14k1",
    gibDate: "05.03.2022 - 15:42:41",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "3130631894",
    gibApproval: "Onaylandı",
    gibAssessmentId: "11l0cj9umc1dzb",
    gibPeriod: "02/2022-02/2022",
  },
  {
    gibDeclarationId: "10l0dtr4j214zx",
    gibDate: "05.03.2022 - 15:51:43",
    gibDeclarationType: "MUHSGK",
    gibTaxNo: "13760882274",
    gibApproval: "Onaylandı",
    gibAssessmentId: "10l0cbwyi41paf",
    gibPeriod: "02/2022-02/2022",
  },
];
(async () => {
  var myJsonString = JSON.stringify(scrapedData);
  //var itemList = JSON.parse(scrapedData);
  axios
    .post("http://localhost:5092/api/declarationsVerification", {
      allList: scrapedData,
    })
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });

  //console.log(myJsonString);
})();