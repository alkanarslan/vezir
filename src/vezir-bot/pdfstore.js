var Minio = require("minio");

var minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "AKIAIOSFODNN7EXAMPLE",
  secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
});

var size = 0;
minioClient.getObject("beyanname", "oku.pdf", function (err, dataStream) {
  if (err) {
    return console.log(err);
  }
  dataStream.on("data", function (chunk) {
    size += chunk.length;
  });
  dataStream.on("end", function () {
    console.log("End. Total size = " + size);
  });
  dataStream.on("error", function (err) {
    console.log(err);
  });
});

minioClient.listBuckets(function (err, buckets) {
  if (err) return console.log(err);
  console.log("buckets :", buckets);
});

var data = [];
var stream = minioClient.listObjectsV2("beyanname", "", true);
stream.on("data", function (obj) {
  data.push(obj);
});
stream.on("end", function (obj) {
  console.log(data);
});
stream.on("error", function (err) {
  console.log(err);
});
