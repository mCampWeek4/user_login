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

const router = AdminJSExpress.buildRouter(adminJs);
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

models.sequelize.sync().then( () => {
    console.log("DB Connect Success!");
}).catch((err) => {
    console.log("DB Connect Fail!");
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(flash());

// passport
app.use(passport.initialize());
passportConfig();

// routers
app.use('/', require('./routes/home'));

// running
var port = 8000;
app.listen(port, function() {
    console.log('Server on! At http://127.0.0.1:' + port + '/admin');
})