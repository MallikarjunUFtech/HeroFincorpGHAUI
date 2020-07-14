import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AgeValidator } from './age.validator';



import * as $ from 'jquery';

import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
     registerForm: FormGroup;
    loading = false;
    submitted = false;
    loggedIn: any = true;
    show_plan: any = false;
    hide_plan:any = false;
    gha_plan :any ='';
    radioButton:any=true;
    two_lakh:any=true;
    three_lakh:any=false;
    five_lakh:any=false;
    genderValue:any="";
    salutationValue:any ="";
    familyValue:any = "";
    gender: any = ['Male','Female','Others'];
    Salutation : any = ['Mr','Mrs','Ms'];
    Tenure: any = ['1','2','3','4','5'];
    SumInsured: any = [{name: '2 lakhs', value: 200000}, {name: '3 lakhs', value: 300000}, {name: '5 lakhs', value: 500000}];
    SumInsured_1A: any = [{name: '1A', value: 3950}, {name: '2A', value: 4963}, {name: '2A1C', value: 6272}, {name: '2A2C', value: 7402}];
    SumInsured_2A: any = [{name: '1A', value: 4462}, {name: '2A', value: 5604}, {name: '2A1C', value: 7083}, {name: '2A2C', value: 8360}];
    SumInsured_2A1C: any = [{name: '1A', value: 5864}, {name: '2A', value: 8000}, {name: '2A1C', value: 9120}, {name: '2A2C', value: 10357}];
    //Family: any = ['1A','2A','2A1C','2A2C','2A3C','1A1C','1A2C','1A3C'];
    Family: any = ['1A','2A','2A1C','2A2C'];
    reg_mindate:any='';
    date:any = new Date();
   premium: number;
   tax: number;
   totalpremium: number;
   show_plan_2A:any= false;
    show_plan_2A1C:any= false;
    show_plan_2A2C:any= false;

  min_date:any = '';
min_getday:any = '';
min_getmonth:any = '';
  max_date:any = '';
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {

      this.two_lakh = true;
      this.three_lakh = false;
      this.five_lakh = false;

this.min_date = new Date().getFullYear();
this.max_date = new Date().getFullYear();
this.min_getday = new Date().getDate();
this.min_getmonth =  new Date().getMonth();

        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            salutation:['',Validators.required],
            //spouse_dob:['',Validators.required],
            gender:['',Validators.required],
            mobile:['',[Validators.required,Validators.minLength(10),Validators.pattern("^[0-9]*$")]],
            email:['',Validators.required],
            sumAssured:['',Validators.required],
            family:['',Validators.required],
            age:['',Validators.required],
            premium:['',Validators.required],
            totalpremium:['',Validators.required],
           // netpremium:['',Validators.required],
            tax:['',Validators.required],
            //  address1:['',Validators.required],
            // address2:['',Validators.required],
            // address3:['',Validators.required],
            // state: ['', Validators.required],
            // pin: ['', [Validators.required,Validators.minLength(6),Validators.pattern("^[0-9]*$")]],
            // // pan: ['', Validators.required],
            //  gha_self_ques1:[true, Validators.required],
            // gha_self_ques2:[true, Validators.required],
            // gha_self_ques3:[true, Validators.required],
            // gha_self_ques4:[true, Validators.required],
            // gha_self_ques5:[true, Validators.required],
            // gha_self_ques6:[true, Validators.required],
            // gha_self_ques7:[true, Validators.required],
            // gha_self_ques8:[true, Validators.required],
            // gha_self_ques9:[true, Validators.required],
            // gha_self_ques10:[true, Validators.required],
        
        });
            this.onValueChanges();
            this.registerForm.get('sumAssured').disable();
            
            setTimeout(function(){
            $('#family').prop('disabled',true);
          },10);
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


checkRadioButtonYes()
{
  this.radioButton = false;
}
checkRadioButtonNo()
{
  if(!$('.radio_yes').is(':checked'))
  {
    this.radioButton = $('.radio_yes').is(':checked') ? false : true;
  }
  
}

openPage()
{
  window.open('src/plan_details.html', '', 'width=1000,height=400,left=200,top=200');
}

checkDisable()
{
  if(this.registerForm.get('salutation').value!='' && this.registerForm.get('firstName').value!='' && this.registerForm.get('lastName').value!='' && this.registerForm.get('gender').value!='' && this.registerForm.get('mobile').value!='' && this.registerForm.get('email').value!='' && $('#age').val() !="")
  {
    this.registerForm.get('sumAssured').enable();
  }
  else
  {
     this.registerForm.get('sumAssured').disable();
  }
}

sumAssured(event)
{
  sessionStorage.setItem('policy_value', event.target.selectedOptions[0].value);
  if(event.target.selectedOptions[0].value == 200000)
  {
    this.two_lakh = true;
    this.three_lakh = false;
    this.five_lakh = false;
  }
  else
  {
    if(event.target.selectedOptions[0].value == 300000)
    {
      this.three_lakh = true;
      this.two_lakh = false;
      this.five_lakh = false;
    }
    else
    {
      this.five_lakh = true;
      this.three_lakh = false;
      this.two_lakh = false;
    }
  }
   $('#family').removeAttr('disabled');
}

   onValueChanges(): void {
     this.registerForm.get('family').valueChanges.subscribe(val=>{
      var sum_selected_val = this.registerForm.get('sumAssured').value;
     this.premium = val;
     this.tax = (val)*18/100;
      this.totalpremium=  val + this.tax;
     this.registerForm.patchValue({
     premium:this.premium 
      });
      this.registerForm.patchValue({
         tax:this.tax 
      });

      this.registerForm.patchValue({
         totalpremium:this.totalpremium 
      });

    });



    //  this.registerForm.get('gender').valueChanges.subscribe(val=>{
     
    //  this.registerForm.patchValue({
    //  gender:val
    //   });

    // });

     // this.registerForm.get('salutation').valueChanges.subscribe(val=>{
     // this.registerForm.patchValue({
     // salutation:val
     //  });
     //  });

    // this.registerForm.get('family').valueChanges.subscribe(val=>{
    //  this.registerForm.patchValue({
    //  family:val
    //   });
    //   });
    // this.registerForm.get('spouse_dob').valueChanges.subscribe(val=>{
    //  this.registerForm.patchValue({
    //  spouse_dob:val
    //   });
    //   });

    //    this.registerForm.get('policy').valueChanges.subscribe(val=>{
    //  this.registerForm.patchValue({
    //  policy:val
    //   });

    // });
  }
  

changeGender(event){
   this.registerForm.get('gender').setValue(event.target.value, {
     onlySelf: true
  });
   this.checkDisable();
  }

  // spouseDOB(event){
  //  this.registerForm.get('spouse_dob').setValue(event.target.value, {
  //    onlySelf: true
  // })
  // }


getsalutation(event){
 this.registerForm.get('salutation').setValue(event.target.value, {
     onlySelf: true
  });
 this.checkDisable();
}


  getpolicy(event){
  this.registerForm.get('policy').setValue(event.target.value, {
     onlySelf: true
  })
   }

selectFamily(event){
   this.gha_plan = event.target.selectedOptions[0].innerText;
   if(this.gha_plan=='2A' || this.gha_plan=='2A1C' || this.gha_plan=='2A2C')
   {
    $('.plan_div').removeClass('hide_ele')
   }
   else
   {
    $('.plan_div').addClass('hide_ele')
   }
   if(this.gha_plan=='2A')
   {
    this.show_plan=true;
    this.show_plan_2A=true;
    this.show_plan_2A1C=false;
    this.show_plan_2A2C=false;
    sessionStorage.setItem('2A',this.show_plan);
    sessionStorage.setItem('2A1C',this.hide_plan)
    sessionStorage.setItem('2A2C',this.hide_plan)
   }
   if(this.gha_plan=='2A1C')
   {
    this.show_plan=true;
    this.show_plan_2A1C=true;
    this.show_plan_2A=true;
    this.show_plan_2A2C=false;
    sessionStorage.setItem('2A1C',this.show_plan);
     sessionStorage.setItem('2A',this.show_plan)
    sessionStorage.setItem('2A2C',this.hide_plan)
   }
   if(this.gha_plan=='2A2C')
   {
    this.show_plan=true;
    this.show_plan_2A2C=true;
    this.show_plan_2A=true;
    this.show_plan_2A1C=true;
    sessionStorage.setItem('2A2C',this.show_plan);
     sessionStorage.setItem('2A1C',this.show_plan);
     sessionStorage.setItem('2A',this.show_plan)
   }
   else if(this.gha_plan=='1A')
   {
    this.show_plan_2A=false;
    this.show_plan_2A1C=false;
    this.show_plan_2A2C=false;
    sessionStorage.setItem('2A2C',this.hide_plan);
     sessionStorage.setItem('2A1C',this.hide_plan);
     sessionStorage.setItem('2A',this.hide_plan)
   }
  }




 
    restrictAlphabets(e){
      this.checkDisable();
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
      if($('#emailwar').text() != '' || $('#mobilewar').text() != '')
   {
    this.registerForm.get('sumAssured').disable();
   }
   else
   {
    this.registerForm.get('sumAssured').enable();
   }
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
   if($('#mobilewar').text() != '' || $('#emailwar').text() != '')
   {
    this.registerForm.get('sumAssured').disable();
   }
   else
   {
    this.registerForm.get('sumAssured').enable();
   }
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
     


   onSubmit() {
        this.submitted = true;
         this.alertService.clear();
         this.registerForm.get('salutation').setValue($('#salutation option:selected').text());
         this.registerForm.get('gender').setValue($('#gender option:selected').text());
         this.registerForm.value.age = $('#age').val();
         this.registerForm.value.family = $('#family option:selected').text();
         
          if (this.registerForm.invalid) {
 this.alertService.error("All Fields are Mandatory");
            return;
        }
        else
        {
          this.loading = true;
          sessionStorage.setItem('customer_data',JSON.stringify(this.registerForm.value))
          this.router.navigate(['/proposal']);
        }

        

       // this.userService.addCustomer(this.registerForm.value)
       //    .pipe(first()).subscribe(
       //          data => {
       //             this.router.navigate(['/proposal']);
       //          },
       //          error => {
       //              this.alertService.error(error);
       //              this.loading = false;
       //          });
          
    }
}
