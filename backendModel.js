const seq = require("./sequelize.js")
const {User, ToWatchList, WatchedList, Movie, sequelize} = seq()


exports.createUser = (username, password, image, deletehash) => {
    return User.create({
        username: username,
        password: password,
        image: image,
        deletehash: deletehash
    }).then(async (user) => {
        const toWatch = await ToWatchList.create()
        const watched = await WatchedList.create()
        user.setToWatchList(toWatch)
        user.setWatchedList(watched)
        return user
    }).catch(e => console.log(e))
}

exports.getAllUsers = () => {
    return User.findAll()
        .then(data => {
            return data
        })
        .catch(error => {console.log(error)})
}

exports.getUser = (userId) => {
    return User.findByPk(userId)
        .then(user => {
            return user
        })
        .catch(error => {console.log(error)})
}

exports.getListLength = (userId, toWatch) => {
    return User.findByPk(userId)
        .then(user => {
            if(toWatch) {
                return user.getToWatchList()
                    .then(watchlist => {
                        return watchlist.getMovies()
                            .then(movies => {
                                return movies.length
                            })
                    })
                    .catch(e => console.log(e))
            } else {
                return user.getWatchedList()
                    .then(watchlist => {
                        return watchlist.getMovies()
                            .then(movies => {
                                return movies.length
                            })
                    })
                    .catch(e => console.log(e))
            }
        })
        .catch(e => console.log(e))
}

exports.validateUser = (users, username, password) => {
    var userToReturn;
    users.forEach(function (user) {
        if (user.dataValues.username === username && user.dataValues.password === password) {
            userToReturn = user;
        }
    })
    if(userToReturn === undefined){
        return null;
    }
    else return userToReturn;
}


exports.getToWatchList = (userId) => { //Returnerar en användares to-watch-list baserat på användarens id
    return ToWatchList.findOne({
        where:{
            user_id : userId
        }
    }).then(data => {return data})
        .error(e => console.log(e))
}

exports.getWatchedList = (userId) => { //Returnerar en användares watched-list baserat på användarens id
    return WatchedList.findOne({
        where:{
            user_id : userId
        }
    }).then(data => {return data})
        .error(e => console.log(e))
}

exports.addMovieToWatchList = (listId, movieId, movieName, imgSrc) => {
    return Movie.create({
        id: movieId,
        name: movieName,
        image: imgSrc,
        watchlist_id: listId
    }).then(movie => { //Returns a movie that is connected to a watchlist
        return movie
    })
        .catch(error => {
            if(error.name === 'SequelizeUniqueConstraintError') {
                console.log('contraint error')
                return error.errors[0].message
            } else {

            }
        })
}

exports.addMovieToWatchedList = (listId, movieId, movieName, imgSrc) => {
    return Movie.create({
        id: movieId,
        name: movieName,
        image: imgSrc,
        watchedlist_id: listId
    }).then(movie => { //Returns a movie that is connected to a watchedlist
        return movie
    })
        .catch(error => {
            if(error.name === 'SequelizeUniqueConstraintError') {
                console.log('contraint error')
                return error.errors[0]
            } else {
                //console.log(error)
            }
        })
}

exports.deleteMovieFromToWatchList = (movieId, listId) => {
    return Movie.destroy({
        where:{
            id: movieId,
            watchlist_id: listId
        }
    })
}

exports.deleteMovieFromWatchedList = (movieId, listId) => {
    return Movie.destroy({
        where:{
            id: movieId,
            watchedlist_id: listId
        }
    })
}

exports.getAllMoviesFromToWatchList = (id) => {
    return ToWatchList.findByPk(id)
        .then( list => {
            return list.getMovies()
                .then(movies => {
                    return movies
                })
        })
        .catch(error => {console.log(error)})
}

exports.getAllMoviesFromWatchedList = (id) => {
    return WatchedList.findByPk(id)
        .then(list => {
            return list.getMovies()
        })
        .catch(error => {console.log(error)})
}

//Tar ut dom 5 senaste filmerna från någon lista
exports.getMoviesFromList = (id, idName) => {
    return User.findByPk(id)
        .then(async (user) => {
            let listId = null
            if(idName === 'watchedlist_id'){
                listId = await user.getWatchedList()
            } else {
                listId = await user.getToWatchList()
            }
            return Movie.findAll({where:{[idName]: listId.dataValues.id}, limit: 5, order: [['created_at', 'DESC']]})
                .then(movies => {
                    return movies
                })
                .catch(e => {console.log(e)})
        })
        .catch(e => console.log(e))
}

//Returnerar id till användarens senast tillagda film
exports.getLatestMovie  = async (userId) => {
    const watchedList = await this.getWatchedList(userId)
    return Movie.findAll({
        where: {watchedlist_id: watchedList.dataValues.id},
        limit: 1,
        order: [['created_at', 'DESC']]
    })
        .then(movie => {
            if(movie.length !== 0){
                return movie[0].dataValues.id
            } else {
                return null
            }
        })
}
