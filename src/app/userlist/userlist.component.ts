import { Component, OnInit } from '@angular/core';
import { UserListService } from './userlist.service';
import { CVUser } from './CVUser';
import { StatusMessage } from './StatusMessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [UserListService]
})

export class UserListComponent {
  users: CVUser[];
  user: CVUser;
  status: StatusMessage;

  constructor(private userListService: UserListService, private router: Router) { }

  getUsers(): void {
    this.userListService.getUsers().then(users => this.users = users);
  }
  ngOnInit(): void {
    this.getUsers();
  }
  showDetails(id: string) {
    this.userListService.getUserDeails(id).then(foundUser => this.user = foundUser)
  }
  deleteUser(id: string) {
    this.userListService.deleteUser(id).then(status => this.status = status)
  }
  sendMessage(id: string) {
    this.router.navigate(['/sendMessage', id])
  }
}