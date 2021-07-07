const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Item = require('../../models/Items')
const owner = require('../../middleware/owner')
const upload = require('../../middleware/upload')
const Owner = require('../../models/Owners')

// @route   POST /api/items/add
// @desc    Owner add items
// @access  Private
router.post('/add', owner, upload.single('image'), async (req, res) => {
  req.body = JSON.parse(req.body.data)

  await check('name', 'Vui lòng nhập tên sản phẩm').notEmpty().run(req)
  await check('price', 'Vui lòng nhập tên sản phẩm').notEmpty().run(req)
  await check('price', 'Vui lòng nhập số tiền').isNumeric().run(req)
  await check('inStock', 'Vui lòng nhập tên sản phẩm').notEmpty().run(req)
  await check('inStock', 'Vui lòng nhập số lượng').isNumeric().run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const owner = await Owner.findById(req.owner.id).select('-password')
  const { name, inStock, price } = req.body

  try {
    //check if item exist
    const items = await Item.find({
      //get all items of owner
      _id: { $in: owner.items },
      name
    })

    if (items.length > 0) {
      return res.status(400).json({ message: 'Sản phẩm đã tồn tại' })
    }

    const image = req.file.id

    const newItem = await new Item({ name, inStock, price, image }).save()
    owner.items.push(newItem.id)

    await owner.save()
    return res.status(200).json({ message: `Thêm thành công ${name}` })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Lỗi server')
  }
})

// @route   GET /api/items/owner
// @desc    Customer get all item in owner
// @access  Public
router.get('/owner', async (req, res) => {
  try {
    const owner = await Owners.findById(req.query.ownerId, (err, result) => {
      if (!result) {
        return res
          .status(400)
          .json({ message: 'Sân này không tồn tại, vui lòng thử lại' })
      }
    })

    //query
    const items = await Item.find(
      {
        _id: { $in: owner.items }
      },
      { name: 1, price: 1, quantity: 1 }
    )

    return res.status(200).json(items)
  } catch (error) {
    console.error(error.message)
    return status(500).send('Lỗi server')
  }
})

module.exports = router
