const express = require('express');
const model = require("./backendModel.js");
const router = express.Router();

router.get('/test', async function (req, res){
   //var users = await model.addMovieToWatchList(1, 1, 'Hitta nemo', 'http://www.clker.com/cliparts/e/d/7/b/13426765571224390078nemo-md.png');
    var watchList = await model.getToWatchList(1);
    var movies = await model.getAllMoviesFromToWatchList(watchList[0].dataValues.id);
    res.json({
        res: movies
    })
})

module.exports = router;