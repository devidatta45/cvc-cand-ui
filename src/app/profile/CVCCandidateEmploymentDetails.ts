import { Employer } from './Employer';
import { Reference } from './Reference';
import { Resume } from './Resume';
import { Documents } from './Documents';

export class CVCCandidateEmploymentDetails {
    currentEmployer: Employer;
    previousEmployers: Employer[] = [];
    jobLocations: Array<string> = [];
    jobTravelDistancePerm: number;
    jobTravelDistanceContract: number;
    noticePeriod: number;
    telephonicNotice: number;
    faceToFaceNotice: number;
    currentSalary: number;
    contractRate: number;
    requiredSalary: number;
    requiredContractRate: number;
    isNegotiable: Boolean;
    previousClientRef: Reference[] = [];
    newJobReason: String;
    linkedinUrl: string;
    resume: Resume;
    candidateDocuments: Documents[] = [];
    cvCloudDocuments: Documents[] = [];
    permanent: Boolean;
    contract: Boolean;
    constructor(linkedinUrl: string, noticePeriod: number, currentEmployer: Employer, isNegotiable: Boolean) {
        this.linkedinUrl = linkedinUrl;
        this.noticePeriod = noticePeriod;
        this.currentEmployer = currentEmployer;
        this.isNegotiable = isNegotiable;
    }
}