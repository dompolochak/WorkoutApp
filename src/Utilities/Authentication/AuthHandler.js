import axios from 'axios';
import ROUTES from '../routes.js';

class AuthHandler{
    constructor(){
        this.authenticated =true;
    }

    isAuthenticated=()=>this.authenticated;

    checkAuthentication(){
        return new Promise((resolve)=>{
            if(this.authenticated)
                resolve();
            else 
            {
                //not authenticated run backend check
                axios.get(ROUTES.checkAuthentication)
                    .then(()=>{
                        this.authenticated = true;
                        resolve();
                    })
                    .catch(()=>{
                        this.authenticated = false;
                        resolve();
                    });
                    //resolve() = return back to App.js ComponentDidMount()
            }
            
        });
    }
    //pre: take username, email, and password from login page
    //post: if register successful resolve promise, else reject
    requestRegistration(username, email, password)
    {
        console.log("requesting registration");
        return new Promise((resolve,reject)=>{
            axios.post(ROUTES.register,{
                username: username,
                email: email,
                password: password,
            })
            .then(results=>{
                this.authenticated = true;
                resolve(results);
            })
            .catch(error=>{
                this.authenticated = false;
                reject(error);
            });
           
        });
    }
    //pre: take user info from login page
    //post: attempt login and resolve or reject
    requestLogin(username, password){
        return new Promise((resolve,reject)=>{
            axios.post(ROUTES.login,{
                username: username,
                password: password
            })
            .then(results=>{
                this.authenticated = true;
                resolve(results);
            })
            .catch(error=>{
                this.authenticated = false;
                reject(error);
            })
        });
    }
}

const auth = new AuthHandler();

export default auth;