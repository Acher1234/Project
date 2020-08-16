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
    changePictures(file:string)//get/set
    {
        this.imagePath = this.imagePath + file;
    }
}

export default User;