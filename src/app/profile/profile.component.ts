import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CVCCandidate } from './CVCCandidate';
import { CVCCandidateEmploymentDetails } from './CVCCandidateEmploymentDetails';
import { Education } from './Education';
import { Audit } from './Audit';
import { Skill } from './Skill';
import { Degree } from './Degree';
import { Employer } from './Employer';
import { JobDetails } from './JobDetails';
import { Personal } from './Personal';
import { Reference } from './Reference';
import { ActualPart } from './ActualPart';
import { Download } from './Download';
import { StatusMessage } from '../userlist/StatusMessage';
import { CVUser } from '../userlist/CVUser';
import { ProfileService } from './profile.service';
import { UserListService } from '../userlist/userlist.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { FileUploaderExtended } from '../document/FileUploaderExtended';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ActivityService } from '../activity/activity.service';
import { MessageService } from '../message/message.service';
import { RecruiterView } from './RecruiterView';
import { UpdateEmployerCommand } from './UpdateEmployerCommand';
import * as L from 'leaflet';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    providers: [ProfileService, UserListService, ActivityService],
    styleUrls: ['../login/css/mobile-menu.css', '../login/css/responsive.css', '../login/css/style.css']
})

export class ProfileComponent implements OnInit {
    cvCandidate: CVCCandidate;
    user: CVUser;
    isAddCandidate: Boolean = false;
    candidate: CVCCandidate;
    candidateEmployment: CVCCandidateEmploymentDetails;
    isAddCandidateEmployment: Boolean = false;
    skillList: Array<Skill> = [];
    employer: Employer = new Employer("", new Date(), new Date(), "", 0, "", this.skillList)
    currentEmployer: Employer = new Employer("", new Date(), new Date(), "", 0, "", this.skillList);
    reference: Reference = new Reference("", "", "");
    personal: Personal;
    isCandidateUpdate: Boolean = false;
    isCandidateEmploymentUpdate: Boolean = false;
    candidateId: String;
    public uploader: FileUploaderExtended;
    isPhotoExist: Boolean = false;
    isPhotoExistDb: Boolean = false;
    url: string = 'http://localhost:9000/uploadPhoto';
    dynamicLink: string = "";
    educationList: Array<Education> = [];
    employerList: Array<Employer> = [];
    referenceList: Array<Reference> = [];
    degreeList: Array<Degree> = [];
    educationViewList: Array<Education> = [];
    titleList: string[] = Array("Mr", "Mrs", "Ms");
    isCurrentEmployment: Boolean = false;
    currentStatusList: string[] = Array("Employed", "Working Notice Period", "Available Immediately")
    primarySkillList: Array<Skill> = [];
    localLinkedinUrl: string = "";
    toastOptions: ToastOptions = {
        title: "Error",
        msg: "User does not exist",
        showClose: true,
        timeout: 5000,
        theme: 'material',
        onAdd: (toast: ToastData) => {
            console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function (toast: ToastData) {
            console.log('Toast ' + toast.id + ' has been removed!');
        }
    };
    count: number = 0;
    activityCount: number = 0;
    dynamicLinkResume: string;
    applications: Array<RecruiterView> = [];
    jobLocations: Array<string> = [];
    uk: Boolean = false;
    eu: Boolean = false;
    apac: Boolean = false;
    isDesiredSalary: Boolean = false;
    isContractRate: Boolean = false;
    isDesiredContractRate: Boolean = false;
    mapOptions = {
        layers: [
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
        ],
        zoom: 5,
        center: L.latLng({ lat: 38.991709, lng: -76.886109 })
    };
    constructor(private route: ActivatedRoute, private profileService: ProfileService,
        private userListService: UserListService, private router: Router, private toastyService: ToastyService,
        private toastyConfig: ToastyConfig, private activityService: ActivityService,
        private messageService: MessageService) { }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            let userId = params['id'];
            this.messageService.getAllMessages(userId).then(messages => {
                this.count = 0;
                messages.map(msg => {
                    msg.messages.map(ms => {
                        ms.chatConversation.map(chat => {
                            this.count = this.count + 1;
                        });
                    });
                });
            });
            this.profileService.getAllApplications(userId).then(result => {
                this.applications = result;
            });
            this.isPhotoExist=false;
            this.isPhotoExistDb=false;
            this.userListService.getUserDeails(userId).then(user => {
                this.user = user;
                this.profileService.getAllDegree().then(degrees => {
                    this.degreeList = degrees;
                    this.profileService.getCandidateDetails(userId).then(candidate => {
                        this.activityService.getAllNews(candidate._id).then(result => {
                            this.activityCount = result.length;
                        });
                        this.cvCandidate = <CVCCandidate>candidate;
                        let employer = new Employer("", new Date(), new Date(), "", 0, "", this.skillList);
                        if (candidate.employmentDetails == undefined) {
                            this.isAddCandidate = true;
                            let employment = new CVCCandidateEmploymentDetails("", 0, employer, false);
                            if (candidate.currentStatus) {
                                this.personal = new Personal(this.user._id, this.user.title,
                                    this.user.firstName, this.user.lastName, this.user.address,
                                    this.user.mobile, this.user.email, this.user.password, this.user.postCode,
                                    candidate.currentStatus, employment);
                            }
                            else {
                                this.personal = new Personal(this.user._id, this.user.title,
                                    this.user.firstName, this.user.lastName, this.user.address,
                                    this.user.mobile, this.user.email, this.user.password, this.user.postCode,
                                    "", employment);
                            }

                            if (this.employerList.length == 0) {
                                this.addToEmployerList();
                            }
                            if (this.referenceList.length == 0) {
                                this.addToReferenceList();
                            }
                        }
                        else {
                            if (candidate.employmentDetails.currentEmployer == undefined) {
                                this.addToEmployerSkillList();
                                this.cvCandidate.employmentDetails.currentEmployer = employer;
                            }
                            else {
                                this.cvCandidate.employmentDetails.currentEmployer.startDate = new Date(this.cvCandidate.
                                    employmentDetails.currentEmployer.startDate);
                                this.cvCandidate.employmentDetails.currentEmployer.endDate = new Date(this.cvCandidate.
                                    employmentDetails.currentEmployer.endDate);
                                this.skillList = this.cvCandidate.employmentDetails.currentEmployer.skills;
                                this.isCurrentEmployment = true;
                            }
                            if (candidate.employmentDetails.previousEmployers.length > 0) {
                                let employers = this.cvCandidate.employmentDetails.previousEmployers.map(function (employer) {
                                    employer.startDate = new Date(employer.startDate);
                                    employer.endDate = new Date(employer.endDate);
                                    return employer;
                                })
                                this.employerList = employers;
                            }
                            else {
                                if (this.employerList.length == 0) {
                                    this.addToEmployerList();
                                }
                            }
                            if (candidate.employmentDetails.jobLocations.length > 0) {
                                let res1 = candidate.employmentDetails.jobLocations.filter(loc => {
                                    return loc == "UK"
                                });
                                if (res1.length > 0) {
                                    this.uk = true;
                                }
                                let res2 = candidate.employmentDetails.jobLocations.filter(loc => {
                                    return loc == "EU"
                                });
                                if (res2.length > 0) {
                                    this.eu = true;
                                }
                                let res3 = candidate.employmentDetails.jobLocations.filter(loc => {
                                    return loc == "APAC"
                                });
                                if (res3.length > 0) {
                                    this.apac = true;
                                }
                            }
                            if (candidate.employmentDetails.linkedinUrl == undefined) {
                                this.cvCandidate.employmentDetails.linkedinUrl = ""
                            }
                            if (candidate.employmentDetails.linkedinUrl != undefined) {
                                this.localLinkedinUrl = candidate.employmentDetails.linkedinUrl;
                            }
                            if (candidate.employmentDetails.jobTravelDistancePerm == undefined) {
                                this.cvCandidate.employmentDetails.jobTravelDistancePerm = 0;
                            }
                            if (candidate.employmentDetails.jobTravelDistanceContract == undefined) {
                                this.cvCandidate.employmentDetails.jobTravelDistanceContract = 0;
                            }
                            if (candidate.employmentDetails.currentSalary == undefined) {
                                this.cvCandidate.employmentDetails.currentSalary = 0;
                            }
                            if (candidate.employmentDetails.contractRate == undefined) {
                                this.cvCandidate.employmentDetails.contractRate = 0;
                            }
                            if (candidate.employmentDetails.requiredSalary == undefined) {
                                this.cvCandidate.employmentDetails.requiredSalary = 0;
                            }
                            if (candidate.employmentDetails.telephonicNotice == undefined) {
                                this.cvCandidate.employmentDetails.telephonicNotice = 0;
                            }
                            if (candidate.employmentDetails.faceToFaceNotice == undefined) {
                                this.cvCandidate.employmentDetails.faceToFaceNotice = 0;
                            }
                            if (candidate.employmentDetails.requiredContractRate == undefined) {
                                this.cvCandidate.employmentDetails.requiredContractRate = 0;
                            }
                            if (candidate.employmentDetails.newJobReason == undefined) {
                                this.cvCandidate.employmentDetails.newJobReason = "";
                            }
                            if (candidate.employmentDetails.permanent == undefined) {
                                this.cvCandidate.employmentDetails.permanent = false;
                            }
                            if (candidate.employmentDetails.contract == undefined) {
                                this.cvCandidate.employmentDetails.contract = false;
                            }
                            if (candidate.employmentDetails.isNegotiable == undefined) {
                                this.cvCandidate.employmentDetails.isNegotiable = false;
                            }
                            if (candidate.currentStatus == undefined) {
                                this.cvCandidate.currentStatus = "";
                            }
                            if (candidate.employmentDetails.resume != undefined) {
                                this.profileService.getFileInfoFromDb(candidate.employmentDetails.resume.objectId).then(result => {
                                    let download = new Download(result, candidate.cvcUserId);
                                    this.profileService.download(download).then(path => {
                                        this.dynamicLinkResume = "http://localhost:9000/assets/files/" + candidate.cvcUserId + "/" + result.filename;
                                        console.log(this.dynamicLinkResume);
                                    })
                                });
                            }
                            this.personal = new Personal(this.user._id, this.user.title,
                                this.user.firstName, this.user.lastName, this.user.address,
                                this.user.mobile, this.user.email, this.user.password, this.user.postCode,
                                this.cvCandidate.currentStatus, this.cvCandidate.employmentDetails);
                        }
                        this.uploader = new FileUploaderExtended({ url: this.url + "/" + this.cvCandidate._id });
                        this.uploader.setHeader("apiKey", localStorage.getItem("apiKey"));
                        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            this.ngOnInit();
                        };
                        if (candidate.photo == undefined) {
                            this.isPhotoExist = false;
                        }
                        if (this.cvCandidate.education.length > 0) {
                            this.educationViewList = [];
                            for (let i = 0, index = this.cvCandidate.education.length; i < index; i++) {
                                let degree = this.getItemFromArrayById(this.cvCandidate.education[i].degree)
                                let name = degree[0].name;
                                this.educationViewList.push(new Education(name, this.cvCandidate.education[i].completionYear))
                            }
                        }
                        if (this.cvCandidate.education.length == 0 && this.educationList.length == 0) {
                            this.addToList();
                        }
                        if (candidate.photo != undefined) {
                            this.isPhotoExistDb = true;
                            this.profileService.getFileInfoFromDb(candidate.photo).then(result => {
                                let download = new Download(result, this.user._id);
                                this.profileService.download(download).then(path => {
                                    this.dynamicLink = "http://localhost:9000/assets/files/" + this.user._id + "/" + result.filename;
                                })
                            })
                        }
                        if (this.cvCandidate.skills != undefined && this.cvCandidate.skills.length > 0) {
                            this.primarySkillList = this.cvCandidate.skills.filter(function (skill) {
                                return skill.isPrimary == true;
                            })
                        }
                    }
                    );
                });
            })
        });
    }
    getItemFromArrayById(id: string) {
        let degree = this.degreeList.filter(function (degree) {
            return degree._id == id;
        })
        return degree;
    }
    onMapReady(map: L.Map) {
        navigator.geolocation.getCurrentPosition(function (location) {
            map.setView([location.coords.latitude, location.coords.longitude], 13)
        });
    }
    updateEmployer(personal: Personal) {
        this.isCurrentEmployment = true;
        personal.employmentDetails.currentEmployer.salary = parseFloat(personal.employmentDetails.
            currentEmployer.salary.toString());
        personal.employmentDetails.currentEmployer.startDate = personal.employmentDetails.currentEmployer.startDate
            .toISOString().split(".")[0] + "Z";
        personal.employmentDetails.currentEmployer.endDate = personal.employmentDetails.currentEmployer.endDate
            .toISOString().split(".")[0] + "Z";
        let list = this.skillList.map(skill => {
            return new Skill(skill.name, parseInt(skill.score.toString()), skill.isPrimary)
        });
        personal.employmentDetails.currentEmployer.skills = list;
        let command = new UpdateEmployerCommand(this.cvCandidate._id, personal.employmentDetails.currentEmployer, personal.currentStatus)
        this.profileService.editCandidateEmployment(command)
            .then(message => {
                this.toastOptions.title = "Success";
                this.toastOptions.msg = message.status;
                this.toastyService.success(this.toastOptions);
                this.isAddCandidate = false;
                this.router.navigate(['/profile', this.user._id]);
                this.ngOnInit();
            })
    }
    addToList() {
        let education = new Education("", "");
        this.educationList.push(education);
    }
    addToLocationList() {
        if (this.jobLocations.length == 0) {
            this.jobLocations.push("");
        }
    }
    removeFromList(index: number) {
        if (index > -1) {
            this.educationList.splice(index, 1);
        }
    }
    addToEmployerSkillList() {
        if (this.skillList.length == 0) {
            let skill = new Skill("", 0, true);
            let skill1 = new Skill("", 0, true);
            let skill2 = new Skill("", 0, true);
            let skill3 = new Skill("", 0, true);
            let skill4 = new Skill("", 0, true);
            let skill5 = new Skill("", 0, true);
            this.skillList.push(skill);
            this.skillList.push(skill1);
            this.skillList.push(skill2);
            this.skillList.push(skill3);
            this.skillList.push(skill4);
            this.skillList.push(skill5);
        }
    }
    addToEmployerList() {
        this.addToEmployerSkillList();
        let employer = new Employer("", new Date(), new Date(), "", 0, "", this.skillList);
        this.employerList.push(employer);
    }
    removeFromEmployerList(index: number) {
        if (index > -1) {
            this.employerList.splice(index, 1);
        }
    }
    addToReferenceList() {
        let reference = new Reference("", "", "");
        this.referenceList.push(reference);
    }
    removeFromReferenceList(index: number) {
        if (index > -1) {
            this.referenceList.splice(index, 1);
        }
    }
    getRequiredDate(date: string): string {
        let someDate = new Date(date);
        let dd = someDate.getDate();
        let mm = someDate.getMonth() + 1;
        let y = someDate.getFullYear();
        let someFormattedDate = dd + '/' + mm + '/' + y;
        return someFormattedDate
    }
    getDiff(startDate: any, endDate: any): string {
        let date1 = new Date(startDate);
        let date2 = new Date(endDate);
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let diffDays = Math.ceil(timeDiff / 1000);
        if (diffDays < 60) {
            return diffDays + " seconds";
        }
        else if (diffDays > 60 && diffDays < 3600) {
            return Math.ceil(diffDays / 60) + " minutes";
        }
        else if (diffDays > 3600 && diffDays < 3600 * 24) {
            return Math.ceil(diffDays / 3600) + " hours";
        }
        else {
            return Math.ceil(diffDays / (3600 * 24)) + " days";
        }
    }

    createPersonal(personal: Personal) {
        personal.employmentDetails.currentEmployer.startDate = personal.employmentDetails.currentEmployer.startDate
            .toISOString().split(".")[0] + "Z";
        personal.employmentDetails.currentEmployer.endDate = personal.employmentDetails.currentEmployer.endDate
            .toISOString().split(".")[0] + "Z";
        if (personal.employmentDetails.previousEmployers != undefined && personal.employmentDetails.previousEmployers.length > 0) {
            let previousEmployers = personal.employmentDetails.previousEmployers.map(function (employer) {
                employer.startDate = employer.startDate.toISOString().split(".")[0] + "Z";
                employer.endDate = employer.endDate.toISOString().split(".")[0] + "Z";
                return employer;
            })
            personal.employmentDetails.previousEmployers = previousEmployers;
        }
        personal.employmentDetails.noticePeriod = parseInt(personal.employmentDetails.noticePeriod.toString());
        this.profileService.createCandidatePersonal(personal).then(message => {
            this.toastOptions.title = "Success";
            this.toastOptions.msg = message.status;
            this.toastyService.success(this.toastOptions);
            this.isAddCandidate = false;
            this.router.navigate(['/profile', this.user._id]);
            this.ngOnInit();
        })
    }
    editCandidateForm() {
        this.candidate = this.cvCandidate;
        if (this.cvCandidate.education.length > 0) {
            this.educationList = this.candidate.education;
        }
        this.isAddCandidate = !this.isAddCandidate;
        this.isCandidateUpdate = true;
        this.candidateId = this.cvCandidate._id;
    }
    updatePreviousEmployer() {
        let employers = this.employerList.map(function (employer) {
            employer.salary = parseFloat(employer.salary.toString());
            employer.startDate = employer.startDate
                .toISOString().split(".")[0] + "Z";
            employer.endDate = employer.endDate
                .toISOString().split(".")[0] + "Z";
            employer.skills = [];
            return employer;
        });
        this.profileService.editCandidatePreviousEmployment(this.cvCandidate._id, employers)
            .then(message => {
                this.toastOptions.title = "Success";
                this.toastOptions.msg = message.status;
                this.toastyService.success(this.toastOptions);
                this.isAddCandidate = false;
                this.router.navigate(['/profile', this.user._id]);
                this.ngOnInit();
            })
    }
    updateJobSearchDetails(personal: Personal) {
        let permDistance = parseFloat(personal.employmentDetails.jobTravelDistancePerm.toString());
        let contractDistance = parseFloat(personal.employmentDetails.jobTravelDistanceContract.toString());
        let telephonicNotice = parseInt(personal.employmentDetails.telephonicNotice.toString());
        let faceToFaceNotice = parseInt(personal.employmentDetails.faceToFaceNotice.toString());
        let currentSalary = parseFloat(personal.employmentDetails.currentSalary.toString());
        let contractRate = parseFloat(personal.employmentDetails.contractRate.toString());
        let requiredSalary = parseFloat(personal.employmentDetails.requiredSalary.toString());
        let requiredContractRate = parseFloat(personal.employmentDetails.requiredContractRate.toString());
        personal.employmentDetails.jobLocations = [];
        if (this.uk) {
            personal.employmentDetails.jobLocations.push("UK")
        }
        if (this.eu) {
            personal.employmentDetails.jobLocations.push("EU")
        }
        if (this.apac) {
            personal.employmentDetails.jobLocations.push("APAC")
        }
        let details = new JobDetails(this.cvCandidate._id, personal.employmentDetails.jobLocations,
            permDistance, contractDistance, currentSalary, contractRate, requiredSalary, requiredContractRate,
            personal.employmentDetails.newJobReason, telephonicNotice, faceToFaceNotice,
            personal.employmentDetails.isNegotiable, personal.employmentDetails.permanent, personal.employmentDetails.contract);
        this.profileService.editCandidateJobDetails(details).then(message => {
            this.toastOptions.title = "Success";
            this.toastOptions.msg = message.status;
            this.toastyService.success(this.toastOptions);
            this.isAddCandidate = false;
            this.router.navigate(['/profile', this.user._id]);
            this.ngOnInit();
        })
    }
    updateEducation() {
        this.profileService.editCandidateEducation(this.cvCandidate._id, this.educationList).then(message => {
            this.toastOptions.title = "Success";
            this.toastOptions.msg = message.status;
            this.toastyService.success(this.toastOptions);
            this.isAddCandidate = false;
            this.router.navigate(['/profile', this.user._id]);
            this.ngOnInit();
        })
    }
}
