import { Component, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Contact } from "../shared/contact.model";
import { ApiService } from "../shared/api.service";
import "rxjs/add/operator/map";


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  constructor(public http: Http, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getData("contacts")
      .subscribe((data: any) => {
        return this.contacts = data;
      });
  }
}
