import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CVUser } from '../userlist/CVUser';
import { LoginService } from '../login/login.service';


@Component({
    selector: 'include-top',
    templateUrl: './includetop.html',
    styleUrls: ['../cvcloudbase.css', '../login/css/mobile-menu.css', '../login/css/responsive.css', '../login/css/style.css']
})

export class IncludeTopComponent {
    @Input() user: CVUser;
    @Input() count: number;
    @Input() activityCount: number;
    constructor(private route: ActivatedRoute, private router: Router,
        private loginService: LoginService) { }
    logout() {
        this.loginService.logout(localStorage.getItem("apiKey")).then(res => {
            localStorage.removeItem("apiKey");
            this.router.navigate(['/login']);
        })
    }
    showAllMessage(userId: string) {
        this.router.navigate(['/showAllMessage', userId]);
    }
    showProfile(userId: string) {
        this.router.navigate(['/profile', userId]);
    }
    // showHome(userId: string) {
    //     this.router.navigate(['/home', userId]);
    // }
    showSkill(userId: string) {
        this.router.navigate(['/skill', userId]);
    }
    showDocument(userId: string) {
        this.router.navigate(['/document', userId]);
    }
    showContact(userId: string) {
        this.router.navigate(['/contact', userId]);
    }
    showActivityCentre(userId: string) {
        this.router.navigate(['/activity', userId]);
    }
}