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
}

const auth = new AuthHandler();

export default auth;