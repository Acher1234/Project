import e from "express";

export class Connection
{
    connection:boolean = false;
    constructor(_connexion:boolean)
    {
        this.connection = _connexion;
    }
}

export default Connection

