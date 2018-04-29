import { Skill } from './Skill';
export class Employer {
    name: string;
    startDate: any;
    endDate: any;
    jobTitle: string;
    salary: number;
    location: string;
    skills: Array<Skill> = [];

    constructor(name: string, startDate: any, endDate: any, jobTitle: string, salary: number,
        location: string, skills: Array<Skill>) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.jobTitle = jobTitle;
        this.salary = salary;
        this.location = location;
        this.skills = skills;
    }
}