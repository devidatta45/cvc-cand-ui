
import { Component, OnInit } from '@angular/core';
import { CVUser } from '../userlist/CVUser';
import { CVCCandidate } from '../profile/CVCCandidate';
import { Audit } from '../profile/Audit';
import { Skill } from '../profile/Skill';
import { ProfileService } from '../profile/profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserListService } from '../userlist/userlist.service';
import { ActivityService } from './activity.service';
import { MessageService } from '../message/message.service';
import { NewsFeed } from './NewsFeed';
import { InterviewSchedule } from './InterviewSchedule';
import { InterviewScheduleView } from './InterviewScheduleView';
import { CVCCalender } from './CVCCalender';
import { JobApplication } from './JobApplication';
import { SharedDocuments } from './SharedDocuments';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Download } from '../profile/Download';
import { ActualPart } from '../profile/ActualPart';
@Component({
    selector: 'activity',
    templateUrl: './activity.component.html',
    providers: [ProfileService, UserListService, ActivityService, MessageService],
    styleUrls: ['../cvcloudbase.css', '../profile/css/mobile-menu.css', '../profile/css/responsive.css',
        '../profile/css/style.css', '../login/css/style.css']
})

export class ActivityComponent implements OnInit {
    user: CVUser;
    cvCandidate: CVCCandidate;
    activityNews: Array<NewsFeed> = [];
    count: number = 0;
    activityCount: number = 0;
    interviewList: Array<InterviewScheduleView> = [];
    isInterviewRequest: Boolean = false;
    selectedInterview: InterviewScheduleView;
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
    schedules: Array<CVCCalender> = [];
    application: JobApplication;
    dynamicLink: string = "";
    dynamicLinkDocument: string = "";
    documentObjectId: number = 0;
    isDownloadDocument:Boolean=false;

    constructor(private profileService: ProfileService, private userListService: UserListService,
        private router: Router, private route: ActivatedRoute,
        private messageService: MessageService, private activityService: ActivityService,
        private toastyService: ToastyService, private toastyConfig: ToastyConfig) { }
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
            this.userListService.getUserDeails(userId).then(user => {
                this.user = user;
                this.profileService.getCandidateDetails(userId).then(candidate => {
                    this.cvCandidate = <CVCCandidate>candidate;
                    this.activityService.getAllNews(this.cvCandidate._id).then(result => {
                        this.activityNews = result;
                        this.activityCount = result.length;
                    });
                    this.activityService.getInterviews(this.cvCandidate._id).then(result => {
                        this.interviewList = result;
                    })
                })
            });
        });
    }

    getInterviewRequest(interview: InterviewScheduleView) {
        this.selectedInterview = interview;
        this.schedules = this.selectedInterview.schedules.map(schedule => {
            return new CVCCalender(this.getRequiredDate(schedule.dateTime), schedule.isSelected)
        });
        if (this.selectedInterview.organiser.photo != undefined) {
            this.profileService.getFileInfoFromDb(this.selectedInterview.organiser.photo).then(result => {
                let download = new Download(result, this.user._id);
                this.profileService.download(download).then(path => {
                    this.dynamicLink = "http://localhost:9000/assets/files/" + this.user._id + "/" + result.filename;
                })
            })
        }
        this.activityService.getCandidateApplication(this.selectedInterview.job._id, this.selectedInterview.candidateId).then(result => {
            this.application = result[0];
            this.isInterviewRequest = true;
        })
    }
    downloadDocumentFile(document: SharedDocuments, index: number) {
        this.documentObjectId = index;
        let result = new ActualPart(document.objectId, "multipart/form-data", document.name, "JPEG", new Date());
        let download = new Download(result, this.user._id);
        this.profileService.download(download).then(res => {
            this.isDownloadDocument = true;
            this.dynamicLinkDocument = "http://localhost:9000/assets/files/" + this.user._id + "/" + result.filename;
        })
    }
    getRequiredDate(date: any): string {
        let someDate = new Date(date);
        let dd = someDate.getDate();
        let mm = someDate.getMonth() + 1;
        let y = someDate.getFullYear();
        let hours = someDate.getHours();
        let minutes = someDate.getMinutes();
        let someFormattedDate = dd + '/' + mm + '/' + y + ' ' + hours + ':' + minutes;
        return someFormattedDate
    }
    acceptInterviewRequest() {
        this.selectedInterview.hasAccepted = true;
        let changedSchedules = this.selectedInterview.schedules.map(schedule => {
            return this.schedules.map(sch => {
                return new CVCCalender(schedule.dateTime, sch.isSelected);
            });
        });
        this.selectedInterview.schedules = changedSchedules[0];
        this.activityService.acceptInterview(this.selectedInterview).then(result => {
            if (result.length > 0) {
                this.toastOptions.title = "Success";
                this.toastOptions.msg = "Interview Accepted";
                this.toastyService.success(this.toastOptions);
                this.isInterviewRequest = false;
                this.ngOnInit();
            }
            else {
                this.toastOptions.title = "Error";
                this.toastOptions.msg = "Interview Not Accepted";
                this.toastyService.error(this.toastOptions);
            }
        })
    }
    getDiff(date: any): string {
        let date1 = new Date();
        let date2 = new Date(date);
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
}
