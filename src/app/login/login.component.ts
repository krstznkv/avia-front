import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error;

  constructor(private service: ApiService, private  router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.service.login(this.username, this.password).subscribe(data => {
        console.log(data);
        this.router.navigate(['/home']);
      },
      error => {
        if (error.status === 401) {
          this.error = 'Wrong login or password';
        } else {
          this.error = error.message;
        }
        console.log(error);
      });
  }
}
