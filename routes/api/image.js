const express = require("express");
const router = express.Router();
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const config = require("config");

const url = config.get("mongoURI");

// @route   GET /:id
// @desc    Get image by id
// @access  Public
router.get("/:image_id", function (req, res) {
  Grid.mongo = mongoose.mongo;
  var conn = mongoose.createConnection(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  conn.once("open", () => {
    gfs = Grid(conn.db);
    const id = new mongoose.Types.ObjectId(req.params.image_id);
    gfs.collection("photos"); //bucket collection
    const readstream = gfs.createReadStream({ _id: id });
    readstream.on("error", function (err) {
      res.send("No image found with that title");
    });
    readstream.pipe(res);
  });
});

module.exports = router;
