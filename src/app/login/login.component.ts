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

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private router: Router) { }

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
    console.log(this.loginForm.value);
    let username = this.loginForm?.value?.username;
    let password = this.loginForm?.value?.password;
    this.commonService.login(username,password).subscribe((result:any) => {
      console.log(result);
      
      if(result){
        console.log("Login Succsess");
        this.router.navigate(['/dashboard']);
      }
      else{
        console.log("Login Failed");        
      }
    })
  }

}
