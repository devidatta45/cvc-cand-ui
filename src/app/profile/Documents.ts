export class Documents {
    name: string;
    objectId: string;
    description: string;
    modifiedDate: any;
    author: string;
    documentType: string;

    constructor(name: string, objectId: string, description: string, modifiedDate: any, author: string, documentType: string) {
        this.name = name;
        this.objectId = objectId;
        this.description = description;
        this.modifiedDate = modifiedDate;
        this.author = author;
        this.documentType = documentType;
    }
}