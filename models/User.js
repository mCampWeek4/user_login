// models/User.js
var crypto = require('crypto');
var sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            required: true
        },
        userid: {
            type: DataTypes.STRING(21),
            allowNull: false,
            required: true
        },
        password: {
            type: DataTypes.STRING(65),
            allowNull: false,
            required: true,
        },
        salt: {
            type: DataTypes.STRING(65),
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            required: true
        }
    }, {
            underscored: true,
            freezeTableName: true,
            tableName: "user"
    });

    // hashing password
    const createSalt = () =>
        new Promise((resolve, reject) => {
            crypto.randomBytes(64, (err, buf) => {
                if (err) reject(err);
                resolve(buf.toString('base64'));
            });
        });

    const createHashedPassword = (plainPassword) =>
        new Promise(async (resolve, reject) => {
            const salt = await createSalt();
            crypto.pbkdf2(plainPassword, salt, 72277, 64, 'sha512', (err, key) => {
                if (err) reject(err);
                resolve({ password: key.toString('base64'), salt });
            });
        });

    const compareHashPassword = function (curPassword, oriPassword, salt) {
        crypto.pbkdf2(curPassword, salt, 72277, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            return (key.toString('base64') == oriPassword);
        });
    }

    const setSaltAndPassword = async function(user) {
        if(user.changed('password')) {
            const {password, salt} = await createHashedPassword(user.password());
            user.password = password;
            user.salt = salt;
        }
    }

    User.beforeCreate(setSaltAndPassword);
    User.beforeUpdate(setSaltAndPassword);

    return User;
};