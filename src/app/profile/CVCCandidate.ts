import { Education } from './Education';
import { Skill } from './Skill';
import { Audit } from './Audit';
import { CVCCandidateEmploymentDetails } from './CVCCandidateEmploymentDetails';

export class CVCCandidate {
    _id: string = "";
    cvcUserId: string;
    photo: string;
    education: Education[] = [];
    skills: Skill[] = [];
    createdBy: Audit;
    modifiedBy: Audit;
    currentStatus:string;
    employmentDetails?: CVCCandidateEmploymentDetails;
    constructor(cvcUserId: string, createdBy: Audit, modifiedBy: Audit,photo?: string) {
        this.cvcUserId = cvcUserId;
        this.photo = photo;
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
    }
}