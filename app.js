// app.js
var express = require('express');
var app = express();

const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize')

AdminJS.registerAdapter(AdminJSSequelize);

const models = require('./models/index.js')
const User = require('./models/User');

const adminJs = new AdminJS({
  databases: [models],
  rootPath: '/admin',
});

//const router = AdminJSExpress.buildRouter(adminJs);
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async(userid, password) => {
        if(User.password === password && User.userid === userid && User.isAdmin === 1) {
            return User;
        }
        return null
    }
});

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

