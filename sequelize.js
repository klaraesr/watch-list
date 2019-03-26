const Sequelize = require('sequelize');
const sequelize = new Sequelize('rosquis', 'rosquisadmin', 'upa6fooBie', {
    //host: 'mysql-vt2019.csc.kth.se',
    host: '2001:6b0:1:1300:250:56ff:fe01:25a',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,

    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = () => {

    // Setting up connection between db and sequelize
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        username: {
            type: Sequelize.STRING,
            unique: {args: true, msg: "Username must be unique"}
        },
        password: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING
        },
        deletehash: {
            type: Sequelize.STRING
        }},

        {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });


    const ToWatchList = sequelize.define('toWatchList', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        user_id: {
            type: Sequelize.UUID
        }}, {
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });

    const WatchedList = sequelize.define('watchedList', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        user_id: {
            type: Sequelize.UUID
        }}, {
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });

    const Movie = sequelize.define('movie', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        name: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING

        },
        watchlist_id : {
            type: Sequelize.UUID
        },
        watchedlist_id : {
            type: Sequelize.UUID
        }

    }, {
        underscored: true,
        freezeTableName: true
    });

    /**
     User.hasOne(UserInfo) or User.belongsTo(UserInfo) --> User = source, userInfo = target
     BelongsTo will add the foreignKey on the source where hasOne will add on the target
     **/
    User.hasOne(ToWatchList, {foreignKey: 'user_id'}, {as: 'ToWatchList'}) // should be able to use user.getToWatchList()

    User.hasOne(WatchedList, {foreignKey: 'user_id'}, {as: 'WatchedList'}) // should be able to use user.getWatchedList()

    ToWatchList.hasMany(Movie, {foreignKey: 'watchlist_id', sourceKey: 'id', as:'Movies'}) //toWatchList.getMovies()
    Movie.belongsTo(ToWatchList, {foreignKey: 'watchlist_id', targetKey: 'id'})

    WatchedList.hasMany(Movie, {foreignKey: 'watchedlist_id', sourceKey: 'id', as:'Movies'}) //watchedList.getMovies()
    Movie.belongsTo(ToWatchList, {foreignKey: 'watchedlist_id', targetKey: 'id'})

    sequelize.sync()

    return {
        User, ToWatchList, WatchedList, Movie, sequelize
    }

}
