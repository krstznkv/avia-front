import { Component, OnInit } from '@angular/core';
import {TicketService} from '../ticket.service';
import {RequestT} from '../model/requestT';
import {ApiService} from '../api.service';
import {Ticket} from '../model/ticket';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activeTab = 'home';
  request = {} as RequestT;
  tickets = {} as Set<Ticket> ;
  ticket = {} as Ticket;
  constructor(private service: ApiService) { }

  ngOnInit(): void {
  }

  changeTab(activeTav) {
    this.activeTab = activeTav;
  }

  fingTicket() {
   this.service.findTicket(this.request).subscribe( (data) => {console.log(data);
                                                               this.tickets = data;
   }, error => console.log('not found'));
  }


  saveTicket(ticket) {
   this.ticket = ticket;
   this.service.saveTicket(this.ticket).subscribe( (data) => console.log(data)

    , error => console.log('do not save'));
  }
}
