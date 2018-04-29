import { Skill } from '../profile/Skill';
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
    constructor(clientId: string, consoleId: string, jobTitle: string, jobDescriptions: string,
        jobStatus: string, startDate: any, endDate: any, isActive: Boolean) {
        this.clientId = clientId;
        this.consoleId = consoleId;
        this.jobTitle = jobTitle;
        this.jobDescriptions = jobDescriptions;
        this.jobStatus = jobStatus;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
    }
}