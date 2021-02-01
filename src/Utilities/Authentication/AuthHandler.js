

class AuthHandler{
    constructor(){
        this.authenticated =true;
    }

    isAuthenticated=()=>this.authenticated;
}

const auth = new AuthHandler();

export default auth;