import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '@/_services';
import { HttpClient } from '@angular/common/http';
import '../_content/app.less';
import * as $ from 'jquery';

@Component({templateUrl: 'proposal.component.html'})
export class ProposalComponent implements OnInit {
    proposalForm: FormGroup;
    loggedIn: any= true;
    users = [];
     proposal_model: any = {};
     gha_pincode:any={};
     loading = false;
      show_plan_2A:any= '';
      show_plan_2A1C:any= '';
      show_plan_2A2C:any= '';
      customer:any;
      submitted = false;
        min_date:any = '';
min_getday:any = '';
min_getmonth:any = '';
  max_date:any = '';
   getDate:any = '';
   get_year:any='';
   get_month:any='';
   get_day:any='';
   policy_end_date:any='';
    constructor(
      private formBuilder: FormBuilder,
        private userService: UserService,private route: ActivatedRoute,
        private router: Router,
        private httpClient: HttpClient,
        private alertService: AlertService
    ) {
      
    }
get f() { return this.proposalForm.controls; }
    ngOnInit() {
      this.get_year = new Date().getFullYear();
      this.get_month = new Date().getMonth()+1;
      this.get_day = new Date().getDate();
      this.min_date = new Date().getFullYear();
this.max_date = new Date().getFullYear();
this.min_getday = new Date().getDate();
this.min_getmonth =  new Date().getMonth();
      console.log(this.customer);
      
this.customer = JSON.parse(sessionStorage.getItem('customer_data'));
      if(sessionStorage.getItem("2A") != undefined)
      {
        this.show_plan_2A = JSON.parse(sessionStorage.getItem("2A").toLowerCase());
        this.show_plan_2A1C = JSON.parse(sessionStorage.getItem("2A1C").toLowerCase());
        this.show_plan_2A2C = JSON.parse(sessionStorage.getItem("2A2C").toLowerCase());
      }
        
   this.proposalForm = this.formBuilder.group({
             
            address1: ['', Validators.required],
            address2: ['', Validators.required],
            address3: ['', Validators.required],
            pincode: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            pan_card: ['', Validators.required],
            policy_start:['', Validators.required],
            policy_end:['', Validators.required],
            self_height:['', Validators.required],
             self_weight:['', Validators.required],
             gha_spouse_name:['', Validators.required],
            gha_spouse_relation:['', Validators.required],
            gha_spouse_gender:['', Validators.required],
            gha_spouse_height:['', Validators.required],
            gha_spouse_dob:['', Validators.required],
            gha_spouse_weight:['', Validators.required],
            gha_child1_name:['', Validators.required],
            gha_child1_relation:['', Validators.required],
            gha_child1_dob:['', Validators.required],
            gha_child1_gender:['', Validators.required],
            gha_child1_height:['', Validators.required],
            gha_child1_weight:['', Validators.required],
            gha_child2_name:['', Validators.required],
            gha_child2_relation:['', Validators.required],
            gha_child2_dob:['', Validators.required],
            gha_child2_gender:['', Validators.required],
            gha_child2_height:['', Validators.required],
            gha_child2_weight:['', Validators.required],
            
            gha_nominee:['', Validators.required],
            gha_nominee_relation:['', Validators.required],
            gha_nominee_dob:['', Validators.required]
           
            });
           this.onValueChanges();
    // this.proposalForm.get('address1').setValue(this.customer.dependents.address1);
    // this.proposalForm.get('address2').setValue(this.customer.dependents.address2);
    // this.proposalForm.get('address3').setValue(this.customer.dependents.address3);
    // this.proposalForm.get('pincode').setValue(this.customer.dependents.pin);
    // this.proposalForm.get('state').setValue(this.customer.dependents.state);
    // this.proposalForm.get('pan_card').setValue(this.customer.dependents.pan);
    

    }

    onValueChanges(){

    
    
    }

changeDate(e)
{
  var _this=this
  setTimeout(function(){
   _this.policy_end_date =  ""+(_this.proposalForm.value.policy_start.year+1)+'-'+(_this.proposalForm.value.policy_start.month+1)+'-'+(_this.proposalForm.value.policy_start.day+1)+"";

  })
  
}

 onSubmit() {
   this.submitted = true;
   

    this.loading = true;
  
  var _this = this;
 
_this.proposalForm.get('gha_nominee_dob').setValue($('#gha_nominee_dob').val());
_this.proposalForm.get('policy_start').setValue($('#gha_policy_start_date').val());
_this.proposalForm.get('policy_end').setValue($('#gha_policy_end_date').val());
_this.proposalForm.get('self_height').setValue(_this.proposalForm.get('self_height').value);
_this.proposalForm.get('self_weight').setValue(_this.proposalForm.get('self_weight').value);
_this.proposalForm.get('gha_spouse_dob').setValue($('#gha_spouse_dob').val() ? $('#gha_spouse_dob').val() : '');
_this.proposalForm.get('gha_child1_dob').setValue($('#gha_child1_dob').val() ? $('#gha_child1_dob').val() : '');
_this.proposalForm.get('gha_child2_dob').setValue($('#gha_child2_date').val() ? $('#gha_child2_date').val() : '');


var final_array = [];
var values = sessionStorage.getItem('customer_data');

final_array.push(JSON.stringify(_this.proposalForm.value));
var obj1 = JSON.parse(JSON.stringify(_this.proposalForm.value));
var obj2 = JSON.parse(values);
let result = {obj1,obj2};
// var final_values = this.proposalForm.value;
// var kk = Object.keys(values).forEach(function(key) {
//   if(values[key] !== '')
//    {
// if(values[key] != undefined)
// {
//   console.table(key +':' +values[key])
// }
// }
// })

 // if (this.proposalForm.invalid) 
 // {
 //    this.alertService.error("All Fields are Mandatory");
 //    return;
 //  }
  // else
  // {
  //   this.loading = true;
  //   sessionStorage.setItem('proposal_data',JSON.stringify(this.proposalForm.value))
  //   this.router.navigate(['/loan_review']);
  // }

  if(!$('.is-invalid').is(':visible'))
  {
    
       _this.userService.addCustomer(result)
          .pipe(first()).subscribe(
                data => {
                  localStorage.setItem('currentUserid', data.id);
                   _this.router.navigate(['/loan_review']);
                },
                error => {
                  
                  if(error == 'OK')
                  {
                    _this.router.navigate(['/loan_review']);
                  }
                  
                    _this.alertService.error(error);
                    _this.loading = false;
                });


   }
  //  setTimeout(function(){},1000)
  }




  restrictAlphabets(e){
    var x=e.which||e.keycode;
    if((x>=48 && x<=57) || x==8 ||
       (x>=35 && x<=40)|| x==46)
       return true;
    else
       return false;
    }
pincodeValidator(e)
{
   var text="";
   var Mobilenum = /^([1-9])([0-9]){5}$/;
   if(Mobilenum.test(e.target.value) == false)
   {
      text = "Please Enter a Valid Pincode";  
   } else {
      text="";
   }
   $('#pincode-error').html(text).show();


    var pincode = $('#gha_pincode').val();
    if(pincode !==undefined)
    {

        var pathname = 'https://buyuat.bharti-axagi.co.in/group_loan_tap/';
        var pincodeObj = 'pincode='+pincode;

        const headers = {"Content-Type": 'application/x-www-form-urlencoded'};
        const body = pincodeObj;
        this.httpClient.post<any>(pathname+'state-city', body, { headers }).subscribe(data => {
console.log(data)
        }) 
    }
        


        // $http({
        //         url:pathname+'state-city',
        //         method:'POST',
        //         dataType:'json',
        //         data:pincodeObj,
        //         headers: {"Content-Type": 'application/x-www-form-urlencoded'}
        //       }).then(function(result){
        //         
        //         var userData = Object(result);
        //         var dataLogin = userData.data;
        //         if(dataLogin.status == true){
        //         var resultdata = dataLogin.result;
        //         $('#gha_city').val(resultdata[0].city);
        //         $('#gha_state').val(resultdata[0].state);
        //         $('#gha_si').val('');
        //       }
        //       else{
        //         console.log('No Cities Find');
        //       }
        //   });
        // return false;
       }
}


    