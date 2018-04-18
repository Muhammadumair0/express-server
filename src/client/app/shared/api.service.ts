import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Request, RequestMethod, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/Observable"
import { AuthServiceClass } from "./auth.service";
@Injectable()
export class ApiService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: Http, private auth: AuthServiceClass) { }

  postData(url, data) {

    return this.request(url, RequestMethod.Post, data);


  }

  getData(url) {

    return this.request(url, RequestMethod.Get);
  }

  updateData(url, data) {

    return this.request(url, RequestMethod.Put, data);

  }

  deleteData(url) {

    return this.request(url, RequestMethod.Delete);

  }

  //main request HTTP METHOD!
  request(url: string, method: RequestMethod, body?: Object) {

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Authorization', `Bearer ${this.auth.getToken()}`);
    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method,
      headers
    });
    if (body) {
      requestOptions.body = body;
    }
    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => res.json())
      .catch((res: Response) => this.catchError(res));
  }

  catchError(res: Response) {

    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode,
      error: body.error
    };
    console.log("here is the generated error: ", error);

    return Observable.throw(error);
  }

}


//old post and get

  // postData(contact) {
  //   const headers = new Headers({ "Content-Type": "application/json" });
  //   const requestOptions = new RequestOptions({ headers });

  //   return this.http.post("/api/contacts", contact, requestOptions)
  //     .map((res: Response) => {
  //       return res.json();
  //     });
  // }

  // getData() {
  //   return this.http.get("/api/contacts")
  //     .map((res: Response) => {
  //       return res.json();
  //     });
  // }