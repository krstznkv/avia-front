import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {AirlineTop} from '../model/airline-top';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  airlines = {} as Array<AirlineTop>;

  constructor(private service: ApiService) { }

  ngOnInit(): void {
  }

  findTop() {
   this.service.findTop().subscribe( (data) => {console.log(data);
                                                this.airlines = data;
   }, error => console.log('not found'));
  }
}
