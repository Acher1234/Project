import Database from "../Model/DatabaseClass";

const data = Database.CreateObject();
async function Login(User:string,Password:string)
{
    var login = await data.recupUseronUsernamePass(User,Password);
    var loginmail = await data.recupUserOnEmailPass(User,Password);
    if(login == null && loginmail == null)
    {
        return 0;
    }
    else
    {
        return 1;
    }
    return 0;
}


export {Login};