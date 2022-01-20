// app.js
var express = require('express');
const AdminJS = require('adminjs');
const AdminJSexpress = require('@adminjs/express');
const models = require("/.models/index.js");

const app = express();

// admin-js
const adminJs = new AdminJS({
    databases: [],
    rootPath: '/admin',
});
const adminRouter = AdminJSexpress.buildRouter(adminJs);

// models
models.sequelize.sync().then( () => {
    console.log("DB Connect Success");
}).catch(err => {
    console.log("DB Connect Fail");
    console.log(err);
});

// for use ejs
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// body-parser
app.use(adminJs.options.rootPath, adminRouter);
app.use(express.json());    // body-parser는 express에 포함되었음
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/', require('./router'));

// running
var port = 8000;
app.listen(port, function() {
    console.log('Server on! At http://127.0.0.1:' + port);
})

