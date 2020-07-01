import {Component, OnInit} from '@angular/core';
import {User} from './model/user';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = {} as User;
  password;
  error;

  constructor(private service: ApiService) {
  }

  ngOnInit(): void {
  }

  registration() {
    if ( this.user.password !== this.password){
      this.error = 'Password mismatch';
    }
    else{
    this.service.registration(this.user).subscribe(
      (data: User) => console.log(data.username),
        error => console.log('user wasn\'t register'));
    }
  }
}
