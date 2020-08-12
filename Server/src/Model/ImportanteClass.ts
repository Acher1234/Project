import e from "express";

class Connection
{
    connection:boolean = false;
    constructor(_connexion:boolean)
    {
        this.connection = _connexion;
    }
}
class Categorie
{
    NameCategorie:string;
    imagePath:string;
    static ImageFolder:string = "../../ImageFile"

    constructor(Name:string,Path:string,)
    {
        this.NameCategorie = Name;
        this.imagePath = Categorie.ImageFolder + Path;
    }
}
class User
{
    imagePath:string = "";
    email:String | undefined;
    nom:String | undefined;
    prenom:String | undefined;
    idGoogle:any;
    username:string | undefined;
    password:string;
    adress:string;
    static ImagePath = "../../ImageFile/UserImage";

    constructor(email: String | undefined, nom: String | undefined, prenom: String | undefined, username: string | undefined, password: string, adress: string, idGoogle: any)
    {
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.username = username;
        this.password = password;
        this.adress =adress;
        this.idGoogle = idGoogle;
    }
    changePictures(file:string)
    {
        this.imagePath = this.imagePath + file;
    }
}

class Objet
{
    picture:String
    proprietaireId:String
    Name:String
    ValuePerDay:Number
    constructor(picture:String,proprietaireId:String,Name:String,ValuePerDay:Number) {
        this.picture = picture
        this.proprietaireId = proprietaireId
        this.Name = Name
        this.ValuePerDay = ValuePerDay
    }
}

export {Connection,Categorie,User,Objet}