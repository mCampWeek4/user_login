// routes/ingredient.js

const express = require('express');
const models = require('../models/index.js');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("get at /ingredient");
    try {
        const allIngredient = await models.Ingredient.findAll({});
        res.send(allIngredient);
    } catch(err) {
        console.error(err);
    }
});

router.get('/:foodId',  passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("get at /ingredient/:foodId");
    try {
        const foodId = parseInt(req.params.foodId, 10);

        const foodIngredient = await models.RecipeIngredient.findAll({
            where: {
                descriptionIdRecipe: foodId
            },
            attributes : ['ingredientIdRecipe', 'amount']
        });

        res.send(foodIngredient);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;