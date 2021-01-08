import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  username: string;
  pw: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    // this.authService.signIn({username: "testuser", password: "foobar"}).subscribe((res) => {
    //   console.log("Logged in!");
    // });
    const server = 'http://localhost:5000/auth'
    const serverQuery = JSON.stringify({
        "username": this.username,
        "password": this.pw

    });

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', server);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var context = this;
    xhr.onload = function () {
        context.authService.jwtoken = xhr.responseText;
    }.bind(context);

    xhr.send(serverQuery);
  }

}
