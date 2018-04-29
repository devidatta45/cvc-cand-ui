export class Resume {
    version: string;
    objectId: string;
    modifiedDate: any;
    author: string;
    documentType: string;

    constructor(version: string, objectId: string, modifiedDate: any, author: string, documentType: string) {
        this.version = version;
        this.objectId = objectId;
        this.modifiedDate = modifiedDate;
        this.author = author;
        this.documentType = documentType;
    }
}