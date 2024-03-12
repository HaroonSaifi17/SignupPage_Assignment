import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  public name: string = '';
  public nameError: string = '';
  public mobileNumber: number | undefined;
  public mobileNumberError: string = '';
  public dateOfBirth: string = '';
  public dateOfBirthError: string = '';
  public email: string = '';
  public emailError: string = '';
  public password: string = '';
  public passwordError: string = '';
  public valid: boolean = false;
  constructor(
    private router: Router,
    private api: ApiService,
  ) {}

  ngOnInit(): void {}
  nameValid(): void {
    const trimmedName = this.name.trim();
    if (!/^[a-zA-Z\s]*$/.test(trimmedName)) {
      this.nameError = 'Invalid characters in name';
      this.valid = false;
    } else {
      this.nameError = '';
      this.valid = true;
    }
  }
  mobileNumberValid(): void {
    const mobileNumber = this.mobileNumber;
    if (!/^\d{10}$/.test(mobileNumber!.toString())) {
      this.mobileNumberError = 'Must be 10 digits long.';
      this.valid = false;
    } else {
      this.mobileNumberError = '';
      this.valid = true;
    }
  }

  emailValid(): void {
    const trimmedEmail = this.email.trim();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(trimmedEmail)) {
      this.emailError = 'Invalid email format';
      this.valid = false;
    } else {
      this.emailError = '';
      this.valid = true;
    }
  }

  dateOfBirthValid(): void {
    const dobString = this.dateOfBirth;
    const dob = new Date(dobString);
    const currentDate = new Date();
    if (!dobString || isNaN(dob.getTime()) || dob >= currentDate) {
      this.dateOfBirthError = 'Invalid date of birth';
      this.valid = false;
    } else {
      this.dateOfBirthError = '';
      this.valid = true;
    }
  }

  passwordValid(): void {
    const password = this.password;
    if (!password || password.length < 8) {
      this.passwordError = 'Password must be at least 8 characters long';
      this.valid = false;
    } else {
      this.passwordError = '';
      this.valid = true;
    }
  }

  onSubmit(form: NgForm): void {
    if (
      this.valid &&
      this.name !== ' ' &&
      this.mobileNumber !== undefined &&
      this.dateOfBirth !== '' &&
      this.email !== '' &&
      this.password !== ''
    ) {
      this.api.newUserPost(form.value).subscribe(
        (response) => {
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Error updating data:', error);
        },
      );
    } else {
      this.mobileNumberValid();
      this.nameValid();
    }
  }
}
