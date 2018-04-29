import { CVCCandidateEmploymentDetails } from './CVCCandidateEmploymentDetails';

export class Personal {
    userId: string;
    title: string;
    firstName: string;
    lastName: string;
    address: string;
    mobile: string;
    email: string;
    password:string;
    postCode: string;
    currentStatus:string;
    employmentDetails: CVCCandidateEmploymentDetails;
    constructor(userId: string, title: string, firstName: string, lastName: string,
        address: string, mobile: string, email: string,password:string, postCode: string,
        currentStatus:string,employmentDetails:CVCCandidateEmploymentDetails) {
        this.userId = userId;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.mobile = mobile;
        this.email = email;
        this.password=password;
        this.postCode = postCode;
        this.currentStatus=currentStatus;
        this.employmentDetails=employmentDetails;
    }
}