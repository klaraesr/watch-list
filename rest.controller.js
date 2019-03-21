const express = require('express');
const router = express.Router();

router.get('/test', async function (req, res){
    res.json({
        res: "hej från backend"
    })
})

module.exports = router;