import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service: ApiService) { }
  isLoggedIn: boolean;
  ngOnInit(): void {
    this.isLoggedIn = this.service.isUserLoggedIn();
  }

  handleLogout() {
    this.service.logout();
  }
}
