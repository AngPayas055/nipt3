import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class SecurityRouterActivate implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate() {
        if (localStorage.getItem("token") == null) {
            return true;
        } else {
            if (localStorage.getItem("user_type") === 'User') {
                this.router.navigate(["/applicant"]);
                return false;
            } else if (localStorage.getItem("user_type") === 'Admin') {
                this.router.navigate(["/application"]);
                return false;
            }
            else {
                return true;
            }
        }
    }
}