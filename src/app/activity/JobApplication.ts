import { Skill } from '../profile/Skill';
export class JobApplication {
    _id: string = "";
    jobId: string
    candidateId: String;
    userId:string;
    candidateSkills: Array<Skill>;
    adminSkills: Array<Skill>;
    qualifiedRatio:string;
    jobStatus: string;
    isVerified: Boolean

    constructor(jobId: string, candidateId: string,userId:string, candidateSkills: Array<Skill>,
        adminSkills: Array<Skill>,qualifiedRatio:string, jobStatus: string, isVerified: Boolean) {
        this.jobId = jobId;
        this.candidateId = candidateId;
        this.userId = userId;
        this.candidateSkills = candidateSkills;
        this.adminSkills = adminSkills;
        this.qualifiedRatio=qualifiedRatio;
        this.jobStatus = jobStatus;
        this.isVerified = isVerified;
    }
}