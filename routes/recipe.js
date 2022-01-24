const express = require('express');
const models = require('../models/index.js');
const passport = require('passport');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

const router = express.Router();

const getRecipe = async(req, res) => {
    console.log("post at /recipe");
    try {
        const ingredient = req.body.ingredientIdString;
        const level = req.body.levelString;
        const myTime = parseInt(req.body.time, 10);

        const myIngredients = ingredient.split('.');
        const myLevel = level.split('.');
        const len = parseInt(myIngredients, 10)

        const matchedRecipe = await models.RecipeIngredient.findAll({
            attributes: ['description_id_recipe', [sequelize.fn('COUNT', sequelize.col('ingredient_id_recipe')), 'total']],
            include: models.RecipeDescription,
            where: {
                '$RecipeDescription.level$': {
                    [Op.in]: myLevel
                },
                '$RecipeDescription.time$': {
                    [Op.lte]: myTime
                },
                ingredient_id_recipe: {
                    [Op.in]: myIngredients
                }
            },
            group: ['description_id_recipe'],
            order: [
                [sequelize.fn('COUNT', sequelize.col('ingredient_id_recipe')), 'DESC']
            ],
            limit: 30
        })
        console.log(matchedRecipe);
        res.send(matchedRecipe);
    } catch (err) {
        console.error(err);
    }
}

router.post('/', passport.authenticate('jwt', { session: false }), getRecipe);

module.exports = router;