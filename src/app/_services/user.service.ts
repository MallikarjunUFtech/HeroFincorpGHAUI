import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { AuthenticationService } from '@/_services';
import { User } from '@/_models';
import { Customer } from '@/_models';


@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
    //public currentUser: Observable<User>;
    private currentCustSuject: BehaviorSubject<Customer>;
     public currentCust: Observable<Customer>;
     private message = new BehaviorSubject('First Message');
  sharedMessage = this.message.asObservable();
       
   

    constructor(private http: HttpClient,private authenticationService: AuthenticationService) {  
      
        this.currentCustSuject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('currentCust')));
        this.currentCust = this.currentCustSuject.asObservable();


        }

   public get currentCustValue(): Customer {
        return this.currentCustSuject.value;
    }

    addCustomer(data){
    
     this.message.next(data);
    let currentUser = this.authenticationService.currentUserValue;
    return this.http.post<any>('http://127.0.0.1:8080/api/Cust/addCustomer',{data:data,user:currentUser}).
    pipe(map(customer => { 
          localStorage.setItem('currentCust', JSON.stringify(customer));
          this.currentCustSuject.next(customer);
          return customer;
        }));
    }

    getCustomerInfo(data){
   // let currentUser = this.authenticationService.currentUserValue;
    return this.http.get<any>('http://127.0.0.1:8080/api/Cust/getCustomerInfo?cust_id='+data,).pipe( 
        map((res: any) => {
          return res;
        }));
     // return this.http.post<any>('http://127.0.0.1:8080/api/Cust/getCustomerInfo',{cust_id:data});
    }
    addPayment(data){
       return this.http.post<any>('http://127.0.0.1:8080/api/Cust/paymentGateway',{data:data}).pipe( 
          map((res: any) => {
            return res;
          }));
      }
  

    getQuestionaries(data)   {
        return this.http.post<any>('http://127.0.0.1:8080/api/Cust/getQuestionaries',data);
    }
    
    addDependents(data,questionarisData){
    
         let currentUser = this.authenticationService.currentUserValue;
         let cust = this.currentCustValue;

        return this.http.post<any>('http://127.0.0.1:8080/api/Cust/addDependents', {data:data,cust:cust,user:currentUser,questionaries:questionarisData});
    }

    sendData(){
    alert('payment');
    var data="<InputMsg>BAXAGENINS|VDJD0965698654|NA|00000001.00|NA|NA|NA|INR|NA|R|baxagenins|NA|NA|F|WEB|SUMIT ASDFASDF|1571|B2C/defaultInst106|ASD@ASD.ASD|TPI-B2C-EHL|9878767877|https://uat.bhartiaxaonline.co.in/com.bagi.b2c.payment.B2CPayProcess.wcp|170687729</InputMsg>";
    return this.http.post<any>('https://www.billdesk.com/pgidsk/PGIMerchantPayment',data);
    }
    sendOTP(data)
    {
      return this.http.post<any>('http://127.0.0.1:8080/api/Cust/sendOTP',data);
    }

    validateOTP(data)
    {
      return this.http.post<any>('http://127.0.0.1:8080/api/Cust/validateOTP',data);
    }
}