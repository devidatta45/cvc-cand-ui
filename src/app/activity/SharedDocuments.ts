export class SharedDocuments {
    name: string;
    objectId: string;
    description: string;

    constructor(name: string, objectId: string, description: string) {
        this.name = name;
        this.objectId = objectId;
        this.description = description;
    }
}