export class Skill {
    name:string;
    score:number;
    isPrimary:Boolean;
    isDisabled:Boolean=false;

    constructor(name:string,score:number,isPrimary:Boolean){
        this.name=name;
        this.score= score;
        this.isPrimary=isPrimary;
    }
}