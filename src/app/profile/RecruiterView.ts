export class RecruiterView {
    jobTitle: string;
    client: string;
    startDate: any;
    constructor(jobTitle: string, client: string, startDate: any) {
        this.jobTitle = jobTitle;
        this.client = client;
        this.startDate = startDate;
    }
}