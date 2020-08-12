import express from 'express'
import {Categorie,Connection} from '../Model/ImportanteClass'
import {Login} from './FonctionForRoutage'
import variable from '../Variable'

function addRoute(app:any,port:number,categorie:Categorie[],passport:any):void
{
    app.post('/', (req:any, res:any) =>
    {
        res.send('!');
    });

    app.get('/', (req:any, res:any) =>
    {
        res.send('!');
    });

    app.get('/isConnected',(req:any, res:any)=>{
        if(req.isAuthenticated())
        {
            res.json({isConnected:true})
        }
        else
        {
            res.json({isConnected:false})
        }
    })

    app.get('/HaveCategorie',(req:any,res:any)=>
    {

    })

    app.post('/Login',passport.authenticate('local',{
    failureRedirect: '/fail'}), function(req:any,res:any){
        res.send('sucess')
    })

    app.get('/google/auth/token',passport.authenticate('google-token', { scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.email'] }),
        function(req:any,res:any)
        {
            res.json({success:'oui'})
        })

    app.get('/recupUser',function (req:any,res:any)
    {
        if(req.user == undefined)
        {
            res.json(null)
        }
        else
        {
            res.json(req.user)
        }
    })

    app.get('/fail',(req:any,res:any)=>
    {
        res.send('error');
    })

    app.listen(port, (err:any) => {
        if (err) {
            return console.error(err);
        }
        return console.log(`server is listening on ${port}`);
    });
}

export  {addRoute};