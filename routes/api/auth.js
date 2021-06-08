const express = require('express')
const router = express.Router()
const Owner = require('../../models/Owners')
const owner = require('../../middleware/owner')
const Coach = require('../../models/Coaches')
const coach = require('../../middleware/coach')


// @route   GET api/auth/owner
// @desc    get token
// @access  Public
router.get('/owner', owner, async(req, res) => {
    try {
        const owner = await Owner.findById(req.owner.id)
        res.json(owner)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi server')
    }
})

// @route   GET api/auth/coach
// @desc    get token
// @access  Public
router.get('/coach', coach, async(req, res) => {
    try {
        const coach = await Coach.findById(req.coach.id)
        res.json(coach)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi server')
    }
})

module.exports = router