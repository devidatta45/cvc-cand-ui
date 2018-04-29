export class Organiser {
    name: string;
    position: string;
    location: string;
    linkedinUrl: string;
    photo: string;

    constructor(name: string,position: string,location: string,linkedinUrl: string){
        this.name=name;
        this.position=position;
        this.location=location;
        this.linkedinUrl=linkedinUrl;
    }
}