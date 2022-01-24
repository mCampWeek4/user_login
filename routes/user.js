// routes/user.js

const express = require('express');
const router = express.Router();
const models = require('../models/index.js');
const passport = require('passport');

// 회원가입 창
router.get('/new', (req, res) => {

});

// 회원가입 처리
router.post('/new', async (req, res) => {
    console.log("post at /user/new");
    try {
        var errors = {};
        var isValid = true;

        if(!req.body.name) {
            isValid = false;
            errors.name = 'ID is required!';
        }
        if(!req.body.password){
            isValid = false;
            errors.password = 'password is required!';
        }

        if(isValid) {
            const name = req.body.name;
            const pw = req.body.password;

            await models.User.create({
                name: name,
                password: pw,
                isAdmin: false
            });
            res.send('Sign Up Complete'); 
        }
        else {
            //req.flash('errors',errors);
        }
        res.redirect('/login');
    } catch(err) {
        console.error(err);
    }
});

// 회원정보 수정창
router.get('/:name/edit', passport.authenticate('jwt', {session: false}), (req, res) => {

});

router.post('/:name/edit', passport.authenticate('jwt', {session: false}), async (req, res) => { 
    console.log("post at /:name/edit");
    try {
        var errors = {};
        var isValid = true;

        if(!req.body.password){
            isValid = false;
            errors.password = 'password is required!';
        }

        if(isValid) {
            const pw = req.body.password;
            const name = req.params.name;

            await models.User.update({
                password: pw
            }, {
                where: {name: name}
            })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                console.error(err);
            });
        }
        else {
            //req.flash('errors',errors);
        }
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }
});


module.exports = router;