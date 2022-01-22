// app.js
var express = require('express');
var app = express();

const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize')

AdminJS.registerAdapter(AdminJSSequelize);

var models = require('./models/index.js')
//var User = require('./models/User');

const adminJs = new AdminJS({
    rootPath: '/admin',
    logoutPath: '/admin/exit',
    loginPath: '/admin/login',
    databases: [models],
    resources: [{
        resource: models.User,
        options: {
            listProperties: ['id', 'userid', 'password', 'salt', 'isAdmin']
        }
    }]
});

const router = AdminJSExpress.buildRouter(adminJs);
/*
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async(userid, password) => {
        if(models.User.compareHashPassword(password, models.User.password, models.User.salt) && models.User.userid === userid && models.User.isAdmin === 1) {
            return models.User;
        }
        return null
    }
});*/

app.use(adminJs.options.rootPath, router)

models.sequelize.sync().then( () => {
    console.log("DB Connect Success!");
}).catch((err) => {
    console.log("DB Connect Fail!");
    console.log(err);
});

// running
var port = 8000;
app.listen(port, function() {
    console.log('Server on! At http://127.0.0.1:' + port);
})