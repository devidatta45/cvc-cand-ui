import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './userlist/userlist.component';
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home.component';
import { CandidateMessageComponent } from './candiateMessage/candidateMessage.component';
import { IncludeTopComponent } from './home/includetop.component';
import { IncludeFooterComponent } from './home/includefooter.component';
import { ProfileComponent } from './profile/profile.component';
import { SkillComponent } from './skill/skill.component';
import { DocumentComponent } from './document/document.component';
import { ContactComponent } from './contact/contact.component';
import { ActivityComponent } from './activity/activity.component';
import { ForgetPasswordComponent } from './forgetpassword/forget.component';
import { AuthGuard } from './app.guard';


import { UserListService } from './userlist/userlist.service';
import { MessageService } from './message/message.service';
import { SafePipe } from './profile/SafePipe';
import { LoginService } from './login/login.service';
import { ProfileService } from './profile/profile.service';
import { ErrorService } from './http.error.service';
import { ContactService } from './contact/contact.service';
import { ActivityService } from './activity/activity.service';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdOptionModule, MdSelectModule } from '@angular/material';
import { DatepickerModule } from 'angular2-material-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader, FileUploaderOptions, Headers } from 'ng2-file-upload/ng2-file-upload';
import { ChartsModule } from 'ng2-charts';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { ToastyModule } from 'ng2-toasty';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { Constant } from './Constants';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    MessageComponent,
    HomeComponent,
    SafePipe,
    CandidateMessageComponent,
    IncludeTopComponent,
    ProfileComponent,
    SkillComponent,
    IncludeFooterComponent,
    DocumentComponent,
    ContactComponent,
    ActivityComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgetpassword/:id',
        component: ForgetPasswordComponent
      },
      {
        path: 'login/:id',
        component: LoginComponent
      },
      {
        path: 'userList',
        component: UserListComponent
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'sendMessage/:id',
        component: MessageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'showAllMessage/:id',
        component: CandidateMessageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'skill/:id',
        component: SkillComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'document/:id',
        component: DocumentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'contact/:id',
        component: ContactComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'activity/:id',
        component: ActivityComponent,
        canActivate: [AuthGuard]
      }
    ]),
    HttpModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    BrowserAnimationsModule,
    DatepickerModule,
    FileUploadModule,
    ChartsModule,
    MdOptionModule,
    MdSelectModule,
    PasswordStrengthBarModule,
    LeafletModule,
    ToastyModule.forRoot()
  ],
  providers: [UserListService, MessageService, ErrorService, LoginService, ProfileService, ContactService, ActivityService,
    AuthGuard, FileSelectDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
