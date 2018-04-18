import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Contact } from "../shared/contact.model";
import { ApiService } from "../shared/api.service";


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  newContact: any;
  loading: boolean = false;
  constructor(private http: Http, private apiService: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true
    const formValue = Object.assign({}, form.value);
    const contact: Contact = {
      "name": `${formValue.firstName} ${formValue.lastName}`,
      "address": formValue.address,
      "phone": `${formValue.areaCode} ${formValue.prefix}-${formValue.lineNumber}`,
      "photoUrl": formValue.photo
    };
    this.apiService.postData("contacts", contact)
      .subscribe((data) => {
        form.reset();
        this.newContact = data;
        this.loading = false;
      });
  }
}