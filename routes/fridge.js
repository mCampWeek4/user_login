// routes/fridge.js

const express = require('express');
const models = require('../models/index.js');
const router = express.Router();
const sequelize = require('sequelize');
const op = sequelize.Op;

// 내 냉장고의 재료 보는 페이지 get
// 내 재료와 모든 재료의 list를 반환
router.get('/ingredient', async (req, res) => {
    try {
        var errors = {};
        var isValid = true;

        if(!req.body.id) {
            isValid = false;
            errors.id = 'ID is required!';
        }

        if(isValid) {
            const uid = parseInt(req.body.id, 10);

            const myIng = await models.Refrigerator.findAll({
                attributes: ['ingredientIdFridge'],
                where: {userIdFridge: uid}
            })

            var allIng = await models.Ingredient.findAll();

            res.send({
                'myIngredient': myIng,
                'allIngredient': allIng
            });
        }
        else {
            //req.flash('errors',errors);
            res.redirect('/');
        }   
    } catch (err) {
        console.error(err);
    }
});

router.post('/ingredient/add', async(req, res) => {
    try{
        var errors = {};
        var isValid = true;

        if(!req.body.id) {
            isValid = false;
            errors.id = 'ID is required!';
        }
        if(!req.body.ingredientId){
            isValid = false;
            errors.ingredientId = 'Ingredient is required!';
        }

        if(isValid) {
            const uid = parseInt(req.body.id, 10);
            const iid = parseInt(req.body.ingredientId, 10);

            await models.Refrigerator.create({
                userIdFridge: uid,
                ingredientIdFridge: iid
            })
            res.send('insert successs');  
        }
        else {
            //req.flash('errors',errors);
        }
        res.redirect('/ingredient');
    } catch (err) {
        console.error(err);
    }
});

router.post('/ingredient/delete', async(req, res) => {
    try {
        var errors = {};
        var isValid = true;

        if(!req.body.id) {
            isValid = false;
            errors.id = 'ID is required!';
        }
        if(!req.body.ingredientId){
            isValid = false;
            errors.ingredientId = 'Ingredient is required!';
        }

        if(isValid) {
            const uid = parseInt(req.body.id, 10);
            const iid = parseInt(req.body.ingredientId, 10);

            await models.Refrigerator.destroy({
                where: {
                    userIdFridge: uid,
                    ingredientIdFridge: iid,
                }
            });
            res.send('delete successs');
        }
        else {
            //req.flash('errors',errors);
        }
        res.redirect('/ingredient');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;

