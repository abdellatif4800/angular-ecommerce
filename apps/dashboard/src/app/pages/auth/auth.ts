import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthSerivce } from '@ecommerce-angular/services';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-auth',
  imports: [
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnInit {
  private authService = inject(AuthSerivce);
  private router = inject(Router);

  ngOnInit() {
    console.log(this.authService.prop1)
  }

  loginForm = new FormGroup({
    email: new FormControl('test101@example.com'),
    password: new FormControl('asd'),
  });
  registerForm = new FormGroup({
    username: new FormControl('test'),
    email: new FormControl('test103@example.com'),
    password: new FormControl('pass123'),
    rePassword: new FormControl('pass123'),
  });

  @ViewChild('myModal') myModal!: ElementRef<HTMLDialogElement>;

  openModal() {
    this.myModal.nativeElement.showModal();
  }

  visible = true;
  // visible = this.authService.loginForm;

  closeDialog() {
    // this.authService.closeLoginForm();
    this.myModal.nativeElement.close();
  }

  currentForm = signal<string>('register');
  errMsg = signal<string>('')

  onLoginSubmit() {
    this.authService.login(this.loginForm.value).subscribe((res) => {
      if (res) {
        if (this.authService.redirectUrl()) {
          this.router.navigateByUrl(`/${this.authService.redirectUrl()}`);
        }
        this.closeDialog();
      }
    });
  }
  onRegister() {
    this.authService.regster(this.registerForm.value).subscribe({
      next: (res) => {
        if (res === 'email duplicated') {
          this.errMsg.set("email duplicated")
        } else if (res) {
          if (this.authService.redirectUrl()) {
            this.router.navigateByUrl(`/${this.authService.redirectUrl()}`);
            this.closeDialog();
          }
        }
      },
      error: (res: any) => {
        this.errMsg.set(res)
      }
    });
  }

}
