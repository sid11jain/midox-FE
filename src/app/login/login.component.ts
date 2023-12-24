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
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
   // this.commonService.loginToken.unsubscribe();
    //this.commonService.loginToken.next(null);
   }

  ngOnInit(): void {
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
          const roles = result?.roles;
          if(roles?.length){
            //this.commonService.roles.next(roles);
            localStorage.setItem('roles', roles);
          }
          //this.commonService.loginToken.next(result?.token);
          localStorage.setItem('token', result?.token);
          this.router.navigate(['/dashboard']);
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
