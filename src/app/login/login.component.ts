
import { Component, OnInit } from '@angular/core';
import { Login } from './Login';
import { Job } from './Job';
import { JobApplication } from './JobApplication';
import { RequiredSkill } from './RequiredSkill';
import { LoginService } from './login.service';
import { LoginResult } from './LoginResult';
import { CVUser } from '../userlist/CVUser';
import { CVCCandidate } from '../profile/CVCCandidate';
import { Audit } from '../profile/Audit';
import { Skill } from '../profile/Skill';
import { ForgetPassword } from './ForgetPassword';
import { ProfileService } from '../profile/profile.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./css/mobile-menu.css', './css/responsive.css', './css/style.css'],
  providers: [LoginService, ProfileService]
})

export class LoginComponent implements OnInit {
  login: Login = new Login("", "");
  user: CVUser;
  isRegister: Boolean = false;
  register: CVUser = new CVUser("", "", "", "", "", "", "", "", "");
  failureMessage: string;
  jobReference: string;
  isDirect: Boolean = false;
  titleList: string[] = Array("Mr", "Mrs", "Ms");
  skillList: Array<RequiredSkill> = [];
  secondarySkillList: Array<{ skill: Skill, isActive: Boolean }> = [];
  cvCandidate: CVCCandidate;
  numbers: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  emailAgain: string = "";
  passwordAgain: string = "";
  emailText = "";
  passwordText = "";
  job: Job;
  passwordLabel = "STRENGTH INDICATOR";
  isForget: Boolean = false;
  mail: string = "";
  isConfirmed: Boolean = false;
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
  emailPresent: Array<CVUser> = [];
  status: string = "";
  statusArray: Array<{ skill: Skill, status: string }> = []

  constructor(private loginService: LoginService, private profileService: ProfileService, private router: Router,
    private route: ActivatedRoute, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'material';
  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let reference = params['id'];
      if (reference != undefined) {
        this.jobReference = reference
        this.isRegister = true;
        this.loginService.getJobById(this.jobReference).then(result => {
          this.job = result;
          this.skillList = this.job.primarySkillsRequired.map(skill => {
            let requiredSkill = new RequiredSkill(skill.name, skill.score, 0, true);
            return requiredSkill;
          });
          this.secondarySkillList = this.job.secondarySkillsRequired.map(skill => {
            return { skill: skill, isActive: false };
          });
        })
      }
      if (this.skillList.length == 0) {
        this.addToList();
      }
    }
    );
  }
  showLogin(){
    this.isRegister=false;
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  checkRange(skill: Skill) {
    let foundObj = this.statusArray.filter(st => {
      return st.skill.name == skill.name
    });
    if (foundObj.length == 0) {
      if (skill.score >= 0 && skill.score <= 10) {
        let obj = { skill: skill, status: "" };
        this.statusArray.push(obj);
      }
      else {
        let obj = { skill: skill, status: "Please write score between 0 to 10" };
        this.statusArray.push(obj);
      }
    }
    else {
      if (skill.score >= 0 && skill.score <= 10) {
        let obj = foundObj[0];
        obj.status = "";
      }
      else {
        let obj = foundObj[0];
        obj.status = "Please write score between 0 to 10";
      }
    }
  }

  getStatus(skill: Skill): string {
    let foundObj = this.statusArray.filter(st => {
      return st.skill.name == skill.name
    });
    if (foundObj.length > 0) {
      return foundObj[0].status;
    }
    else {
      return "";
    }
  }

  showError() {
    this.toastOptions.title = "Error";
    this.toastOptions.msg = "You need to log in for this..";
    this.toastyService.error(this.toastOptions);
  }
  showDetails(login: Login) {
    this.loginService.authenticate(login.email, login.password).then(result => {
      if (result.token == undefined) {
        this.toastOptions.title = "Error";
        this.toastOptions.msg = "User does not exist";
        this.toastyService.error(this.toastOptions);
      }
      else {
        if (!result.user.clientRef) {
          this.router.navigate(['/profile', result.user._id]);
          localStorage.setItem("apiKey", result.token);
        }
        else {
          this.toastOptions.title = "Error";
          this.toastOptions.msg = "This is for candidate login..Not for client";
          this.toastyService.error(this.toastOptions);
        }
      }
    })
  }
  createUser(register: CVUser) {
    this.loginService.createUser(register).then(candidate => {
      this.toastOptions.msg = "User Created";
      this.toastOptions.title = "Success";
      this.toastyService.success(this.toastOptions);
      this.cvCandidate = candidate;
      this.isDirect = true;
    }, err => {
      if (err.status == 500) {
        this.toastOptions.title = "Error";
        this.toastOptions.msg = "Email already exist.Please use forget password if you forgot your password";
        this.toastyService.error(this.toastOptions);
      }
    }
    )
  }
  checkEmail(event: any) {
    if (this.emailAgain != this.register.email) {
      this.emailText = "Email Not Matching"
    }
    else {
      this.emailText = ""
    }
  }
  checkPassword(event: any) {
    if (this.passwordAgain != this.register.password) {
      this.passwordText = "Password Not Matching"
    }
    else {
      this.passwordText = ""
    }
  }
  addToList() {
    let skill = new RequiredSkill("", 0, 0, true);
    let skill1 = new RequiredSkill("", 0, 0, true);
    let skill2 = new RequiredSkill("", 0, 0, true);
    let skill3 = new RequiredSkill("", 0, 0, true);
    let skill4 = new RequiredSkill("", 0, 0, true);
    let skill5 = new RequiredSkill("", 0, 0, true);
    this.skillList.push(skill);
    this.skillList.push(skill1);
    this.skillList.push(skill2);
    this.skillList.push(skill3);
    this.skillList.push(skill4);
    this.skillList.push(skill5);
  }
  removeFromList(index: number) {
    if (index > -1) {
      this.skillList.splice(index, 1);
    }
  }
  resetPassword() {
    let forgetPassword = new ForgetPassword(this.mail, "http://localhost:4200/forgetpassword");
    this.loginService.resetPassword(forgetPassword).then(result => {
      this.isConfirmed = true;
      this.emailPresent = result;
    })
  }
  updateSkills() {
    let skills = this.skillList.map(function (skill) {
      return { name: skill.name, score: parseFloat(skill.score.toString()), isPrimary: skill.isPrimary, isDisabled: skill.isDisabled }
    })
    let secondarySkills = this.secondarySkillList.filter(skill => {
      return skill.isActive == true;
    }).map(sk => sk.skill);
    skills = skills.concat(secondarySkills);
    if (this.jobReference != undefined) {
      let status = "Pending For Approval";
      let qualifiedRatio = "0/6";
      let jobApplication = new JobApplication(this.job._id, this.cvCandidate._id, this.cvCandidate.cvcUserId,
        skills, [],[], qualifiedRatio, status, false);
      this.loginService.applyJob(jobApplication).then(result => {
        if (result) {
          this.profileService.editCandidateSkill(this.cvCandidate._id, skills).then(message => {
            this.toastOptions.msg = message.status + " and Job applied";
            this.toastOptions.title = "Success"
            this.toastyService.success(this.toastOptions);
            this.isRegister = false;
            this.router.navigate(['/login']);
            this.register = new CVUser("", "", "", "", "", "", "", "", "");
            this.skillList = [];
            this.addToList();
          })
        }
      })
    }
    else {
      this.profileService.editCandidateSkill(this.cvCandidate._id, skills).then(message => {
        this.toastOptions.msg = message.status;
        this.toastOptions.title = "Success"
        this.toastyService.success(this.toastOptions);
        this.isRegister = false;
        this.router.navigate(['/login']);
        this.register = new CVUser("", "", "", "", "", "", "", "", "");
        this.skillList = [];
        this.addToList();
      })
    }
  }
}
