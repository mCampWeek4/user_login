
module.exports = (sequelize, DataTypes) => {
    const Refrigerator = sequelize.define("Refrigerator", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: "refrigerator"
    });

    Refrigerator.associate = (models) => {
        models.Refrigerator.belongsTo(models.User, {foreignKey: 'userIdFridge', targetKey: 'id' });
        models.Refrigerator.belongsTo(models.Ingredient, { foreignKey: 'ingredientIdFridge', targetKey: 'id' });
    }

    return Refrigerator;
}