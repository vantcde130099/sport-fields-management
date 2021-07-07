const express = require('express')
const router = express.Router()
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')
const config = require('config')
const url = config.get('mongoURI')

const owner = require('../../middleware/owner')
const Owner = require('../../models/Owners')
const Field = require('../../models/Fields')

// @route   GET /:id
// @desc    Get image by id
// @access  Public
router.get('/:image_id', function (req, res) {
  Grid.mongo = mongoose.mongo
  var conn = mongoose.createConnection(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  conn.once('open', () => {
    gfs = Grid(conn.db)
    const id = new mongoose.Types.ObjectId(req.params.image_id)
    gfs.collection('photos') //bucket collection
    const readstream = gfs.createReadStream({ _id: id })
    readstream.on('error', function (err) {
      res.send('No image found with that title')
    })
    readstream.pipe(res)
  })
})

// @route   DELETE /remove
// @desc    Remove image of field by id
// @access  Private
router.delete('/remove', owner, async (req, res) => {
  const { fieldId, imageId } = req.query

  try {
    //check field of owner
    const owner = await Owner.findById(req.owner.id, { fields: true })
    const indexOfField = owner.fields.indexOf(fieldId)

    if (indexOfField == -1) {
      return res.status(400).json({ message: 'Lỗi, Sân không thuộc chủ sân.' })
    }

    //find index of image in field
    let field = await Field.findById(fieldId, { image: true })
    const indexOfImage = field.image.indexOf(imageId)

    if (indexOfImage == -1) {
      return res
        .status(400)
        .json({ message: 'Không tìm thấy ảnh, vui lòng thử lại.' })
    }

    //remove image from field
    await field.image.splice(indexOfImage, 1)
    await field.save()

    //create connection to DB
    const conn = mongoose.createConnection(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    Grid.mongo = mongoose.mongo

    //open connect in once
    await conn.once('open', () => {
      gfs = Grid(conn.db)
      const id = new mongoose.Types.ObjectId(imageId)

      //remove in DB
      gfs.remove({ _id: id, root: 'photos' })
      res.status(200).json({ message: 'Xóa ảnh thành công' })
    })
  } catch (error) {
    console.error(error.message)
    return res.status(400).send('Lỗi server')
  }
})

module.exports = router
