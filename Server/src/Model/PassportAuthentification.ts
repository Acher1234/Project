import passportLocal from "passport-local";
import database from './DatabaseClass'
import {Profile} from "passport";
const GoogleTokenStrategy = require('passport-token-google2').Strategy
var Strategie = passportLocal.Strategy;
var data = database.CreateObject();//verifier si une instance existe et l envoyer ou sinon en creer une
import variable from "../Variable";


function passportInitialisation(passport:any) {
    passport.use(new Strategie(
        {
            usernameField: 'userName',
            passwordField: 'password'
        },
        async function (usernameField, passwordField, done) {
            var possible = await data.recupUserOnEmailPassword(usernameField, passwordField);
            if (possible != null) {
                return done(null, possible)
            }
            possible = await data.recupUseronUsernamePassword(usernameField, passwordField);
            if (possible != null) {
                return done(null, possible)
            }
            return done(null, false);
        }
    ))

    passport.use(new GoogleTokenStrategy({
            clientID: variable.ClientID,
            clientSecret: variable.clientSecret
        },
        async function(accessToken:any, refreshToken:any, profile:any, done:any) {
            console.log(profile)
            var user = await data.Usergoogle(profile);
            done(null, user);
        }));
   /* passport.use(new GoogleStrategy({
            clientID: variable.ClientID,
            clientSecret: variable.clientSecret ,
            callbackURL: '/google/redirect',
            passReqToCallback:true
        },
        async function(accessToken: String, refreshToken: String, profile: Profile, cb: any) {
            console.log(profile)
            var user = await data.Usergoogle(profile);
            cb(null,user);
        }
    ));*/

    passport.serializeUser(function (user: any, done: any) {
        done(null, user._id);
    })

    passport.deserializeUser(async function (id: any, done: any) {
        var x = await data.recupUseronid(id);
        done(null,x);
    })
}

export default passportInitialisation;