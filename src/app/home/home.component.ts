import { Component, OnInit } from '@angular/core';
import { UserListService } from '../userlist/userlist.service';
import { MessageService } from '../message/message.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CVUser } from '../userlist/CVUser';
import { ProfileService } from '../profile/profile.service';
import { ActivityService } from '../activity/activity.service';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [MessageService, UserListService,ActivityService],
    styleUrls: ['../cvcloudbase.css']
})

export class HomeComponent implements OnInit {
    user: CVUser;
    count: number = 0;
    activityCount: number = 0;
    constructor(private userListService: UserListService, private messageService: MessageService,
        private route: ActivatedRoute, private router: Router,
        private profileService: ProfileService, private activityService: ActivityService) { }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            let userId = params['id'];
            this.userListService.getUserDeails(userId).then(foundUser => this.user = foundUser);
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

        });
    }
}
