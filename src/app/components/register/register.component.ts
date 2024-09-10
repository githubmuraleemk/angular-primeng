import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { User } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardModule,InputTextModule,ReactiveFormsModule,ButtonModule,RouterLink,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ){}
  
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  }
)
get fullName() {
  return this.registerForm.controls['fullName'];
}

get email() {
  return this.registerForm.controls['email'];
}

get password() {
  return this.registerForm.controls['password'];
}

get confirmPassword() {
  return this.registerForm.controls['confirmPassword'];
}

submitDetails(){
  console.log(this.registerForm.value)
  const postData = { ...this.registerForm.value };
  delete postData.confirmPassword; 
  console.log(postData as User);
  this.authService.registerUser(postData as User).subscribe(
    response => {
      console.log(response);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
      this.router.navigate(['login'])
    },
    error => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    }
  )
}

}
