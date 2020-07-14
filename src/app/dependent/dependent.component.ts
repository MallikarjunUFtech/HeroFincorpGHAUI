import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'dependent.component.html' })
export class DependentComponent  implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    loggedIn: any= true;
    questionarisData: any = [];
    dependentsDetails: any = [];
    dependentCount: any = ['2','3','4'];
    questionaries :any;
    message:any;
    customer:any;
     Relation: any = ['Father','Mother','Sibling','Spouse','Daughter','Son'];   
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.customer = this.userService.currentCustValue; 
    }

    ngOnInit() {
        console.log(this.customer);
        this.getquestions(1); 
        console.log( this.questionaries);
        this.dependentCount = this.getDepCount();
        this.registerForm = this.formBuilder.group({
             
            address: ['', Validators.required],
            nominee: ['', Validators.required],
            age: ['', Validators.required],
        releationship: ['', Validators.required],
        fullname1:'sadasd',
        relation1:'',
        DOB1:'',
        gender1:'',
        height1:'',
        weight1:'',
        fullname2:'',
        relation2:'',
        DOB2:'',
        gender2:'',
        height2:'',
        weight2:'',
        fullname3:'',
        relation3:'',
        DOB3:'',
        gender3:'',
        height3:'',
        weight3:'',
        fullname4:'',
        relation4:'',
        DOB4:'',
        gender4:'',
        height4:'',
        weight4:'',
        fullname5:'',
        relation5:'',
        DOB5:'',
        gender5:'',
        height5:'',
        weight5:'',
        });
           this.onValueChanges();
    }

    onValueChanges(){
    this.registerForm.get('releationship').valueChanges.subscribe(val=>{
     //console.log(val);
     this.registerForm.patchValue({
     releationship:val
      });
    });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.testPayment();
        if(this.questionarisData.length>0){
        let currentUser = this.authenticationService.currentUserValue;

        alert("Hey "+currentUser.firstName+", we will be unable to issue an online policy. The following members are not eligible for health insurance due to medical conditions. Bharti Axa General Insurance executive will get in touch soon.");
        return null;
        }
         this.submitted = true;
         this.alertService.clear();
        if (this.registerForm.invalid) {
      this.alertService.error("Form invalid, Please recheck");
            return;
        }

         this.userService.addDependents(this.registerForm.value,this.questionarisData)
          .pipe(first()).subscribe(
                data => {
                   this.router.navigate(['/payment']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    

        this.loading = true;
         
    }

    changeCity(event){
   this.registerForm.get('releationship').setValue(event.target.value, {
     onlySelf: true
  })
  }


    getquestions(data) {
     this.userService.getQuestionaries(data)
          .pipe(first()).subscribe(
                data => {
                this.questionaries = data;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    changeSelection(qid,pid, event){
    if(this.questionarisData.length >0){
    for(var i=0;i<this.questionarisData.length;i++){
    if(this.questionarisData[i].question == qid && this.questionarisData[i].pid == pid){
    this.questionarisData[i].checed = event.target.checked;
    }else{
    this.questionarisData.push({"question":qid,"pid":pid,"checed":event.target.checked});
    }
    }
    }else{
    this.questionarisData.push({"question":qid,"pid":pid,"checed":event.target.checked});
     }
     this.questionarisData.filter((el, i, a) => i == a.indexOf(el))
    }

    testPayment(){
    this.userService.sendData()
          .pipe(first()).subscribe(
                data => {
                console.log(data);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
   
    }

    getDepCount(){
    //'1A','2A','2A1C','2A2C','2A3C','1A1C','1A2C','1A3C'
    var fam = this.customer.dependents.family;
   if(fam =='1A'){
    return ["1"];
    }else if(fam =='2A'){
    return ["1","1"];
    }else if(fam =='2A1C'){
    return ["1","1","1"];
    }else if(fam=='2A2C'){
    return ["1","1","1","1"];
    }else if(fam =='2A3C'){
    return ["1","1","1","1","1"];
    }else if(fam =='1A1C'){
    return ["1","1"];
    }else if(fam =='1A2C'){
    return ["1","1","1"];
    }
    else if(fam =='1A3C'){
    return ["1","1","1","1"];
    }

    }
}
