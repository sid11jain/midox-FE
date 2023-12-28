import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any =  FormGroup;
  isLoginError:boolean = false;

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private router: Router) {
   // this.commonService.loginToken.unsubscribe();
    this.commonService.isOnLoginPage.next(true);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roles');
   }

  ngOnInit(): void {
    sessionStorage.clear();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    // Display the form values in the console
    let username = this.loginForm?.value?.username;
    let password = this.loginForm?.value?.password;
    this.commonService.login(username,password).subscribe({
      next: (result: any) =>{
        if(result?.token){
          this.commonService.isOnLoginPage.next(false);
          const roles = result?.roles;
          if(roles?.length){  
            //this.commonService.roles.next(roles);
            sessionStorage.setItem('roles', JSON.stringify(roles));
          }
          //this.commonService.loginToken.next(result?.token);
          sessionStorage.setItem('token', result?.token);
          setTimeout(()=>{
            this.router.navigate(['/dashboard']);
          }, 300);
          
        }
      },
      error: (err: any) => {
        console.error('Login Error: ' + err);
        this.isLoginError = true;
        setTimeout(() =>{
          this.isLoginError = false;
        },3000);
      },
    })
  }

}
