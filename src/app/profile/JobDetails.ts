export class JobDetails {
    id: string;
    jobLocations: Array<string>;
    jobTravelDistancePerm: number;
    jobTravelDistanceContract: number;
    currentSalary: number;
    contractRate: number;
    requiredSalary: number;
    requiredContractRate: number;
    newJobReason: String;
    telephonicNotice: number;
    faceToFaceNotice: number;
    isNegotiable: Boolean;
    permanent: Boolean;
    contract: Boolean;

    constructor(id: string, jobLocations: Array<string>, jobTravelDistancePerm: number,
        jobTravelDistanceContract: number, currentSalary: number,
        contractRate: number, requiredSalary: number, requiredContractRate: number, newJobReason: String,
        telephonicNotice: number, faceToFaceNotice: number, isNegotiable: Boolean,
        permanent: Boolean, contract: Boolean) {
        this.id = id;
        this.jobLocations = jobLocations;
        this.jobTravelDistancePerm = jobTravelDistancePerm;
        this.jobTravelDistanceContract = jobTravelDistanceContract;
        this.currentSalary = currentSalary;
        this.contractRate = contractRate;
        this.requiredSalary = requiredSalary;
        this.requiredContractRate = requiredContractRate;
        this.newJobReason = newJobReason;
        this.telephonicNotice = telephonicNotice;
        this.faceToFaceNotice = faceToFaceNotice;
        this.isNegotiable = isNegotiable;
        this.permanent = permanent;
        this.contract = contract;
    }
}