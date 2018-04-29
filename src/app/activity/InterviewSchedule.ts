import { Organiser } from './Organiser';
import { CVCCalender } from './CVCCalender';
import { SharedDocuments } from './SharedDocuments';

export class InterviewSchedule {
    _id: string = "";
    clientId: string;
    jobId: string;
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
    constructor(clientId: string, jobId: string, organiser: Organiser, candidateId: string, interviewInfo: string,
        interviewType: string, considerSalaryRange: Boolean, minSalary: number,
        acceptCommute: Boolean, jobLocation: string, interviewAddress: string,
        duration: number, hasAccepted: Boolean) {
        this.clientId = clientId;
        this.jobId = jobId;
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