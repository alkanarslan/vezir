var Minio = require('minio')
const fs = require("fs");
const path = require('path');
var minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'AKIAIOSFODNN7EXAMPLE',
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
});



minioClient.listBuckets(function(err, buckets) {
    if (err) return console.log(err)
    console.log('buckets :', buckets)
})

const bucketName = "declaration";




const directoryPath = path.join(__dirname, 'pdf');


(async () => {


    fs.readdir(directoryPath, async function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        for (const file of files) {

            if (file.includes(".pdf")) {
                console.log(file);
                const objectFileName = file;
                const fileData = fs.readFileSync(directoryPath +"/"+ file);
                var metaData = {
                    'Content-Type': 'application/pdf'
                }
                const submitFileDataResult = await minioClient
                    .putObject(bucketName, objectFileName, fileData,metaData)
                    .catch((e) => {
                        console.log("Error while creating object from file data: ", e);
                        throw e;
                    });
                console.log("File data submitted successfully: ", submitFileDataResult);
            }
            // Do whatever you want to do with the file

        }
    });

    // create object from file data

})();