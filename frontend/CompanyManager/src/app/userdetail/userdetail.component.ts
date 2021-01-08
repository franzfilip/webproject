import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { user } from '../model/user';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  user: user = new user();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    if (id !== 0)
      this.fetchUser(id);
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
    var context = this;
    xhr.onload = function () {
        console.log('data returned:', xhr.response);
        context.user = xhr.response.data.user;
    }.bind(context);

    xhr.send(JSON.stringify(serverQuery));
  }

  saveUser(): void {
    if (this.user.id === 0) {
      // create
    } else {
      // update
    }
  }

}
