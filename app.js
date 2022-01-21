// app.js
var express = require('express');
var app = express();
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');

const adminJs = new AdminJS({
  databases: [],
  rootPath: '/admin',
});

const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router)

// running
var port = 8000;
app.listen(port, function() {
    console.log('Server on! At http://127.0.0.1:' + port);
})

