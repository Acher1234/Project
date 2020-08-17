"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categorie = void 0;
var Categorie = /** @class */ (function () {
    function Categorie(Name, Path) {
        this.NameCategorie = Name;
        this.imagePath = Categorie.ImageFolder + Path;
    }
    Categorie.ImageFolder = "../../ImageFile";
    return Categorie;
}());
exports.Categorie = Categorie;
exports.default = Categorie;
