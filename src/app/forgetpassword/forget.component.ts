
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ForgetPassword } from '../login/ForgetPassword';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
    selector: 'forgetpassword',
    templateUrl: './forget.component.html',
    styleUrls: ['../login/login.component.css', '../login/css/mobile-menu.css', '../login/css/responsive.css', '../login/css/style.css'],
    providers: [LoginService]
})

export class ForgetPasswordComponent implements OnInit {
    forgetPassword: ForgetPassword;
    passwordAgain: string = "";
    passwordLabel: string = "STRENGTH INDICATOR";
    passwordText: string = ""
    toastOptions: ToastOptions = {
        title: "Error",
        msg: "User does not exist",
        showClose: true,
        timeout: 2000,
        theme: 'material',
        onAdd: (toast: ToastData) => {
            console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function (toast: ToastData) {
            console.log('Toast ' + toast.id + ' has been removed!');
        }
    };

    constructor(private loginService: LoginService, private router: Router, private toastyService: ToastyService,
        private toastyConfig: ToastyConfig, private route: ActivatedRoute, ) { }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            let key = params['id'];
            this.loginService.getMailByKey(key).then(result => {
                this.forgetPassword = new ForgetPassword(result.status, "");
            });
        });

    }
    checkPassword(event: any) {
        if (this.passwordAgain != this.forgetPassword.link) {
            this.passwordText = "Password Not Matching"
        }
        else {
            this.passwordText = ""
        }
    }
    resetPassword() {
        this.loginService.changePassword(this.forgetPassword).then(result => {
            this.toastOptions.title = "Success";
            this.toastOptions.msg = "Password reset successfully";
            let router = this.router;
            this.toastOptions.onRemove = function (toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
                router.navigate(['/login']);
            }
            this.toastyService.success(this.toastOptions);
        });
    }
}
