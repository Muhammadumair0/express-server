import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Router } from "@angular/router";

@Injectable()

export class AuthServiceClass {

    constructor(private route: Router) { }

    storageKey: string = "TOKEN-STORAGE-KEY";

    setToken(token: string) {
        localStorage.setItem(this.storageKey, token);
    }

    getToken() {
        return localStorage.getItem(this.storageKey);
    }

    isLoggedIn() {
        return this.getToken !== null;
    }

    logOut() {
        localStorage.removeItem(this.storageKey);
        this.route.navigate(['/login']);
    }




}
