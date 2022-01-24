// routes/food.js

const express = require('express');
const models = require('../models/index.js');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("get at /food");
    try {
        const food = await models.RecipeDescription.findAll({});

        res.send(food);
    } catch(err) {
        console.error(err);
    }
});

router.get('/:foodName', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("get at /food/:foodName");
    try {
        const foodName = req.params.foodName;
        const food = await models.RecipeDescription.findOne({
            where: {name: foodName}
        });
        res.send(food);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;