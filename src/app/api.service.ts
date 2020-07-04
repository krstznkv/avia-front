import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './registration/model/user';
import {map} from 'rxjs/operators';
import {RequestT} from './model/requestT';
import {Ticket} from './model/ticket';
import {AirlineTop} from './model/airline-top';
import {Message} from './model/message';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  username: string;
  password: string;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_PASSWORD_SESSION_ATTRIBUTE_PASSWORD = 'authenticatedUserPassword';
  USER_ROLE_SESSION_ATTRIBUTE_ROLE = 'authenticatedUserRole';


  constructor(private client: HttpClient) {
  }

  login(username: string, password: string) {
    return this.client.get('http://localhost:8080/login',
      {headers: {authorization: this.createBasicAuthToken(username, password)}}).pipe(map(() => {
      this.username = username;
      this.password = password;
      sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
      sessionStorage.setItem(this.USER_PASSWORD_SESSION_ATTRIBUTE_PASSWORD, password);
      this.findUser().subscribe((data) => {
        console.log(data);
        sessionStorage.setItem(this.USER_ROLE_SESSION_ATTRIBUTE_ROLE, data.message);
       }, error => {

        console.log(error);
      });
    }));
  }
  findUser(){
    return this.client.post<Message>('http://localhost:8080/findUser', this.username);
  }
  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registration(user: User) {
    return this.client.post<User>('http://localhost:8080/registration', user);
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user !== null;
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_ROLE_SESSION_ATTRIBUTE_ROLE);
    sessionStorage.clear();
    this.username = null;
    this.password = null;
  }
  findTicket(request: RequestT) {
    return this.client.post<Set<Ticket>>('http://localhost:8080/find', request);
  }
  saveTicket(ticket: Ticket){
    return this.client.post('http://localhost:8080/saveTicket', ticket);
  }
  findTop(){
    return this.client.post<Array<AirlineTop>>('http://localhost:8080/test', '');
  }
}
