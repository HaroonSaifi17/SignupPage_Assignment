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
  public phoneNumber: number | undefined;
  public phoneNumberError: string = '';
  public valid: boolean = false;
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {}
  nameValid(): void {
    const trimmedName = this.name.trim();

    if (trimmedName === '') {
      this.nameError = 'Please enter a valid name';
      this.valid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(trimmedName)) {
      this.nameError = 'Invalid characters in name';
      this.valid = false;
    } else {
      this.nameError = '';
      this.valid = true;
    }
  }
  phoneNumberValid(): void {
    const phoneNumber = this.phoneNumber;

    if (!phoneNumber) {
      this.phoneNumberError = 'Please enter a valid phone number';
      this.valid = false;
    } else if (!/^\d{10}$/.test(phoneNumber.toString())) {
      this.phoneNumberError =
        'Invalid phone number format. Must be 10 digits long.';
      this.valid = false;
    } else {
      this.phoneNumberError = '';
      this.valid = true;
    }
  }

  onSubmit(form: NgForm): void {
    if (this.valid && this.name !== ' ' && this.phoneNumber !== undefined) {
      this.api.newUserPost(form.value).subscribe(
        (response) => {
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Error updating data:', error);
        }
      );
    } else {
      this.phoneNumberValid();
      this.nameValid();
    }
  }
}
