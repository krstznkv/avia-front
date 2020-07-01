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

  constructor(private service: ApiService) {
  }

  ngOnInit(): void {
  }


  fingTicket() {
    this.service.findTicket(this.request).subscribe((data) => {
      console.log(data);
      this.tickets = data;
    }, error => {
      this.error = error.message;
      console.log(error);
    });
  }


  saveTicket(ticket) {
    this.ticket = ticket;
    this.service.saveTicket(this.ticket).subscribe((data) => console.log(data)

      , error => console.log('do not save'));
  }
}
