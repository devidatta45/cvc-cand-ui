export class NewsFeed {
    _id: string = "";
    jobId: string;
    candidateId: string;
    message: string;
    date: any;

    constructor(jobId: string, candidateId: string, message: string, date: any) {
        this.jobId = jobId;
        this.candidateId = candidateId;
        this.message = message;
        this.date = date;
    }
}