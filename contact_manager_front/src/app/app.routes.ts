import { Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { ManagerLayoutComponent } from './layouts/manager-layout/manager-layout.component';
import { LoginComponent } from './modules/landing/login/login.component';
import { ManagerComponent } from './modules/manager/manager.component';

export const routes: Routes = [
  {path: '', component: ManagerLayoutComponent,
    children: [
      {path: '', component: ManagerComponent },
    ]
  },
  {path: 'home', component: LandingLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent },
    ]
  },
];
