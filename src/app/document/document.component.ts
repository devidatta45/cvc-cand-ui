import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Skill } from '../profile/Skill';
import { Documents } from '../profile/Documents';
import { ActualPart } from '../profile/ActualPart';
import { Download } from '../profile/Download';
import { StatusMessage } from '../userlist/StatusMessage';
import { CVCCandidate } from '../profile/CVCCandidate';
import { ProfileService } from '../profile/profile.service';
import { CVUser } from '../userlist/CVUser';
import { UserListService } from '../userlist/userlist.service';
import { FileUploader, FileSelectDirective, FileUploaderOptions, Headers } from 'ng2-file-upload';
import { FileUploaderExtended } from './FileUploaderExtended';
import { ActivityService } from '../activity/activity.service';
import { MessageService } from '../message/message.service';

@Component({
    selector: 'document',
    templateUrl: './document.component.html',
    providers: [ProfileService, UserListService, FileSelectDirective, ActivityService, MessageService],
    styleUrls: ['../cvcloudbase.css', '../login/css/mobile-menu.css', '../login/css/responsive.css', '../login/css/style.css']
})

export class DocumentComponent implements OnInit {
    url: string = 'http://localhost:9000/upload';
    urlMultiple: string = 'http://localhost:9000/uploadMultiple';
    cvCandidate: CVCCandidate;
    candidateId: String;
    user: CVUser;
    public uploader: FileUploaderExtended;
    public multiUploader: FileUploaderExtended;
    actualResult: ActualPart;
    isDownload: Boolean = false;
    isDownloadDocument: Boolean = false;
    dynamicLink: string = "";
    dynamicLinkDocument: string = "";
    documentObjectId: number = 0;
    count: number = 0;
    activityCount: number = 0;
    isFileOpen: Boolean = false;
    isFileOpenMultiple: Boolean = false;
    constructor(private route: ActivatedRoute, private profileService: ProfileService,
        private userListService: UserListService, private router: Router,
        private messageService: MessageService, private activityService: ActivityService) {

    }
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
            this.isFileOpen = false;
            this.isFileOpenMultiple = false;
            this.userListService.getUserDeails(userId).then(user => {
                this.user = user;
                this.profileService.getCandidateDetails(userId).then(candidate => {
                    this.activityService.getAllNews(candidate._id).then(result => {
                        this.activityCount = result.length;
                    });
                    if (candidate.cvcUserId != undefined) {
                        this.cvCandidate = <CVCCandidate>candidate;
                        this.uploader = new FileUploaderExtended({ url: this.url + "/" + this.cvCandidate._id })
                        this.uploader.setHeader("apiKey", localStorage.getItem("apiKey"));
                        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                            this.ngOnInit();
                        };
                        this.multiUploader = new FileUploaderExtended({ url: this.urlMultiple + "/" + this.cvCandidate._id })
                        this.multiUploader.setHeader("apiKey", localStorage.getItem("apiKey"));
                        this.multiUploader.onCompleteAll = () => {
                            this.ngOnInit();
                        };
                        if (this.cvCandidate.employmentDetails != undefined &&
                            this.cvCandidate.employmentDetails.resume != undefined) {
                            this.profileService.getFileInfoFromDb(this.cvCandidate.employmentDetails.resume.objectId).then(result => {
                                this.actualResult = result;
                            })
                        }
                    }
                    else {
                        this.cvCandidate = null;
                    }
                }
                );
            });
        });
    }
    downloadFile(result: ActualPart) {
        let download = new Download(result, this.user._id);
        this.profileService.download(download).then(res => {
            this.isDownload = true;
            this.dynamicLink = "http://localhost:9000/assets/files/" + this.user._id + "/" + result.filename;
        })
    }
    uploadResume() {
        this.cvCandidate.employmentDetails.resume = null;
    }
    downloadDocumentFile(document: Documents, index: number) {
        this.documentObjectId = index;
        let result = new ActualPart(document.objectId, "multipart/form-data", document.name, "JPEG", new Date());
        let download = new Download(result, this.user._id);
        this.profileService.download(download).then(res => {
            this.isDownloadDocument = true;
            this.dynamicLinkDocument = "http://localhost:9000/assets/files/" + this.user._id + "/" + result.filename;
        })
    }
    uploadDocuments() {
        this.cvCandidate.employmentDetails.candidateDocuments = [];
    }

    getRequiredDate(date: string): string {
        let someDate = new Date(date);
        let dd = someDate.getDate();
        let mm = someDate.getMonth() + 1;
        let y = someDate.getFullYear();
        let someFormattedDate = dd + '/' + mm + '/' + y;
        return someFormattedDate
    }
}
