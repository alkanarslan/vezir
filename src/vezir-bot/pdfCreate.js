const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50, lang: "orororos" });

  doc.info["Title"] = "Vezir";
  doc.info["Author"] = "Vezir";
  doc.info["Content Creator"] = "Vezir";
  doc.info["Encoding software"] = "Vezir";
  // Register a font

  doc.registerFont("Thin", "font/BebasNeue-Regular.ttf");
  doc.registerFont("ubuntu", "font/Ubuntu-Regular.ttf");
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path, "UTF-8"));
}

function generateHeader(doc) {
  doc
    .font("ubuntu")
    .image("vezir.png", 50, 45, { width: 100 })
    .fillColor("#444444")

    .fontSize(14)
    .text("Tolga Çokgezen", 200, 55, { align: "right" })
    .fontSize(11)
    .text("Tel : 0 535 348 20 20", 200, 72, { align: "right" })

    .text("ZİRAAT BANKASİ BAYRAMPASA SB", 200, 85, { align: "right" })
    .text("IBAN: TR37 0001 0007 0759 6492 9850 01", 200, 100, {
      align: "right",
    })
    .text("GARANTİ BANKASI A.Ş.TOPKAPI/MALTEPE ŞB", 200, 115, {
      align: "right",
    })
    .text("IBAN NO: TR24 0006 2000 5340 0006 6897 46", 200, 130, {
      align: "right",
    })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Cari Hesap Ekstresi", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Cari Hesap Ekstresi", 50, customerInformationTop)
    .font("ubuntu")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    //.font("JetBrains Mono")
    .text("Fatura Tarihi:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Toplam Ödeme:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    //.font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    //.font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  // doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Beyanname",
    "Dönemi",
    "Vadesi",
    "Tutar",
    "Tutar"
  );
  generateHr(doc, invoiceTableTop + 20);
  //doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Alt Toplam",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Ek kök",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  //doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Toplam",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  //doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Ödemelerinizi yapınız, ödeme yapmadan ödeme yapılmazsa, ödeme yapmadan ödeme yapılmaz.",
      50,
      780,
      {
        align: "center",
        width: 500,
      }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return (cents / 100).toFixed(2) + " TL";
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

const invoice = {
  shipping: {
    name: "Alkan ARSLAN (KODPOINT)",
    address: "Yenidoğan Mah.",
    city: "Balıkesir",
    state: "IST",
    country: "IST",
    postal_code: 94111,
  },
  items: [
    {
      item: "Devir",
      description: "31.01.2022-31.01.2022",
      quantity: 1,
      amount: 7000,
    },
    {
      item: "GGECICI",
      description: "01012021-31122021",
      quantity: 2,
      amount: 6000,
    },
    {
      item: "KDV1",
      description: "01012021-31122021",
      quantity: 1,
      amount: 2000,
    },
  ],
  subtotal: 15000,
  paid: 0,
  invoice_nr: 1234,
};

createInvoice(invoice, "invoice.pdf");
