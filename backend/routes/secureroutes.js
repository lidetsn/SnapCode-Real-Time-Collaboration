const express = require('express');
const router = express.Router()

//displays information tailored to the account of the logged in user
//only authorized users should see this

router.get('/profile', (req, res, next) => {
    res.json({
        message: 'you made it to the secure route',
        user: req.username,
        token: req.query.secret_token
    })
})

module.exports = router