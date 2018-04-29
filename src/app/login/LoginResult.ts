import { CVUser } from '../userlist/CVUser'
export class LoginResult {
    user:CVUser;
    token:string;

    constructor(user:CVUser,token:string){
        this.user=user;
        this.token= token;
    }
}