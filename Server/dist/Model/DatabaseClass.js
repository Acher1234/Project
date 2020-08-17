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
var Userclass_1 = __importDefault(require("./Userclass"));
var Categorie_1 = __importDefault(require("./Categorie"));
var password_hash_1 = __importDefault(require("password-hash"));
var Database = /** @class */ (function () {
    function Database() {
        this.userName = "Acklein"; //don't forget : if not empty...
        this.password = "ProjectMahon"; //don't forget @ if not empty...
        this.databaseName = "ProjectWeb";
        this.ModelCategorie = this.giveCategorieModel();
        this.ModelUser = this.giveUserModel();
        this.ModelObjet = this.giveObjetModel();
        mongoose_1.default.connect('mongodb+srv://' + this.userName + ':' + this.password + '@cluster0.0yfnx.azure.mongodb.net/' + this.databaseName + '?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return this;
    }
    Database.CreateObject = function () {
        if (Database.numberInstance == 0) {
            Database.instance = new Database();
            Database.numberInstance++;
            return Database.instance;
        }
        else {
            return Database.instance;
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
                            tabReturn.push(new Categorie_1.default(element.categorieName, element.ImagePath));
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
    Database.prototype.addUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var findemail, finduser, newuser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ModelUser.findOne({ email: user.email })];
                    case 1:
                        findemail = _a.sent();
                        if (findemail != null) {
                            return [2 /*return*/, 0]; //mail already exist
                        }
                        return [4 /*yield*/, this.ModelUser.findOne({ username: user.username })];
                    case 2:
                        finduser = _a.sent();
                        if (finduser != null) {
                            return [2 /*return*/, 1]; //username already exist
                        }
                        newuser = new this.ModelUser({ email: user.email, nom: user.nom, prenom: user.prenom, username: user.username, password: password_hash_1.default.generate(user.password), address: user.address, idGoogle: '0' });
                        return [4 /*yield*/, newuser.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, 2]; //perfect
                }
            });
        });
    };
    Database.prototype.CreateTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addUser(new Userclass_1.default('acherklein0@gmail.com', 'acher', 'benjamin', 'acklein', 'Poltronc01', '26 rue Mouzaia', ""))];
                    case 1:
                        x = _a.sent();
                        console.log(x);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.recupUserOnEmailPassword = function (mailUser, passUser) {
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
    Database.prototype.recupUseronUsernamePassword = function (userName, passUser) {
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
            var userExist, mail, emailExist, userExist, userExist;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.ModelUser.findOne({ idGoogle: profil.id })];
                    case 1:
                        userExist = _e.sent();
                        mail = (_b = (_a = profil.emails) === null || _a === void 0 ? void 0 : _a.pop()) === null || _b === void 0 ? void 0 : _b.value;
                        return [4 /*yield*/, this.ModelUser.findOne({ email: mail })];
                    case 2:
                        emailExist = _e.sent();
                        if (!(userExist == null)) return [3 /*break*/, 8];
                        if (!(emailExist == null)) return [3 /*break*/, 4];
                        this.addUser(new Userclass_1.default(mail, (_c = profil.name) === null || _c === void 0 ? void 0 : _c.familyName, (_d = profil.name) === null || _d === void 0 ? void 0 : _d.givenName, profil.username, "", "", profil.id));
                        return [4 /*yield*/, this.ModelUser.findOne({ idGoogle: profil.id })];
                    case 3:
                        userExist = _e.sent();
                        return [2 /*return*/, userExist];
                    case 4:
                        console.log(profil);
                        return [4 /*yield*/, this.ModelUser.findOneAndUpdate({ email: mail }, { idGoogle: profil.id })];
                    case 5:
                        _e.sent();
                        return [4 /*yield*/, this.ModelUser.findOne({ idGoogle: profil.id })];
                    case 6:
                        userExist = _e.sent();
                        return [2 /*return*/, userExist];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, userExist];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    //Object
    Database.prototype.giveObjetModel = function () {
        var shemaObject = new mongoose_1.default.Schema({
            imagePath: { type: String, default: "" },
            Name: String,
            proprietaireId: String,
            ValuePerDay: Number
        });
        return mongoose_1.default.model("Objet", shemaObject);
    };
    Database.prototype.addObjetToDataBase = function (AddObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new this.ModelObjet({ imagePath: AddObject.picture, Name: AddObject.Name, proprietaireId: AddObject.proprietaireId, ValuePerDay: AddObject.ValuePerDay }).save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.recuperObjetFromDataBase = function (skipNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ModelObjet.find({}).skip(skipNumber * 15).limit(15)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.numberInstance = 0;
    return Database;
}());
exports.default = Database;
