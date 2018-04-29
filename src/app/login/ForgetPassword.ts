export class ForgetPassword {
    email: string;
    link: string;
    constructor(email: string, link: string) {
        this.email = email;
        this.link = link;
    }
}