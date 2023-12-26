import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { LazyLoadGuardService } from './services/lazy-load-guard.service';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'signup', component: SignupComponent
  },
  {
    path:'profile', component: ProfileComponent
  },
  {
    path:'dashboard', loadChildren:()=>import('./dashboard/dashboard.module').then(mod=>mod.DashboardModule),
    canLoad: [LazyLoadGuardService],
  },
  {
    path:'inventory', loadChildren:()=>import('./inventory/inventory.module').then(mod=>mod.InventoryModule),
    canLoad: [LazyLoadGuardService]
  },
  {
    path:'adda', loadChildren:()=>import('./adda/adda.module').then(mod=>mod.AddaModule),
    canLoad: [LazyLoadGuardService]
  },
  {
    path:'employee', loadChildren:()=>import('./employee/employee.module').then(mod=>mod.EmployeeModule),
    canLoad: [LazyLoadGuardService]
  },
  {
    path:'settings', loadChildren:()=>import('./settings/settings.module').then(mod=>mod.SettingsModule),
    canLoad: [LazyLoadGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
