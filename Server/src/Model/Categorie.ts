export class Categorie//categorie class
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

export default Categorie;
