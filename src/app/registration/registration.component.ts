import { Component, OnInit } from '@angular/core';
import {User} from './model/user';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = {} as User;
  constructor(private service: ApiService) { }

  ngOnInit(): void {
  }

  registration() {
    // tslint:disable-next-line:max-line-length
    this.service.registration(this.user).subscribe( (data: User) => console.log(data.username), error => console.log('user wasn\'t register'));
  }
}
