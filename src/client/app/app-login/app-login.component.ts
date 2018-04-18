import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ApiService } from "../shared/api.service"
import { AuthServiceClass } from "../shared/auth.service";

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {


  constructor(private router: Router,
    private authService: AuthServiceClass,
    private apiService: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const payLoad = {
      username: value.username,
      password: value.password
    }
    this.apiService.postData("authenticate", payLoad)
      .subscribe((data) => {
        this.authService.setToken(data.token);
        this.router.navigate(['/api/contacts']);
      });
  }

}
