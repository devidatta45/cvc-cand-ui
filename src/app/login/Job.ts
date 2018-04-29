import { Audit } from '../profile/Audit';
import { Skill } from '../profile/Skill';
import { JobApplication } from './JobApplication';

export class Job {
    _id: string = "";
    clientId: string;
    consoleId: string;
    jobTitle: string;
    jobDescriptions: string;
    jobLocations: Array<string> = [];
    jobStatus: string;
    startDate: any;
    endDate: any;
    isActive: Boolean;
    primarySkillsRequired: Array<Skill> = [];
    secondarySkillsRequired: Array<Skill> = [];
    createdBy: Audit;
    modifiedBy: Audit;
    constructor(clientId: string, consoleId: string, jobTitle: string, jobDescriptions: string,
         jobStatus: string, startDate: any, endDate: any, isActive: Boolean, createdBy: Audit, modifiedBy: Audit) {
        this.clientId = clientId;
        this.consoleId = consoleId;
        this.jobTitle = jobTitle;
        this.jobDescriptions = jobDescriptions;
        this.jobStatus = jobStatus;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
    }
}