import { Component, OnInit } from '@angular/core';
import { UserListService } from 'src/app/services/application/users/user-list.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private userListService: UserListService
  ) { }

  title: string = 'USER LIST'

  users: any[] = []

  getUserList() {
    let userData: any = []
    this.userListService.getAllUsers().subscribe((response: any) => {
      // console.log(response.data)
      this.users = response.data
    })
  }

  updateUser(id: number | string) {
    alert(id)
  }

  deleteUser(id: number | string) {
    alert(id)
  }

  ngOnInit(): void {
    this.getUserList()
  }
}
