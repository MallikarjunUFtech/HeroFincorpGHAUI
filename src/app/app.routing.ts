import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { DependentComponent } from './dependent';
import { PaymentComponent } from './payment';
import { AuthGuard } from './_helpers';
import { ProposalComponent } from './proposal';
import { LoanComponent } from './loan_review';
import { ReviewComponent } from './review';

const routes: Routes = [
    { path: '', component: LoanComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'dependent', component: DependentComponent, canActivate: [AuthGuard] },
    { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
    { path: 'proposal', component: ProposalComponent  },
    { path: 'loan_review', component: LoanComponent  },
    { path: 'review', component: ReviewComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);



// import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home';
// import { LoginComponent } from './login';
// import { RegisterComponent } from './register';
// import { DependentComponent } from './dependent';
// import { PaymentComponent } from './payment';
// import { AuthGuard } from './_helpers';
// import { ProposalComponent } from './proposal';
// import { LoanComponent } from './loan_review';
// import { ReviewComponent } from './review';


// const routes: Routes = [
//     { path: '', component: RegisterComponent},
//     { path: 'register', component: RegisterComponent , canActivate: [AuthGuard]},
//     { path: 'dependent', component: DependentComponent, canActivate: [AuthGuard] },
//     { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
//     { path: 'proposal', component: ProposalComponent },
//     { path: 'loan_review', component: LoanComponent },
//     { path: 'review', component: ReviewComponent },

//     // otherwise redirect to home
//     { path: '**', redirectTo: '' }
// ];

// export const appRoutingModule = RouterModule.forRoot(routes);