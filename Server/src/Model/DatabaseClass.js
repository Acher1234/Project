"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ImportanteClass_1 = require("./ImportanteClass");
var password_hash_1 = __importDefault(require("password-hash"));
var Database = /** @class */ (function () {
    function Database() {
        this.Ip = "127.0.0.1:27017";
        this.userName = ""; //don't forget : if not empty...
        this.password = ""; //don't forget @ if not empty...
        this.databaseName = "/ProjectWeb";
        this.ModelCategorie = this.giveCategorieModel();
        this.ModelUser = this.giveUserModel();
        mongoose_1.default.connect('mongodb://' + this.userName + this.password + this.Ip + this.databaseName, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('mongodb://' + this.userName + this.password + this.Ip + this.databaseName);
        Database.objet = this;
        Database.numberInstance += 1;
    }
    Database.CreateObject = function () {
        if (Database.numberInstance == 0) {
            Database.objet = new Database();
            Database.numberInstance++;
            return Database.objet;
        }
        else {
            return Database.objet;
        }
    };
    //Categorie
    Database.prototype.addCategorie = function (categorieObject) {
        return __awaiter(this, void 0, void 0, function () {
            var tempCategorie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempCategorie = new this.ModelCategorie({ 'categorieName': categorieObject.NameCategorie, 'ImagePath': categorieObject.imagePath });
                        return [4 /*yield*/, tempCategorie.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.RecupCategorie = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tabReturn, tempCategorie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tabReturn = new Array();
                        return [4 /*yield*/, this.ModelCategorie.find({})];
                    case 1:
                        tempCategorie = _a.sent();
                        tempCategorie.forEach(function (element) {
                            tabReturn.push(new ImportanteClass_1.Categorie(element.categorieName, element.ImagePath));
                        });
                        return [2 /*return*/, tabReturn];
                }
            });
        });
    };
    Database.prototype.giveCategorieModel = function () {
        var ShemacCategorie = new mongoose_1.default.Schema({
            'categorieName': String,
            'ImagePath': String
        });
        return mongoose_1.default.model("categorie", ShemacCategorie);
    };
    //User
    Database.prototype.giveUserModel = function () {
        var shemaUser = new mongoose_1.default.Schema({
            imagePath: { type: String, default: "" },
            email: String,
            nom: String,
            prenom: String,
            username: String,
            password: String,
            adress: String,
            idGoogle: String
        });
        return mongoose_1.default.model("User", shemaUser);
    };
    Database.prototype.AddUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var findemail, finduser, newuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ModelUser.findOne({ email: user.email })];
                    case 1:
                        findemail = _a.sent();
                        if (findemail != null) {
                            return [2 /*return*/, 0];
                        }
                        return [4 /*yield*/, this.ModelUser.findOne({ username: user.username })];
                    case 2:
                        finduser = _a.sent();
                        if (finduser != null) {
                            return [2 /*return*/, 1];
                        }
                        newuser = new this.ModelUser({ email: user.email, nom: user.nom, prenom: user.prenom, username: user.username, password: password_hash_1.default.generate(user.password), adress: user.adress, idGoogle: '0' });
                        return [4 /*yield*/, newuser.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, 2];
                }
            });
        });
    };
    Database.prototype.recupUserOnEmailPass = function (mailUser, passUser) {
        return __awaiter(this, void 0, void 0, function () {
            var recupUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ModelUser.findOne({ email: mailUser })];
                    case 1:
                        recupUser = _a.sent();
                        if (recupUser != null && password_hash_1.default.verify(passUser, recupUser.password) && recupUser.password != "") {
                            return [2 /*return*/, recupUser];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Database.prototype.recupUseronUsernamePass = function (userName, passUser) {
        return __awaiter(this, void 0, void 0, function () {
            var recupUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ModelUser.findOne({ username: userName })];
                    case 1:
                        recupUser = _a.sent();
                        if (recupUser != null && password_hash_1.default.verify(passUser, recupUser.password) && recupUser.password != "") {
                            return [2 /*return*/, recupUser];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Database.prototype.recupUseronid = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var recupUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ModelUser.findOne({ _id: id })];
                    case 1:
                        recupUser = _a.sent();
                        return [2 /*return*/, recupUser];
                }
            });
        });
    };
    Database.prototype.Usergoogle = function (profil) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var Userexist, mail, Emailexist, Userexist;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.ModelUser.findOne({ idGoogle: profil.id })];
                    case 1:
                        Userexist = _e.sent();
                        mail = (_b = (_a = profil.emails) === null || _a === void 0 ? void 0 : _a.pop()) === null || _b === void 0 ? void 0 : _b.value;
                        return [4 /*yield*/, this.ModelUser.findOne({ email: mail })];
                    case 2:
                        Emailexist = _e.sent();
                        if (!(Userexist == null)) return [3 /*break*/, 6];
                        if (!(Emailexist == null)) return [3 /*break*/, 4];
                        this.AddUser(new ImportanteClass_1.User(mail, (_c = profil.name) === null || _c === void 0 ? void 0 : _c.familyName, (_d = profil.name) === null || _d === void 0 ? void 0 : _d.givenName, profil.username, "", "", profil.id));
                        return [4 /*yield*/, this.ModelUser.findOne({ idGoogle: profil.id })];
                    case 3:
                        Userexist = _e.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.ModelUser.update({ email: mail }, { $set: { idGoogle: profil.id } });
                        _e.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, Userexist];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Database.numberInstance = 0;
    return Database;
}());
exports.default = Database;
