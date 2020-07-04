import {Component, OnInit} from '@angular/core';
import {RequestT} from '../model/requestT';
import {ApiService} from '../api.service';
import {Ticket} from '../model/ticket';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  error;
  request = {} as RequestT;
  tickets = {} as Set<Ticket>;
  ticket = {} as Ticket;
  role = sessionStorage.getItem('authenticatedUserRole');
  isReady = true;
  constructor(private service: ApiService) {
  }

  ngOnInit(): void {
 }
  isAdmin(){
    return this.role === 'ADMIN';
  }

  findTicket() {
    this.isReady = false;
    console.log(this.request.date);
    this.service.findTicket(this.request).subscribe((data) => {
      this.tickets = data;
      this.isReady = true;
    }, error => {
      this.error = error.message;
      console.log(error);
      this.isReady = true;
    });
  }


  saveTicket(ticket) {
    this.ticket = ticket;
    this.service.saveTicket(this.ticket).subscribe((data) => console.log(data)

      , error => console.log('do not save'));
  }
}
