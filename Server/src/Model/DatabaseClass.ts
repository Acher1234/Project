import mongoose from 'mongoose'
import {Categorie,User,Objet} from './ImportanteClass'
import passwordHash from 'password-hash'
import {Profile} from "passport";


class Database 
{
    static objet:Database;
    static numberInstance = 0 ;
    Ip = "127.0.0.1:27017";
    userName = "";//don't forget : if not empty...
    password = ""; //don't forget @ if not empty...
    databaseName = "/ProjectWeb";
    ModelCategorie:mongoose.Model<any>; 
    ModelUser:mongoose.Model<any>;
    ModelObjet:mongoose.Model<any>;

    static CreateObject():Database
    {
        if(Database.numberInstance == 0)
        {
            Database.objet = new Database();
            Database.numberInstance++;
            return Database.objet
        }
        else
        {
            return Database.objet;
        }
    }

    constructor()
    {
        this.ModelCategorie = this.giveCategorieModel();
        this.ModelUser = this.giveUserModel();
        this.ModelObjet = this.giveObjetModel()
        mongoose.connect('mongodb://' + this.userName + this.password + this.Ip + this.databaseName, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('mongodb://' + this.userName + this.password + this.Ip + this.databaseName);
        Database.objet = this;
        Database.numberInstance+=1;
    }

    //Categorie

    async addCategorie(categorieObject:Categorie)
    {
        var tempCategorie = new this.ModelCategorie({'categorieName' : categorieObject.NameCategorie,'ImagePath' : categorieObject.imagePath})
        await tempCategorie.save();
    } 
    async RecupCategorie()
    {
        var tabReturn : Categorie[] = new Array<Categorie>();
        var tempCategorie = await this.ModelCategorie.find({});
        tempCategorie.forEach((element) => {
            tabReturn.push(new Categorie(element.categorieName,element.ImagePath));
        });
        return tabReturn;
    } 


    giveCategorieModel():mongoose.Model<any, {}>
    {
    var ShemacCategorie = new mongoose.Schema({
    'categorieName' : String,
    'ImagePath': String
    })
    return mongoose.model("categorie",ShemacCategorie);
    }




    //User
    giveUserModel()
    {
        var shemaUser = new mongoose.Schema(
            {
                imagePath:{ type:String, default: ""},
                email:String,
                nom:String,
                prenom:String,
                username:String,
                password:String,
                adress:String,
                idGoogle:String
            }
        )
        return mongoose.model("User",shemaUser);
    }

    async AddUser(user:User)
    {
        var findemail = await this.ModelUser.findOne({email:user.email})
        if(findemail != null)
        {
            return 0;
        }
        var finduser =await this.ModelUser.findOne({username:user.username})
        if(finduser != null)
        {
            return 1;
        }
        var newuser = new this.ModelUser({email:user.email,nom:user.nom,prenom:user.prenom,username:user.username,password:passwordHash.generate(user.password),adress:user.adress,idGoogle:'0'})
        await newuser.save()
        return 2;
    }

    async recupUserOnEmailPass(mailUser:string,passUser:string)
    {
       var recupUser:User = await this.ModelUser.findOne({email:mailUser});
       if(recupUser != null && passwordHash.verify(passUser,recupUser.password) && recupUser.password != "")
       {
           return recupUser;
       }
       return null;
    }

    async recupUseronUsernamePass(userName:string,passUser:string)
    {
        var recupUser:User = await this.ModelUser.findOne({username:userName})
        if(recupUser != null && passwordHash.verify(passUser,recupUser.password) && recupUser.password != "")
        {
            return recupUser;
        }
        return null;
    }

    async recupUseronid(id:string)
    {
        var recupUser:User = await this.ModelUser.findOne({_id:id})
        return recupUser;
    }

    async Usergoogle(profil:Profile)
    {
        var Userexist = await this.ModelUser.findOne({idGoogle:profil.id})
        var mail =  profil.emails?.pop()?.value;
        var Emailexist = await this.ModelUser.findOne({email:mail})
        if(Userexist == null)
        {
            if(Emailexist == null)
            {
                this.AddUser(new User(mail,profil.name?.familyName,profil.name?.givenName,profil.username,"","",profil.id))
                var Userexist = await this.ModelUser.findOne({idGoogle:profil.id})
            }
            else
            {
                this.ModelUser.update({email:mail},{$set:{idGoogle:profil.id}})
            }
        }
        else
        {
            return Userexist;
        }
    }

    //Object
    giveObjetModel()
    {
        var shemaObjet = new mongoose.Schema(
            {
                imagePath:{ type:String, default: ""},
                Name:String,
                proprietaireId:String,
                ValuePerDay:Number
            }
        )
        return mongoose.model("Objet",shemaObjet);
    }
    async addObjetToDataBase(AddObject:Objet)
    {
       await new this.ModelObjet({imagePath:AddObject.picture,Name:AddObject.Name,proprietaireId:AddObject.proprietaireId,ValuePerDay:AddObject.ValuePerDay}).save();
    }
    async recuperObjetFromDataBase(skipNumber:number)
    {
        await this.ModelObjet.find({}).skip(skipNumber*15).limit(15)
    }

}

export default Database;