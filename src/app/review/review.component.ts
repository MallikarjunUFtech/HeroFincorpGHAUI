import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService,AlertService } from '@/_services';
import '../_content/app.less';
import * as $ from 'jquery';
declare var angular: any;
@Component({ templateUrl: 'review.component.html'})
export class ReviewComponent implements OnInit {
    submitOtppage :any =false;
    enablePayment : boolean = true;
    reviewdata : any = {};
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
      var reviewdatas : any = JSON.parse(localStorage.getItem('currentCust'));
      this.reviewdata = reviewdatas.dependents;;
    }

    helathIns()
    {
     this.router.navigate(['/register']);
    }
    onSubmit() {
      this.userService.addPayment(this.reviewdata)
      .pipe(first()).subscribe(
            data => {
             this.router.navigate(['/payment']);
            },
            error => {
              if(error == 'OK')
              {
                this.router.navigate(['/review']);
              }
              
                this.alertService.error(error);
            });
      //localStorage.removeItem('currentCust');
    }
  }