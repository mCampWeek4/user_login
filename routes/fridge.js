// routes/fridge.js

const express = require('express');
const models = require('../models/index.js');
const router = express.Router();
const passport = require('passport');

// 내 냉장고의 재료 보는 페이지 get
// 내 재료와 모든 재료의 list를 반환
router.post('/ingredient', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("post at /ingredient");
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

            res.send({
                'myIngredient': myIng
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

router.post('/ingredient/add', passport.authenticate('jwt', {session: false}), async(req, res) => {
    console.log("post at /ingredient/add");
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
            });
            res.send( '{"result": "Success"}' );  
        }
        else {
            res.send(errors);
        }
        res.redirect('/fridge/ingredient');
    } catch (err) {
        console.error(err);
    }
});

router.post('/ingredient/delete', passport.authenticate('jwt', {session: false}), async(req, res) => {
    console.log("post at /ingredient/delete");
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
            res.send( '{"result": "Success"}' );  
        }
        else {
            //req.flash('errors',errors);
        }
        res.redirect('/fridge/ingredient');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;