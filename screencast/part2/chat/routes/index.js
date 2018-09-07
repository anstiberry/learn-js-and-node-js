module.exports = function(app) {

    app.get('/', require('./frontpage').get);

    app.get('/users', require('./users').get);

    app.get('/user/:id', require('./usersById').get);

    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.get('/chat', require('./chat').get);
};