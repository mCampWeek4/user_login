// models/User.js
var crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userid: {
            type: DataTypes.STRING(21),
            allowNull: false,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
        },
        salt: {
            type: DataTypes.STRING,
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
    User.createSalt = () =>
        new Promise((resolve, reject) => {
            crypto.randomBytes(64, (err, buf) => {
                if (err) reject(err);
                resolve(buf.toString('base64'));
            });
        });

    User.createHashedPassword = (plainPassword) =>
        new Promise(async (resolve, reject) => {
            const salt = await User.createSalt();
            crypto.pbkdf2(plainPassword, salt, 72277, 64, 'sha512', (err, key) => {
                if (err) reject(err);
                resolve({ password: key.toString('base64'), salt });
            });
        });

    User.compareHashPassword = (curPassword, oriPassword, salt) =>
        new Promise(async (resolve, reject) => {
            crypto.pbkdf2(curPassword, salt, 72277, 64, 'sha512', (err, key) => {
                if (err) reject(err);
                return (key.toString('base64') == oriPassword);
            });
        });
        

    User.setSaltAndPassword = async function(user) {
        if(user.changed('password')) {
            const {password, salt} = await User.createHashedPassword(user.password);
            user.password = password;
            user.salt = salt;
        }
    }

    User.beforeCreate(User.setSaltAndPassword);
    User.beforeUpdate(User.setSaltAndPassword);

    User.associate = (models) => {
        models.User.hasMany(models.Refrigerator, { foreignKey: 'userIdFridge', sourceKey: 'id' });
        models.User.hasMany(models.Refrigerator, { foreignKey: 'userIdFridge', sourceKey: 'id' });
    }

    return User;
};