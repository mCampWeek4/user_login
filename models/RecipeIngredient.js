var sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const RecipeIngredient = sequelize.define("RecipeIngredient", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "recipeIngredient"
    });

    RecipeIngredient.associate = (models) => {
        models.RecipeIngredient.belongsTo(models.RecipeDescription, { foreignKey: 'decriptionIdRecipe', targetKey: 'id' });
        models.RecipeIngredient.belongsTo(models.Ingredient, { foreignKey: 'ingredientIdRecipe', targetKey: 'id' });
    }

    return RecipeIngredient;
}