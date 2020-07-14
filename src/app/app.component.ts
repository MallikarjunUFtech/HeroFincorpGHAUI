import { Component } from '@angular/core';
import { Router } from '@angular/router';


import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    isLoggedIn : any=false;
    firstname: any="";
    constructor(
        private router: Router
    ) {
       
        this.isLoggedIn = true;
       
    }



    logout() {
     this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }
}