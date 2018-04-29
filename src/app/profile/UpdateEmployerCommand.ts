import { Employer } from './Employer';

export class UpdateEmployerCommand {
    id: string;
    employer: Employer;
    currentStatus: string;
    constructor(id: string, employer: Employer, currentStatus: string) {
        this.id = id;
        this.employer = employer;
        this.currentStatus = currentStatus;
    }
}