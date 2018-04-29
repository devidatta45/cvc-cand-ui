export class ActualPart {
    id:string;
    contentType:string;
    filename:string;
    documentType:string;
    date:any;
    
    constructor(id:string,contentType:string,filename:string,documentType:string,date:any){
        this.id= id;
        this.contentType=contentType;
        this.filename=filename;
        this.documentType=documentType;
        this.date=date;
    }
}