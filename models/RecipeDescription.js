var sequelize = require('sequelize');
const { Sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
    const RecipeDescription = sequelize.define("RecipeDescription", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        foodName: {
            type: DataTypes.STRING(31),
            allowNull: false,
            unique: true
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        class: {
            type: DataTypes.STRING(21),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(301),
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(101),
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING(101),
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "recipeDescription"
    });

    RecipeDescription.associate = (models) => {
        models.RecipeDescription.hasMany(models.RecipeIngredient, { foreignKey: 'decriptionIdRecipe', sourceKey: 'id' });
    }

    return RecipeDescription;
}