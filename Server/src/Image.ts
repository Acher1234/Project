import fs from 'fs' 
import JIMP from 'jimp'

async function resizeImage()
{ 
    var path="/Users/acher/Desktop/project/reactwebfront/public/categorie"
    fs.readdir(path, (err, files) => {
      files.forEach(async function test(file){
        //if(file.includes(".png"))//test  de savoir bonne extension && )
        var recup = await JIMP.read(path+'/'+file);
        await recup.resize(170,180)
        await recup.writeAsync(path+'/'+file)
      });
    });
}

export default test;