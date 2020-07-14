import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '@/_services';

@Component({selector: 'app-header', templateUrl: 'header.component.html' })
export class HeaderComponent implements OnInit {
    loggedIn: any= false;
    users = [];
      constructor(
        private userService: UserService,private route: ActivatedRoute,
        private router: Router
    ) {
        

    }

    ngOnInit() {
   
    }
    logout() {
    
    }


     
    
}