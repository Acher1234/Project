"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Categorie = exports.Connection = void 0;
var Connection = /** @class */ (function () {
    function Connection(_connexion) {
        this.connection = false;
        this.connection = _connexion;
    }
    return Connection;
}());
exports.Connection = Connection;
var Categorie = /** @class */ (function () {
    function Categorie(Name, Path) {
        this.NameCategorie = Name;
        this.imagePath = Categorie.ImageFolder + Path;
    }
    Categorie.ImageFolder = "../../ImageFile";
    return Categorie;
}());
exports.Categorie = Categorie;
var User = /** @class */ (function () {
    function User(email, nom, prenom, username, password, adress, idGoogle) {
        this.imagePath = "";
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.username = username;
        this.password = password;
        this.adress = adress;
        this.idGoogle = idGoogle;
    }
    User.prototype.changePictures = function (file) {
        this.imagePath = this.imagePath + file;
    };
    User.ImagePath = "../../ImageFile/UserImage";
    return User;
}());
exports.User = User;
