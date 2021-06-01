const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const url = require('../config/default.json').mongoURI
var storage = new GridFsStorage({
    url: url,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos", //collection in mongodb
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});

var uploadFile = multer({ storage: storage })
module.exports = uploadFile;