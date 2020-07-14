import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


import { UserService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    loggedIn: any= true;
    users = [];

    constructor(
        private userService: UserService,private route: ActivatedRoute,
        private router: Router
    ) {
     
    }

    ngOnInit() {
   
      this.loggedIn= true;
    }

    helathIns()
    {
     this.router.navigate(['/register']);
    }

    logout() {
     this.loggedIn = false;
        this.router.navigate(['/login']);
    }


    
}