import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserListService } from '../userlist/userlist.service';
import { CVUser } from '../userlist/CVUser';
import { Contact } from './Contact';
import { ContactService } from './contact.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ActivityService } from '../activity/activity.service';
import { MessageService } from '../message/message.service';
import { ProfileService } from '../profile/profile.service';


@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    providers: [UserListService, ContactService, ActivityService, MessageService, ProfileService],
    styleUrls: ['../cvcloudbase.css']
})

export class ContactComponent implements OnInit {
    user: CVUser;
    contact: Contact;
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

    constructor(private route: ActivatedRoute, private router: Router,
        private userListService: UserListService, private contactService: ContactService,
        private toastyService: ToastyService, private toastyConfig: ToastyConfig,
        private messageService: MessageService, private activityService: ActivityService,
        private profileService: ProfileService) { }
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
            this.profileService.getCandidateDetails(userId).then(candidate => {
                this.activityService.getAllNews(candidate._id).then(result => {
                    this.activityCount = result.length;
                });
            });
            this.userListService.getUserDeails(userId).then(user => {
                this.user = user;
                this.contact = new Contact(user._id, "", "", "", "", "");
            });
        });
    }
    createMessage(message: Contact) {
        this.contactService.sendMessage(message).then(message => {
            this.toastOptions.title = "Success";
            this.toastOptions.msg = message.status;
            this.toastyService.success(this.toastOptions);
            this.contact = new Contact(this.user._id, "", "", "", "", "");
        })
    }
}
