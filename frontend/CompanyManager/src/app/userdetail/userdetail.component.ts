import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  user: user = new user(0, '', '', 0);

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    if (id !== 0)
      this.fetchUser(id);
    else
      this.user = new user(0, '', '', 0);
  }

  fetchUser(id: number): void {
    const server = 'http://localhost:5000/graphql'
    const serverQuery = {
        query: `{
          user(id: ${id}) {
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
        context.user = xhr.response.data.user;
    }.bind(context);

    xhr.send(JSON.stringify(serverQuery));
  }

  saveUser(): void {
    const server = 'http://localhost:5000/graphql';
    let serverQuery;

    if (this.user.id === 0) {
      serverQuery = { 
        query: `mutation {
          addUser(companyId:1, name:${this.user.name}, roleId:${this.user.roleId}){
            id
          }
        }
        `
      }
    } else {
      serverQuery = {
        query: `mutation {
          updateUser(userId:${this.user.id},name:\"${this.user.name}\",roleId:${this.user.roleId}){
            id
          }
        }
        `
      }
    }

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', server);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', this.authService.jwtoken);
    let context = this;
    xhr.onload = function () {
        console.log('data returned:', xhr.response);
        context.router.navigateByUrl('/users');
    }.bind(context);

    xhr.send(JSON.stringify(serverQuery));
  }

}
