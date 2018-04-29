import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { CVCCandidate } from './CVCCandidate';
import { Personal } from './Personal';
import { CVCCandidateEmploymentDetails } from './CVCCandidateEmploymentDetails';
import { StatusMessage } from '../userlist/StatusMessage'
import { Skill } from './Skill';
import { Education } from './Education';
import { JobDetails } from './JobDetails';
import { Employer } from './Employer';
import { Degree } from './Degree';
import { ActualPart } from './ActualPart';
import { Download } from './Download';
import { RecruiterView } from './RecruiterView';
import { UpdateEmployerCommand } from './UpdateEmployerCommand';
import 'rxjs/add/operator/toPromise';
import { ErrorService } from '../http.error.service';
import { Constant } from '../Constants';


@Injectable()
export class ProfileService {
    constructor(private http: Http, private errorService: ErrorService) { }
    private mainUrl = Constant.CAND_URL;
    private API_KEY = "8190b575-f3ee-41b2-bede-7ddc9e156df2";
    private headers = new Headers();

    getCandidateDetails(userId: String): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.get(this.mainUrl + "profile/" + userId, options).toPromise();
        let resp = request.then(response =>
            response.json() as any
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    getAllDegree(): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.get(this.mainUrl + "degree", options).toPromise();
        let resp = request.then(response =>
            response.json() as Array<Degree>
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }

    createCandidate(candidate: CVCCandidate): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.post(this.mainUrl + "createCandidate", candidate, options).toPromise();
        let resp = request.then(response =>
            response.json() as StatusMessage
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    createCandidatePersonal(personal: Personal): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.post(this.mainUrl + "candidatePersonal", personal, options).toPromise();
        let resp = request.then(response =>
            response.json() as StatusMessage
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    createCandidateEmployment(updateEmployerCommand: UpdateEmployerCommand): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.post(this.mainUrl + "createCandidateEmployment/" + updateEmployerCommand.id, updateEmployerCommand, options).toPromise();
        let resp = request.then(response =>
            response.json() as StatusMessage
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    editCandidate(id: String, candidate: CVCCandidate): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.put(this.mainUrl + "editCandidate/" + id, candidate, options).toPromise();
        let resp = request.then(response =>
            response.json() as StatusMessage
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    editCandidateEmployment(updateEmployerCommand: UpdateEmployerCommand): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.put(this.mainUrl + "editCandidateEmployment/" + updateEmployerCommand.id, updateEmployerCommand, options).toPromise();
        let resp = request.then(response =>
            response.json() as StatusMessage
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    editCandidatePreviousEmployment(id: String, employer: Array<Employer>): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.put(this.mainUrl + "editCandidatePreviousEmployment/" + id, employer, options).toPromise();
        let resp = request.then(response =>
            response.json() as StatusMessage
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    editCandidateEducation(id: String, education: Array<Education>): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.put(this.mainUrl + "editCandidateEducation/" + id, education, options).toPromise();
        let resp = request.then(response =>
            response.json() as StatusMessage
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    editCandidateJobDetails(details: JobDetails): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.post(this.mainUrl + "editCandidateJobDetails", details, options).toPromise();
        let resp = request.then(response =>
            response.json() as StatusMessage
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }

    editCandidateSkill(id: String, skills: Array<Skill>): Promise<any> {
        if (localStorage.getItem("apiKey") == null) {
            this.headers.set("apiKey", this.API_KEY);
        }
        else if (this.headers.get("apiKey") == this.API_KEY) {
            this.headers.set("apiKey", localStorage.getItem("apiKey"));
        }
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.put(this.mainUrl + "editCandidateSkill/" + id, skills, options).toPromise();
        let resp = request.then(response =>
            response.json() as StatusMessage
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    getFileInfoFromDb(id: string): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.get(this.mainUrl + "getFile/" + id, options).toPromise();
        let resp = request.then(response =>
            response.json() as ActualPart
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    download(result: Download): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.post(this.mainUrl + "download", result, options).toPromise();
        let resp = request.then(response =>
            response.json() as any
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    getAllApplications(userId: String): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let url = Constant.CLIENT_URL;
        let request = this.http.get(url + "applications/" + userId, options).toPromise();
        let resp = request.then(response =>
            response.json() as Array<RecruiterView>
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
}