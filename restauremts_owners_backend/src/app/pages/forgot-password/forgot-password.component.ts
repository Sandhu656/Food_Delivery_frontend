import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  passwordMismatch: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      userId: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { userId, newPassword, confirmPassword } = this.forgotPasswordForm.value;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }
    this.passwordMismatch = false;

    // Call the backend to update the password
    this.http
      .put('http://localhost:3000/api/users/reset-password', { userId, newPassword })
      .subscribe(
        (response: any) => {
          alert('Password reset successful!');
          this.router.navigate(['/login']); // Redirect to login page
        },
        (error) => {
          console.error('Error resetting password:', error);
          alert(error.error.message || 'An error occurred during password reset.');
        }
      );
  }
}