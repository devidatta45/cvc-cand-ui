export class CVClient {
    _id: string = "";
    clientRefNumber: string;
    clientStatus: string;
    companyName: string;
    companyAddress: string;

    constructor(clientRefNumber: string, clientStatus: string, companyName: string,
        companyAddress: string) {
        this.clientRefNumber = clientRefNumber;
        this.clientStatus = clientStatus;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
    }
}