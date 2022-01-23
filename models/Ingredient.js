
module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("Ingredient", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(31),
            allowNull: false,
            unique: true,
        },
        unit: {
            type: DataTypes.STRING(11),
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
        tableName: "ingredient"
    });

    Ingredient.associate = (models) => {
        models.Ingredient.hasMany(models.Refrigerator, { foreignKey: 'ingredientIdFridge', sourceKey: 'id' });
        models.Ingredient.hasMany(models.RecipeIngredient, { foreignKey: 'ingredientIdRecipe', sourceKey: 'id' });
    }

    return Ingredient;
}