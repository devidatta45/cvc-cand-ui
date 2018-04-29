import { Organiser } from './Organiser';
import { CVCCalender } from './CVCCalender';
import { SharedDocuments } from './SharedDocuments';
import { CVClient } from './CVCClient';
import { Job } from './Job';

export class InterviewScheduleView {
    _id: string = "";
    client: CVClient;
    job: Job;
    organiser: Organiser;
    candidateId: string;
    interviewInfo: string;
    interviewType: string;
    schedules: Array<CVCCalender> = [];
    considerSalaryRange: Boolean;
    minSalary: number;
    maxSalary:number;
    acceptCommute: Boolean;
    jobLocation: string;
    interviewAddress: string;
    sharingDocuments: Array<SharedDocuments> = [];
    duration: number;
    hasAccepted: Boolean;
    permanent: Boolean;
    constructor(client: CVClient, job: Job, organiser: Organiser, candidateId: string, interviewInfo: string,
        interviewType: string, considerSalaryRange: Boolean, minSalary: number,
        acceptCommute: Boolean, jobLocation: string, interviewAddress: string,
        duration: number, hasAccepted: Boolean) {
        this.client = client;
        this.job = job;
        this.organiser = organiser;
        this.candidateId = candidateId;
        this.interviewInfo = interviewInfo;
        this.interviewType = interviewType;
        this.considerSalaryRange = considerSalaryRange;
        this.minSalary = minSalary;
        this.acceptCommute = acceptCommute;
        this.jobLocation = jobLocation;
        this.interviewAddress = interviewAddress;
        this.duration = duration;
        this.hasAccepted = hasAccepted;
    }
}