import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Skill } from '../profile/Skill';
import { StatusMessage } from '../userlist/StatusMessage';
import { CVCCandidate } from '../profile/CVCCandidate';
import { ProfileService } from '../profile/profile.service';
import { CVUser } from '../userlist/CVUser';
import { UserListService } from '../userlist/userlist.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ActivityService } from '../activity/activity.service';
import { MessageService } from '../message/message.service';
@Component({
    selector: 'skill',
    templateUrl: './skill.component.html',
    providers: [ProfileService, UserListService, ActivityService, MessageService],
    styleUrls: ['../cvcloudbase.css', '../login/css/mobile-menu.css', '../login/css/responsive.css', '../login/css/style.css']
})

export class SkillComponent implements OnInit {

    private chartColors: any[] = [{ borderColor: 'rgba(245, 242, 242, 1)', backgroundColor: ["rgba(66, 192, 251, 1)", "rgba(245, 242, 242, 1)"] }];


    cvCandidate: CVCCandidate;
    isSkill: Boolean = false;
    candidateId: String;
    user: CVUser;
    isEdit: Boolean = false;
    skillList: Array<Skill> = [];
    pieChartType: string = 'doughnut';
    pieChartLabels: string[] = ['score', 'lack'];
    requestedSkill: string = "";
    numbers: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    dataList: Array<{ name: string, score: number, isPrimary: Boolean, isDisabled: Boolean, list: Array<number> }> = [];
    public doughnutChartOptions: any = {

        cutoutPercentage: 60,
        borderWidth: 1,
        borderColor: '#36A2EB',
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            center: {
                text: 'Desktop',
                color: '#36A2EB', //Default black
                fontStyle: 'Helvetica', //Default Arial
                sidePadding: 15 //Default 20 (as a percentage)
            }
        }
    };
    isOpenForSecondary: Boolean = false;
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
    isTransfer: Boolean = false;
    count: number = 0;
    activityCount: number = 0;
    primarySkillList: Array<{ name: string, score: number, isPrimary: Boolean, isDisabled: Boolean, list: Array<number> }> = [];
    secondarySkillList: Array<{ name: string, score: number, isPrimary: Boolean, isDisabled: Boolean, list: Array<number> }> = [];
    otherSkillList: Array<Skill> = [];


    constructor(private route: ActivatedRoute, private profileService: ProfileService,
        private userListService: UserListService, private router: Router,
        private toastyService: ToastyService, private toastyConfig: ToastyConfig,
        private messageService: MessageService, private activityService: ActivityService) { }
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
            this.isTransfer = false;
            this.userListService.getUserDeails(userId).then(user => {
                this.user = user;
                this.profileService.getCandidateDetails(userId).then(candidate => {
                    this.activityService.getAllNews(candidate._id).then(result => {
                        this.activityCount = result.length;
                    });
                    if (candidate.cvcUserId != undefined) {
                        this.cvCandidate = <CVCCandidate>candidate;
                        this.dataList = [];
                        if (this.cvCandidate.skills.length > 0) {
                            this.skillList = this.cvCandidate.skills;
                            this.checkPrimaryCheckBox("");
                            for (let i = 0, index = this.skillList.length; i < index; i++) {
                                this.dataList.push({
                                    name: this.skillList[i].name,
                                    score: this.skillList[i].score,
                                    isPrimary: this.skillList[i].isPrimary,
                                    isDisabled: this.skillList[i].isDisabled,
                                    list: [this.skillList[i].score, 10 - this.skillList[i].score]
                                })
                            }
                            this.primarySkillList = this.dataList.filter(skill => {
                                return skill.isPrimary == true;
                            });
                            this.secondarySkillList = this.dataList.filter(skill => {
                                return skill.isPrimary == false;
                            });
                            if (this.cvCandidate.employmentDetails != undefined && this.cvCandidate.employmentDetails.currentEmployer != undefined) {
                                this.otherSkillList = this.cvCandidate.employmentDetails.currentEmployer.skills.filter(this.comparer(this.dataList))
                            }
                            this.isSkill = true;
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

    comparer(otherArray: Array<{ name: string, score: number, isPrimary: Boolean, list: Array<number> }>) {
        return function (current) {
            return otherArray.filter(function (other) {
                return other.name == current.name
            }).length == 0;
        }
    }
    editOpen() {
        this.skillList = this.cvCandidate.skills;
        this.isEdit = !this.isEdit;
        this.isSkill = !this.isSkill;
        this.checkPrimaryCheckBox("");
    }
    addToList() {
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
    addToSingleList() {
        this.checkPrimary("");
        if (this.isOpenForSecondary) {
            let skill = new Skill("", 0, false);
            skill.isDisabled = false;
            this.skillList.push(skill);
        }
        else {
            let skill = new Skill("", 0, false);
            skill.isDisabled = true;
            this.skillList.push(skill);
        }
    }
    checkPrimary(event: any) {
        let primarySkills = this.skillList.filter(function (skill) {
            return skill.isPrimary == true;
        })
        if (primarySkills.length == 6) {
            this.isOpenForSecondary = false;
        }
        else {
            this.isOpenForSecondary = true;
        }
    }
    checkPrimaryCheckBox(event: any) {
        let primarySkills = this.skillList.filter(function (skill) {
            return skill.isPrimary == true;
        })
        if (primarySkills.length == 6) {
            this.isOpenForSecondary = false;
            let secondarySkills = this.skillList.filter(function (skill) {
                return skill.isPrimary == false;
            });
            secondarySkills.map(function (skill) {
                skill.isDisabled = true;
            });
        }
        else {
            this.isOpenForSecondary = true;
            this.checkRemoveLogic();
        }
        console.log(this.skillList);
    }
    checkRemoveLogic() {
        for (let i = 0, size = this.skillList.length; i < size; i++) {
            if (this.skillList[i].isPrimary == false && this.skillList[i].isDisabled == true) {
                this.skillList[i].isDisabled = false;
                break;
            }
        }
    }
    removeFromList(index: number) {
        if (index > -1) {
            this.skillList.splice(index, 1);
        }
    }
    increaseValue(skill: Skill) {
        if (skill.score < 10) {
            skill.score = skill.score + 1;
        }
    }
    decreaseValue(skill: Skill) {
        if (skill.score > 0) {
            skill.score = skill.score - 1;
        }
    }
    updateSkills() {
        let skills = this.skillList.map(function (skill) {
            return {
                name: skill.name, score: parseFloat(skill.score.toString()), isPrimary: skill.isPrimary,
                isDisabled: skill.isDisabled
            }
        })
        this.profileService.editCandidateSkill(this.cvCandidate._id, skills).then(message => {
            this.toastOptions.title = "Success";
            this.toastOptions.msg = message.status;
            this.toastyService.success(this.toastOptions);
            this.isSkill = !this.isSkill;
            this.isEdit = !this.isEdit;
            this.ngOnInit();
        })
    }
    saveSkills() {
        let primarySkills = this.primarySkillList.map(function (skill) {
            return {
                name: skill.name, score: parseFloat(skill.score.toString()), isPrimary: skill.isPrimary,
                isDisabled: skill.isDisabled
            }
        });
        let secondarySkills = this.secondarySkillList.map(function (skill) {
            return {
                name: skill.name, score: parseFloat(skill.score.toString()), isPrimary: skill.isPrimary,
                isDisabled: skill.isDisabled
            }
        });
        let totalSkills = primarySkills.concat(secondarySkills);
        this.profileService.editCandidateSkill(this.cvCandidate._id, totalSkills).then(message => {
            this.toastOptions.title = "Success";
            this.toastOptions.msg = message.status;
            this.toastyService.success(this.toastOptions);
            this.isSkill = !this.isSkill;
            this.isEdit = !this.isEdit;
            this.ngOnInit();
        })
    }
    cancelSkillChange() {
        this.ngOnInit();
    }
    clickOpen() {
        this.addToList();
        this.isEdit = !this.isEdit;
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
