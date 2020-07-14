import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

// used to create fake backend
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { DependentComponent }  from './dependent';
import { PaymentComponent } from './payment';
import { RegisterComponent } from './register';
import { HeaderComponent } from './header';
import { AlertComponent } from './_components';
import { ProposalComponent } from './proposal';
import { LoanComponent } from './loan_review';
import { ReviewComponent } from './review';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        NgbModule,
        FormsModule
    ],

    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        DependentComponent,
        PaymentComponent,
        AlertComponent,
        HeaderComponent,
        ProposalComponent,
        LoanComponent,
        ReviewComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };