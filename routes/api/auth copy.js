const express = require('express')
const router = express.Router()
const auth = require('../../middleware/owner')
const { check, validationResult } = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Owner = require('../../models/Owner')
const owner = require('../../middleware/owner')


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



module.exports = router