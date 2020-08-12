"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoute = void 0;
function addRoute(app, port, categorie, passport) {
    app.post('/', function (req, res) {
        res.send('!');
    });
    app.get('/', function (req, res) {
        res.send('!salut');
    });
    app.get('/isConnected', function (req, res) {
        if (req.isAuthenticated()) {
            console.log('true is made');
            res.json({ isConnected: true });
        }
        else {
            res.json({ isConnected: false });
        }
    });
    app.post('/HaveCategorie', function (req, res) {
    });
    app.get('/HaveCategorie', function (req, res) {
    });
    app.post('/Login', passport.authenticate('local', {
        failureRedirect: '/fail'
    }), function (req, res) {
        res.send('sucess');
    });
    app.get('/google/auth/token', passport.authenticate('google-token', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }), function (req, res) {
        res.json({ success: 'oui' });
    });
    app.get('/recupUser', function (req, res) {
        if (req.user == undefined) {
            res.json(null);
        }
        else {
            res.json(req.user);
        }
    });
    app.get('/fail', function (req, res) {
        res.send('error');
    });
    app.listen(port, function (err) {
        if (err) {
            return console.error(err);
        }
        return console.log("server is listening on " + port);
    });
}
exports.addRoute = addRoute;
