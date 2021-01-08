import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: user[];
  displayedColumns: string[] = [ 'id', 'name', 'action' ];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const server = 'http://localhost:5000/graphql'
    const serverQuery = {
        query: `{
          users {
            id
            name
            pw
            companyId
            roleId
          }
        }`
    };

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', server);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', this.authService.jwtoken);
    var context = this;
    xhr.onload = function () {
        console.log('data returned:', xhr.response);
        context.users = xhr.response.data.users;
    }.bind(context);

    xhr.send(JSON.stringify(serverQuery));
  }

  editClick(id: number): void {
    this.router.navigateByUrl('/users/' + id);
  }

}

