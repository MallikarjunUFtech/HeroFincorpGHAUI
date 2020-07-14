import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '@/_services';
import { HttpClient } from '@angular/common/http';
import '../_content/app.less';
import * as $ from 'jquery';
declare var angular: any;
@Component({ templateUrl: 'loan.component.html'})
export class LoanComponent implements OnInit {
    registerForm: FormGroup;
    loggedIn: any= true;
    loading:any =false;
    submitOtppage :any =false;
    declaration1 :any =false;
    declaration2 :any =false;
    checkbox1: any=false;
      checkbox2: any=false;
      checkbox3: any=false;
      checkbox4: any=false;
      show_plan_2A:any= '';
      show_plan_2A1C:any= '';
      show_plan_2A2C:any= '';
      cust_response :any='';
      dep_response1:any='';
      dep_response2:any='';
      dep_response3:any='';
      dep_response4:any='';
      nominee_response:any='';
      policy_response:any='';
      Salutations : any = ['Mr','Mrs','Ms'];
      gender_data: any = ['Male','Female','Others'];
       min_date:any = '';
min_getday:any = '';
min_getmonth:any = '';
 max_date:any = '';
    users = [];
     loanForm: any = {};
     local_review_model: any = {};
     customer:any;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private httpClient: HttpClient,
        private userService: UserService,
        private alertService: AlertService
    ) {
     this.loggedIn= true;
     this.customer = this.userService.currentCustValue; 
    }
    checkboxDeclaration1(e)
    {
        this.declaration1=e.target.checked ? false :true
    }
    checkboxDeclaration2(e)
    {
        this.declaration2=e.target.checked ? false :true
    }

    sendOPT(){
      this.userService.sendOTP(this.loanForm)
          .pipe(first()).subscribe(
                data => {
                   this.submitOtppage = true;
                  },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }


 onSubmit() {
   
  if(typeof(this.loanForm.gha_nominee_dob) == 'object')
  {
    this.loanForm.gha_nominee_dob = $('#gha_nominee_dob').val();
  }
  this.loanForm.cust_id = localStorage.getItem('currentUserid');
    console.table('SUCCESS!! :-)\n\n' + JSON.stringify(this.loanForm, null, 4));
  
       if(!$('#gha_hdfc_emp_declaration2').is(':checked'))
    {
         this.checkbox1 =false
    }
    if(!$('#gha_hdfc_emp_declaration3').is(':checked'))
    {
         this.checkbox2 =false
    }
    if(!$('#gha_hdfc_emp_declaration4').is(':checked'))
    {
         this.checkbox3 =false
    }

    if(!$('#gha_hdfc_emp_declaration5').is(':checked'))
        {
             this.checkbox4 =false
        }
    if(!$('#gha_cus_declaration1').is(':checked'))
    {
         this.declaration1 =true
    }
    if(!$('#gha_cus_declaration2').is(':checked'))
    {
         this.declaration2 =true
    }

this.loading = true;
var data : any = {};
data.cust_id = localStorage.getItem('currentUserid');
data.opt = $('#enteredotp').val();

 this.userService.validateOTP(data)
    .pipe(first()).subscribe(
      data => {
        if(data > 0){
          this.router.navigate(['/review']);
          this.submitOtppage = true;
        }else{
          this.submitOtppage = false;
        }
       
        },
        error => {
        this.alertService.error(error);
        this.loading = false;
      });

  }
openInsurance()
{
  window.open('src/general_insurance_declaration.html', '', 'width=600,height=400,left=200,top=200');
}
privacyPolicy()
{
  window.open('src/privacy_policy.html', '', 'width=600,height=400,left=200,top=200');
}
terms()
{
  window.open('src/terms.html', '', 'width=600,height=400,left=200,top=200');
}


checkboxClick1(e)
{

       this.checkbox1 =  $('#gha_hdfc_emp_declaration2').is(':checked')   ? !this.checkbox1 : false
     }
checkboxClick2(e)
{
    this.checkbox2 =  $('#gha_hdfc_emp_declaration3').is(':checked') ? !this.checkbox2 : false
}
checkboxClick3(e)
{
    this.checkbox3 =  $('#gha_hdfc_emp_declaration4').is(':checked') ? !this.checkbox3 : false
}
checkboxClick4(e)
{
    this.checkbox4 =  $('#gha_hdfc_emp_declaration5').is(':checked') ? !this.checkbox4 : false
}

    ngOnInit() {
 this.min_date = new Date().getFullYear();
this.max_date = new Date().getFullYear();
this.min_getday = new Date().getDate();
this.min_getmonth =  new Date().getMonth();
// console.log(localStorage.getItem('currentUserid'));
    this.userService.getCustomerInfo(localStorage.getItem('currentUserid'))
          .pipe().subscribe(
                data => {
                  
                  this.cust_response = data.customer[0];
                  this.dep_response1 = data.dependents[0];
                  if(data && data.dependents[1])
                  {
                    this.dep_response2 = data.dependents[1];
                  }
                  if(data && data.dependents[2])
                  {
                    this.dep_response3 = data.dependents[2];
                  }
                  
                  if(data && data.nominee[0])
                  {
                     this.nominee_response = data.nominee[0] 
                  }
                 if(data && data.policy_details[0])
                 {
                   this.policy_response = data.policy_details[0];
                 }
                  this.loanForm =
                        {
                          salutation:this.cust_response.salutation.toString().replace(/\s/g, ''),
                          firstName : this.cust_response.first_name,
                          lastName : this.cust_response.lastname,
                          gender : this.cust_response.gender.toString().replace(/\s/g, ''),
                          age : this.cust_response.age,
                          mobile:this.cust_response.mobile,
                          email:this.cust_response.email,
                          address1:this.cust_response.address1,
                          address2:this.cust_response.Address2,
                          address3:this.cust_response.address3,
                          pincode:this.cust_response.pincode,
                          city:this.cust_response.city,
                          state:this.cust_response.state,
                          policy_start:this.policy_response.start_date,
                          policy_end:this.policy_response.end_date,
                          family:this.policy_response.policy_Details,
                          sumAssured:this.policy_response.sum_assured,
                          premium:this.policy_response.Premium,
                          tax:this.policy_response.GST,
                          totalpremium:this.policy_response.Total_premium,
                         /* self_name:this.dep_response1.name,
                          self_height : this.dep_response1.height,
                          relation : this.dep_response1.relation,
                          self_weight : this.dep_response1.weight,
                          gha_spouse_name:this.dep_response2.name ? this.dep_response2.name : '',
                          gha_spouse_relation:this.dep_response2.relation ? this.dep_response2.relation : '',
                          gha_spose_gender:this.dep_response2.gender ? this.dep_response2.gender :'',
                          gha_spouse_height:this.dep_response2.height ? this.dep_response2.name :'',
                          gha_spouse_dob:this.dep_response2.DOB ? this.dep_response2.DOB :'',
                          gha_spouse_weight:this.dep_response2.weight ? this.dep_response2.weight :'',
                          gha_child1_name:this.dep_response3.name ? this.dep_response2.name :'',
                          gha_child1_relation:this.dep_response3.relation ? this.dep_response2.relation :'',
                          gha_child1_dob:this.dep_response3.DOB ? this.dep_response2.DOB :'',
                          gha_child1_gender:this.dep_response3.gender ? this.dep_response2.gender :'',
                          gha_child1_height:this.dep_response3.height ? this.dep_response2.height :'',
                          gha_child1_weight:this.dep_response3.weight ? this.dep_response2.weight :'',
                          gha_child2_name:this.dep_response4.name ? this.dep_response2.name :'',
                          gha_child2_relation:this.dep_response4.relation ? this.dep_response2.relation :'',
                          gha_child2_dob:this.dep_response4.DOB ? this.dep_response2.DOB :'',
                          gha_child2_gender:this.dep_response4.gender ? this.dep_response2.gender :'',
                          gha_child2_height:this.dep_response4.height ? this.dep_response2.height :'',
                          gha_child2_weight:this.dep_response4.weight ? this.dep_response2.weight :'', */
                          gha_nominee:this.nominee_response.name,
                          gha_nominee_relation:this.nominee_response.relation,
                          gha_nominee_dob:this.nominee_response.age
                        }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

     
      if(sessionStorage.getItem("2A") != undefined)
      {
        this.show_plan_2A = JSON.parse(sessionStorage.getItem("2A").toLowerCase());
        this.show_plan_2A1C = JSON.parse(sessionStorage.getItem("2A1C").toLowerCase());
        this.show_plan_2A2C = JSON.parse(sessionStorage.getItem("2A2C").toLowerCase());
      }
      this.submitOtppage = false;
      this.loggedIn= true;
  var group_health_loan_tap = angular.module('ghaloantap',["ngMessages"]);
  var pathname = 'https://buyuat.bharti-axagi.co.in/group_loan_tap/';

    }


restrictAlphabets(e){
            var x=e.which||e.keycode;
            if((x>=48 && x<=57) || x==8 ||
               (x>=35 && x<=40)|| x==46)
               return true;
            else
               return false;
    }

    email_validate(e){

      var email = e.target.value;
          var text="";
      var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
      if(re.test(email) == false)
      {
      text = "Please Enter a Valid Email";  
      } else {
      text="";
      }
      $('#emailwar').text(text).show();
   
    }     

 mobileValidate(e)
{
   var text="";
   var Mobilenum = /^([1-9])([0-9]){9}$/;
   if(Mobilenum.test(e.target.value) == false)
   {
      text = "Please Enter a Valid Mobile Number";  
   } else {
      text="";
   }
   $('#mobilewar').text(text).show();
  
}


 firstNameValidate(e)
 {

        var inputValue = e.charCode;
        if(!(inputValue >= 65 && inputValue <= 90) && !(inputValue >= 97 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)){
            e.preventDefault();
        }
 }

 lastNameValidate(e)
 {
        var inputValue = e.charCode;
        if(!(inputValue >= 65 && inputValue <= 90) && !(inputValue >= 97 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)){
            e.preventDefault();
        }
 }
     


    
}