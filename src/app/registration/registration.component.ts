import {Component, OnInit} from '@angular/core';
import {User} from './model/user';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = {} as User;
  password;
  error;

  constructor(private service: ApiService, private  router: Router) {
  }

  ngOnInit(): void {
  }

  registration() {
    if ( this.user.password !== this.password){
      this.error = 'Password mismatch';
    }
    else{
      if (this.password.length < 8) { this.error = 'Password must be at least 8 characters'; }
      else {
      this.service.registration(this.user).subscribe(
      (data: User) => {console.log(data.username);
                       this.router.navigate(['/']);
      },
        error => { console.log('user wasn\'t register');
                   this.error = 'User with this login exist';
      });
     }
    }
  }
}
