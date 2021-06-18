const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Coupon = require('../../models/Coupons')
const Owner = require('../../models/Owners')
const owner = require('../../middleware/owner')

// @route   POST /api/coupons/create
// @desc    Owner create a new coupon
// @access  Private
router.post(
  '/create',
  owner,
  [
    check('code', 'Vui lòng không để trống').not().isEmpty(),
    check('sportType', 'Vui lòng không để trống').not().isEmpty(),
    check('fieldType', 'Vui lòng không để trống').not().isEmpty(),
    check('discount', 'Vui lòng nhập số phần trăm giảm giá')
      .isNumeric()
      .not()
      .isEmpty(),
    check('start', 'Vui lòng nhập ngày bắt đầu').not().isEmpty(),
    check('end', 'Vui lòng nhập ngày kết thúc').not().isEmpty(),
    check('quantity', 'Vui lòng số lượng').isNumeric().not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { code, sportType, fieldType, discount, start, end, quantity } =
      req.body

    const [hourStart, minStart] = start.hours.split(':')
    const [dayStart, monthStart, yearStart] = start.date.split('/')
    const [hourEnd, minEnd] = end.hours.split(':')
    const [dayEnd, monthEnd, yearEnd] = end.date.split('/')

    const type = { sportType, fieldType }
    try {
      const owner = await Owner.findById(req.owner.id)
      //find if exist
      const existCode = await Coupon.findOne({ owner: owner.id, code })
      console.log(existCode)
      if (existCode) {
        return res.status(400).json({ message: 'Code đã tồn tại' })
      }

      const timeStart = new Date(
        yearStart,
        monthStart,
        dayStart,
        hourStart,
        minStart
      )
      const timeEnd = new Date(yearEnd, monthEnd, dayEnd, hourEnd, minEnd)

      let coupon = new Coupon({
        owner: owner.id,
        code,
        type,
        discount,
        timeStart,
        timeEnd,
        quantity
      })

      await coupon.save()
      return res.status(200).json(req.body)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Lỗi server' })
    }
  }
)

module.exports = router
