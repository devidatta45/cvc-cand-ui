import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageWithOwner } from './MessageWithOwner'
import { UserListService } from '../userlist/userlist.service';
import { CVUser } from '../userlist/CVUser';
import { Conversation } from '../message/Conversation';
import { ActivityService } from '../activity/activity.service';
import { ProfileService } from '../profile/profile.service';

@Component({
    selector: 'candidate-message',
    templateUrl: './candidateMessage.component.html',
    providers: [UserListService, ActivityService, MessageService,ProfileService],
    styleUrls: ['../cvcloudbase.css', '../profile/css/mobile-menu.css', '../profile/css/responsive.css', '../profile/css/style.css']
})

export class CandidateMessageComponent implements OnInit {
    messages: Array<MessageWithOwner>;
    user: CVUser;
    replyMessage: string = "";
    conversations: Array<{ lastTime: any, conversation: Conversation }> = [];
    selectedMessage: MessageWithOwner;
    messagesFromClient: Array<any>;
    selectedItem: string = "";
    count: number = 0;
    activityCount: number = 0;
    constructor(private messageService: MessageService, private route: ActivatedRoute,
        private router: Router, private userListService: UserListService,
        private activityService: ActivityService,private profileService: ProfileService) { }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            let userId = params['id'];
            this.userListService.getUserDeails(userId).then(user => this.user = user);
            this.profileService.getCandidateDetails(userId).then(candidate => {
                this.activityService.getAllNews(candidate._id).then(result => {
                    this.activityCount = result.length;
                });
            });
            this.messageService.getAllMessages(userId).then(messages => {
                this.messages = messages;
                this.count = 0;
                messages.map(msg => {
                    msg.messages.map(ms => {
                        ms.chatConversation.map(chat => {
                            this.count = this.count + 1;
                        });
                    });
                });
                this.messagesFromClient = this.messages.map(msg => {
                    return this.insertAllMessages(msg)
                })
            })
        });
    }
    reply(message: MessageWithOwner) {
        this.messageService.sendMessage(this.user._id, message.messages[0].consoleId, message.owner._id, this.user._id, this.replyMessage).then(
            result => {
                this.replyMessage = "";
                this.ngOnInit();
            }
        );
    }

    insertAllMessages(message: MessageWithOwner) {
        this.showMessages(message);
        return { message: message, conversation: this.conversations };
    }
    showMessages(message: MessageWithOwner) {
        this.selectedMessage = message;
        this.selectedItem = message.owner._id;
        this.conversations = [];
        message.messages.forEach(msg => {
            msg.chatConversation.forEach(chat => {
                let msgLastTime = this.getDiff(msg.lastTimeTalk);
                this.conversations.push({ lastTime: msgLastTime, conversation: chat });
            })
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
