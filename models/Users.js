
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            required: true
        },
        user_id: {
            type: DataTypes.STRING(21),
            allowNull: false,
            required: true
        },
        password: {
            type: DataTypes.STRING(65),
            allowNull: false,
            required: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            required: true
        }

    })
};