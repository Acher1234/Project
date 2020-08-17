import mongoose from 'mongoose'
import Objet from './Objet'
import User from './Userclass'
import Connection from './Connection'
import Categorie from './Categorie'
import passwordHash from 'password-hash'
import {Profile} from "passport";


class Database 
{
    static instance:Database;
    static numberInstance = 0;
    Ip = "127.0.0.1:27017";
    userName = "Yaacov";//don't forget : if not empty...
    password = "Yaacov"; //don't forget @ if not empty...
    databaseName = "ProjectWeb";
    ModelCategorie:mongoose.Model<any>; 
    ModelUser:mongoose.Model<any>;
    ModelObjet:mongoose.Model<any>;

    static CreateObject():Database
    {
        if(Database.numberInstance == 0)
        {
            Database.instance = new Database();
            Database.numberInstance++;
            return Database.instance
        }
        else
        {
            return Database.instance;
        }
    }

    constructor()
    {
        this.ModelCategorie = this.giveCategorieModel();
        this.ModelUser = this.giveUserModel();
        this.ModelObjet = this.giveObjetModel()
        mongoose.connect('mongodb+srv://'+this.userName+':'+this.password+'@projectwebmahon.irhxy.mongodb.net/'+this.databaseName+'?retryWrites=true&w=majority'
            , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return this;
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

    async addUser(user:User)
    {
        var findemail = await this.ModelUser.findOne({email:user.email})
        if(findemail != null)
        {
            return 0;//mail already exist
        }
        var finduser =await this.ModelUser.findOne({username:user.username})
        if(finduser != null)
        {
            return 1;//username already exist
        }
        var newuser = new this.ModelUser({email:user.email,nom:user.nom,prenom:user.prenom,username:user.username,password:passwordHash.generate(user.password),address:user.address,idGoogle:'0'})
        await newuser.save()
        return 2;//perfect
    }


    async CreateTest()
    {
        var x =await this.addUser(new User('acherklein0@gmail.com','acher','benjamin','acklein','Poltronc01','26 rue Mouzaia',""));
        console.log(x);
    }
    
    async recupUserOnEmailPassword(mailUser:string,passUser:string)
    {
       var recupUser:User = await this.ModelUser.findOne({email:mailUser});
       if(recupUser != null && passwordHash.verify(passUser,recupUser.password) && recupUser.password != "")
       {
           return recupUser;
       }
       return null;
    }

    async recupUseronUsernamePassword(userName:string,passUser:string)
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
        var userExist = await this.ModelUser.findOne({idGoogle:profil.id})
        var mail =  profil.emails?.pop()?.value;
        var emailExist = await this.ModelUser.findOne({email:mail})
        if(userExist == null)//pas inscrit par google
        {
            if(emailExist == null)//pas inscrit en normal
            {
                this.addUser(new User(mail,profil.name?.familyName,profil.name?.givenName,profil.username,"","",profil.id))
                var userExist = await this.ModelUser.findOne({idGoogle:profil.id})
                return userExist;
            }
            else
            {
                console.log(profil);
                await this.ModelUser.findOneAndUpdate({email:mail},{idGoogle:profil.id});
                var userExist = await this.ModelUser.findOne({idGoogle:profil.id});
                return userExist;
            }
        }
        else
        {
            return userExist;
        }
    }

    //Object
    giveObjetModel()
    {
        var shemaObject = new mongoose.Schema(
            {
                imagePath:{ type:String, default: ""},
                Name:String,
                proprietaireId:String,
                ValuePerDay:Number
            }
        )
        return mongoose.model("Objet",shemaObject);
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