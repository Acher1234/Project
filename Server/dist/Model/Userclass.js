"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(email, nom, prenom, username, password, address, idGoogle) {
        this.imagePath = "";
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.username = username;
        this.password = password;
        this.address = address;
        this.idGoogle = idGoogle;
    }
    User.prototype.changePictures = function (file) {
        this.imagePath = this.imagePath + file;
    };
    User.ImagePath = "../../ImageFile/UserImage";
    return User;
}());
exports.User = User;
exports.default = User;
