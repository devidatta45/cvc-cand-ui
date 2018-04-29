import {ActualPart} from './ActualPart'

export class Download {
    actualPart:ActualPart;
    userId:string;

    constructor(actualPart:ActualPart,userId:string){
        this.actualPart= actualPart;
        this.userId=userId;
    }
}