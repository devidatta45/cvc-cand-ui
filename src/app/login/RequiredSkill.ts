export class RequiredSkill {
    name:string;
    requiredScore:number;
    score:number;
    isPrimary:Boolean;
    isDisabled:Boolean=false;

    constructor(name:string,requiredScore:number,score:number,isPrimary:Boolean){
        this.name=name;
        this.requiredScore=requiredScore;
        this.score= score;
        this.isPrimary=isPrimary;
    }
}