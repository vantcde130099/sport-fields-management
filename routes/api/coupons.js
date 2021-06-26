const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const Coupon = require('../../models/Coupons')
const Owner = require('../../models/Owners')
const owner = require('../../middleware/owner')

// @route   PUT /api/coupons/update
// @desc    Owner update a new coupon
// @access  Private
router.put(
  '/update',
  owner,
  [
    check('id', 'Vui lòng truyền ID').matches(/^[0-9a-fA-F]{24}$/),
    check('sportType', 'Vui lòng không để trống').not().isEmpty(),
    check('fieldType', 'Vui lòng không để trống').not().isEmpty(),
    check('discount', 'Vui lòng nhập số phần trăm giảm giá').isNumeric(),
    check('start', 'Vui lòng nhập ngày bắt đầu').not().isEmpty(),
    check('end', 'Vui lòng nhập ngày kết thúc').not().isEmpty(),
    check('quantity', 'Vui lòng số lượng').isNumeric().not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      id,
      sportType,
      fieldType,
      discount,
      start,
      end,
      open,
      close,
      quantity
    } = req.body

    //execute date data
    const [hourStart, minStart] = start.hours.split(':')
    const [dayStart, monthStart, yearStart] = start.date.split('/')
    const [hourEnd, minEnd] = end.hours.split(':')
    const [dayEnd, monthEnd, yearEnd] = end.date.split('/')

    const timeStart = new Date(
      yearStart,
      monthStart,
      dayStart,
      hourStart,
      minStart
    )
    const timeEnd = new Date(yearEnd, monthEnd, dayEnd, hourEnd, minEnd)

    let inDayOpen = null
    let inDayClose = null

    if (open && close) {
      const [hourOpen, minOpen] = open.split(':')
      const [hourClose, minClose] = close.split(':')

      inDayOpen = parseInt(hourOpen) * 60 + parseInt(minOpen)
      inDayClose = parseInt(hourClose) * 60 + parseInt(minClose)
    }

    const type = { sportType, fieldType }

    try {
      //update coupon
      const existCoupon = await Coupon.findOneAndUpdate(
        {
          _id: id,
          owner: req.owner.id
        },
        {
          type,
          inDayOpen,
          inDayClose,
          timeStart,
          timeEnd,
          quantity,
          discount
        },
        { new: true }
      )
      if (!existCoupon) {
        return res
          .status(400)
          .json({ message: 'Lỗi, coupon này không tồn tại' })
      }

      res
        .status(200)
        .json({ message: `Thay đổi thành công coupon ${existCoupon.code}` })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Lỗi server' })
    }
  }
)

// @route   PUT /api/coupons/remove
// @desc    Owner remove a new coupon
// @access  Private
router.delete(
  '/remove',
  owner,
  [check('id', 'Vui lòng truyền ID').matches(/^[0-9a-fA-F]{24}$/)],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.body

    try {
      const coupon = await Coupon.findOneAndDelete({
        _id: id,
        owner: req.owner.id
      })

      res.status(200).json({ message: `Xóa thành công coupon ${coupon.code}` })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Lỗi server' })
    }
  }
)

module.exports = router
