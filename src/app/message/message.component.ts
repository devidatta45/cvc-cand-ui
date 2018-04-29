import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from './message.service';
import { StatusMessage } from '../userlist/StatusMessage'
import { Router } from '@angular/router';

@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    providers: [MessageService]
})

export class MessageComponent implements OnInit {
    msg: string;
    selectedId: string;

    constructor(private route: ActivatedRoute, private messageService: MessageService,private router: Router) { }
    sendMessage() {
        this.messageService.sendMessage(this.selectedId,"","59105a593000004500df4049","59105a593000004500df4049", this.msg).then(
            result => {
                alert(result.status);
                this.router.navigate(['/userList']);
            }
        );
    }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            let userId = params['id'];
            this.selectedId = userId;
        });
    }
}