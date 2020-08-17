"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoute = void 0;
var Userclass_1 = __importDefault(require("../Model/Userclass"));
var DatabaseClass_1 = __importDefault(require("../Model/DatabaseClass"));
var db = DatabaseClass_1.default.CreateObject();
function addRoute(app, port, categorie, passport) {
    app.post('/', function (req, res) {
        res.send('!');
    });
    app.get('/', function (req, res) {
        res.send('!');
    });
    app.get('/isConnected', function (req, res) {
        if (req.isAuthenticated()) {
            res.json({ isConnected: true });
        }
        else {
            res.json({ isConnected: false });
        }
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
    app.post('/createUser', function (req, res) {
        if (req.user == undefined) {
            res.send('error');
        }
        else {
            var user = new Userclass_1.default(req.body.email, req.body.lastName, req.body.name, req.body.lastName, req.body.userName, req.body.password, 0);
            //user.changePictures(req.body.pic);
            db.addUser(user);
        }
    });
    app.listen(port, function (err) {
        if (err) {
            return console.error(err);
        }
        return console.log("server is listening on " + port);
    });
}
exports.addRoute = addRoute;
