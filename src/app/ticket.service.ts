import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestT} from './model/requestT';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private client: HttpClient) { }
  findTicket(request: RequestT) {
    return this.client.post('http://localhost:8080/find', request);
  }
}
