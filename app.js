// app.js
var express = require('express');
var app = express();

const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
AdminJS.registerAdapter(require('@adminjs/sequelize'));

const models = require('./models/index.js');

//var flash = require('connect-flash');
var passport = require('passport');
const passportConfig = require('./config/passport')

const adminJs = new AdminJS({
    rootPath: '/admin',
    logoutPath: '/admin/exit',
    loginPath: '/admin/login',
    databases: [models],
    resources: [{
        resource: models.User,
        options: {
            listProperties: ['id', 'name', 'password', 'salt', 'isAdmin'],
            showProperties: ['id', 'name', 'password', 'salt', 'isAdmin'],
            editProperties: ['name', 'password', 'isAdmin']
        }
    }]
});

// option 1 : when admin page without login
const router = AdminJSExpress.buildRouter(adminJs);
// option 2 : when admin page need login to use
/*
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (userid, password) => {
        const user = await models.User.findOne({ where: {userid: userid}});
        if(user) {
            const matched = models.User.compareHashPassword(password, user.password, user.salt);
            if(matched && user.isAdmin) {
                return user;
            }
        }
        return false;
    },
    cookiePassword: 'testtest'
});*/

app.use(adminJs.options.rootPath, router)

models.sequelize.sync().then(() => {
    console.log("DB Connect Success!");
}).catch((err) => {
    console.log("DB Connect Fail!");
    console.log(err);
});

// body-parser n flash
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(flash());

// passport
app.use(passport.initialize());
passportConfig();

// routers
app.use('/', require('./routes/home'));
app.use('/user', require('./routes/user'));
app.use('/fridge', require('./routes/fridge'));
app.use('/food', require('./routes/food'));
app.use('/ingredient', require('./routes/ingredient'));
app.use('/recipe', require('./routes/recipe'));

// running
var port = 443;
app.listen(port, function() {
    console.log('Server on! At http://127.0.0.1:' + port + '/admin');
})