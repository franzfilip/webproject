import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService: UserserviceService) { }

  ngOnInit(): void {
  }

}
