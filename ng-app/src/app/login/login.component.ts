import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { User } from '../core/models/user';
import { AuthenticationService } from '../core/services/authentication.service';
import { Router } from '@angular/router';
import { HeadToolbarService } from '../core/services/head-toolbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  formLogin!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private headToolbarService: HeadToolbarService
  ) {}

  ngOnInit(): void {
    this.headToolbarService.hide();
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.formLogin.invalid) {
      const user = this.formLogin.getRawValue();
      this.authenticationService.login(user.email, user.password).subscribe(
        (data) => {
          this.invalidLogin = false;
          this.router.navigate(['/pokemon']);
        },
        (error) => {
          this.invalidLogin = true;
        }
      );
    }
  }
}
