// routes/home.js

const express = require('express');
const router = express.Router();
const models = require('../models/index.js')
const passport = require('passport');

const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');

router.get("/login", (req, res) => {

});

router.post("/login", (req, res, next) => {    
    var errors = {};
    var isValid = true;

    if(!req.body.name) {
        isValid = false;
        errors.name = 'ID is required!';
    }
    if(!req.body.password) {
        isValid = false;
        errors.password = 'Password is required!'
    }

    if(isValid){
        passport.authenticate('local-login', (passportError, user, info) => {
            if (passportError) {
                res.status(400).json({ message: info.reason });
                return;
            }
        
            // user데이터를 통해 로그인 진행
            req.login(user, { session: false }, (loginError) => {
                if (loginError) {
                  res.send(loginError);
                  return;
                }
                // 클라이언트에게 JWT생성 후 반환
                const token = jwt.sign(
                    { name: user.name },
                    secretObj.secret,
                    {
                        expiresIn: '5m'
                    }
                );
                res.json({ token: token });
            });
        })(req, res, next);
    }
    else {
        req.flash('errors',errors);
        res.redirect('/login');
    }
});

module.exports = router;