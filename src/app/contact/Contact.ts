export class Contact {
    _id: string = "";
    userId: string;
    name: string;
    email: string;
    subject: string;
    phone: string;
    message: string;

    constructor(userId: string, name: string, email: string, subject: string, phone: string, message: string) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.phone = phone;
        this.message = message;
    }
}